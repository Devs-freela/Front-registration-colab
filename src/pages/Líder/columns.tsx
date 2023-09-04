import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME DO LÍDER',
    },

    {
        field: 'cpf',
        headerName: 'CPF',
    },
    {
        field: 'quemCadastrou',
        headerName: 'QUEM CADASTROU',
    },
    {
        field: 'DataDeCadastro',
        headerName: 'DATA DE CADASTRO',
    },
];