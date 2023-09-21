import { Colaborador } from "../pages/Colaborador";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Lideres } from "../pages/Líder";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Bairros } from "../pages/Bairros";
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import { Link } from "../pages/Link";
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { Login } from "../pages/Login";


export const APP_PAGES = [
    {
        title: 'Colaborador',
        route: '/',
        icon: <FactCheckOutlinedIcon />,
        component: <Colaborador />,
        showMenu: true,
    },
    {
        title: 'Lideres',
        route: '/Lideres',
        icon: <PersonAddAltOutlinedIcon />,
        component: <Lideres />,
        showMenu: true,
    },

    {
        title: 'Bairros',
        route: '/Bairros',
        icon: <AddLocationOutlinedIcon />,
        component: <Bairros />,
        showMenu: true,
    },
    {
        title: 'Links',
        route: '/Links',
        icon: <AddLinkOutlinedIcon />,
        component: <Link />,
        showMenu: true,
    },
]