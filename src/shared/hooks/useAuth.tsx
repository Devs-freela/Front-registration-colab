/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

interface UserProps {
    name: string,
    role: string,
    token: string
}

interface TokenContextData {
    permission: Boolean;
    auth: string;
    setAuth: (value: string) => void;
    setPermission: (value: any) => void;
    User_Access: string;
    User_data: UserProps
    setUserData: (value: UserProps) => void
    setUser_Access: (value: string) => void;
    tokenAccess: string;
}

interface TokenProviderProps {
    children: ReactNode;
}
const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({ children }: TokenProviderProps) {
    const [permission, setPermission] = useState(true);
    const [token] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState('');
    const [tokenAccess, setTokenAccess] = useState('')
    const [User_Access, setUser_Access] = useState('');
    const [User_data, setUserData] = useState<UserProps>({} as UserProps)


    window.onload = async function () {
        if (token)
            await Token(token)
    }

    useEffect(() => {
        if (token)
            api.post("/api/auths/verify/token", { token: token }).then((res) => {
                console.log("AUTH", res.data)
                setUser_Access(res.data.sub.role)
            })
    }, [token])

    window.addEventListener('storage', function (e) {
        if (e.key === 'token') {
            window.location.href = "/login"
            this.localStorage.clear()
        }
    });

    async function Token(token: string) {
        api.post("/api/auths/verify/token", { token: token }).then((res) => {
            console.log("AUTH", res.data)
            setUser_Access(res.data.sub.role)
            //if (res.data.sub.role == "PrimeiroLogin") {
            //    isAdmin ? navigate("/firstLogin/adm") : navigate("/firstLogin")
            //} else {
            //    navigate("/")
            //}
        })
    }


    return (
        <TokenContext.Provider
            value={{
                permission,
                setPermission,
                User_Access,
                setUser_Access,
                setUserData,
                User_data,
                auth,
                setAuth,
                tokenAccess
            }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    return useContext(TokenContext);
}
