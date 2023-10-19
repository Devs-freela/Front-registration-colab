import { Colaborador } from "../pages/Colaborador";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Lideres } from "../pages/Líder";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Bairros } from "../pages/Bairros";
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import { Link } from "../pages/Link";
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { UserCadastro } from "../pages/UsuárioCadastro";
import { useToken } from "../shared/hooks/useAuth";
import GroupIcon from '@mui/icons-material/Group';
import { Equipes } from "../pages/Equipes";
import FormColaboratorRegister from "../components/FormUserCadastro";
import { JSX } from "react/jsx-runtime";

export const APP_PAGES = () => {
    const { User_Access } = useToken()
    let menuItems: { title: string; route: string; icon: JSX.Element; component: JSX.Element; showMenu: boolean; }[] = []

    if (localStorage.getItem("@token")) {
        menuItems = [
            {
                title: 'Colaborador',
                route: '/',
                icon: <FactCheckOutlinedIcon />,
                component: <Colaborador />,
                showMenu: User_Access === "Administrativo",
            },
            {
                title: 'Lideres',
                route: '/Lideres',
                icon: <PersonAddAltOutlinedIcon />,
                component: <Lideres />,
                showMenu: User_Access === "Administrativo",
            },
            {
                title: 'Usuários de cadastro',
                route: '/cadastroUser',
                icon: <PeopleOutlineIcon />,
                component: <UserCadastro />,
                showMenu: User_Access === "Administrativo",
            },
            {
                title: 'Bairros',
                route: '/Bairros',
                icon: <AddLocationOutlinedIcon />,
                component: <Bairros />,
                showMenu: User_Access === "Administrativo",
            },
            {
                title: 'Equipes',
                route: '/Equipes',
                icon: <GroupIcon />,
                component: <Equipes />,
                showMenu: User_Access === "Administrativo",
            },
            {
                title: 'Links',
                route: '/Links',
                icon: <AddLinkOutlinedIcon />,
                component: <Link />,
                showMenu: User_Access === "Lider" || User_Access === "Administrativo",
            },
            {
                title: 'Cadastro',
                route: '/Cadastro',
                icon: <FactCheckOutlinedIcon />,
                component: <FormColaboratorRegister handleCloseModal={() => { }} />,
                showMenu: User_Access !== "Lider",
            },
        ];
    } else {
        console.log(localStorage.getItem("@token"))
        setTimeout(() => {
            if (!window.location.href.includes("login")) {
                window.location.href = "/login"
            }
        }, 1000)
    }

    // if (process.env.NODE_ENV == "development") {
    //     menuItems = menuItems.map((item) => ({ ...item, showMenu: true }))
    // }

    // if (process.env.NODE_ENV != "development") {
    //     if (User_Access === "Lider") {
    //         return menuItems = menuItems.map(item => ({
    //             ...item,
    //             showMenu: item.title == "Links",
    //         }));
    //     } else if (User_Access === "Colaborador-Cadastro") {
    //         menuItems = menuItems.map(item => ({
    //             ...item,
    //             showMenu: item.title === 'Colaborador' || item.title === 'Lideres',
    //         }));
    //     }
    // }

    return menuItems
} 
