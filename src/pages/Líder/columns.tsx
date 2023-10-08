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
        field: 'telefone',
        headerName: 'TELEFONE',
    },
    {
        field: 'bairro',
        headerName: 'BAIRRO DE ATUAÇÃO',
    },
];