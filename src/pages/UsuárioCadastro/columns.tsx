import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME',
    },

    {
        field: 'cpf',
        headerName: 'CPF',
    },
    {
        field: 'telefone',
        headerName: 'TELEFONE',
    },
    {
        field: 'email',
        headerName: 'EMAIL',
    },
];

export const columnsHistory: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME',
    },

    {
        field: 'cpf',
        headerName: 'CPF',
    },
    {
        field: 'createdAt',
        headerName: 'DATA E HORA DO CADASTRO',
        renderCell({ row }) {
            return new Date(row.createdAt).toLocaleDateString()
        },
    },
]