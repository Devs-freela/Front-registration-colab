import { Colaborador } from "../pages/Colaborador";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Líderes } from "../pages/Líder";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Bairros } from "../pages/Bairros";
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';


export const APP_PAGES = [
    {
        title: 'Colaborador',
        route: '/',
        icon: <FactCheckOutlinedIcon />,
        component: <Colaborador />,
        showMenu: true,
    },
    {
        title: 'Líderes',
        route: '/Líderes',
        icon: <PersonAddAltOutlinedIcon />,
        component: <Líderes />,
        showMenu: true,
    },
    {
        title: 'Bairros',
        route: '/Bairros',
        icon: <AddLocationOutlinedIcon />,
        component: <Bairros />,
        showMenu: true,
    },
]