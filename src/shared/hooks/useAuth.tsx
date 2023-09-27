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
    userId: string
    setUserId: (value: string) => void
    token: string | null
}

interface TokenProviderProps {
    children: ReactNode;
}
const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({ children }: TokenProviderProps) {
    const [permission, setPermission] = useState(true);
    const [token] = useState(localStorage.getItem('@token'));
    const [auth, setAuth] = useState('');
    const [tokenAccess, setTokenAccess] = useState('')
    const [User_Access, setUser_Access] = useState('');
    const [userId, setUserId] = useState("")
    const [User_data, setUserData] = useState<UserProps>({} as UserProps)

    window.onload = async function () {
        if (token)
            await Token(token)
        else
            if (!window.location.href.includes("login")) {
                window.location.href = "/login"
            }
    }

    useEffect(() => {
        if (token) {
            api.post("/api/auths/verify/token", { token: token }).then((res) => {
                setUser_Access(res.data.sub.role)
                setUserId(res.data.sub.id)
                console.log("auth", res.data)
            }).catch((err) => {
                window.location.href = "/login"
            })
        }
    }, [])

    //window.addEventListener('storage', function (e) {
    //    if (e.key === 'token') {
    //        window.location.href = "/login"
    //        this.localStorage.removeItem("token")
    //    }
    //});


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
                tokenAccess,
                userId,
                setUserId,
                token
            }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    return useContext(TokenContext);
}
