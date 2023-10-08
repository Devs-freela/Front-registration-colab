import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME',
    },

    {
        field: 'idade',
        headerName: 'IDADE',
    },
    {
        field: 'telefone',
        headerName: 'TELEFONE',
    },
    {
        field: 'bairro',
        headerName: 'BAIRRO',
    },
    {
        field: 'createdAt',
        headerName: 'DATA DE CADASTRO',
        renderCell({ row }) {
            return new Date(row.createdAt).toLocaleDateString()
        },
    },
];