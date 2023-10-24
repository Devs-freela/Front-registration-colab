import { GridColDef } from '@mui/x-data-grid';
import { formatPhoneNumber, validationCpf } from '../../utils/validationCpf';

export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME',
    },

    {
        field: 'cpf',
        headerName: 'CPF',
        renderCell: param => {
            const cpf = validationCpf(param.row.cpf);
            return cpf;
        }
    },
    {
        field: 'telefone',
        headerName: 'TELEFONE',
        renderCell: param => {
            const telefone = formatPhoneNumber(param.row.telefone);
            return telefone;
        }
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
            return new Date(row.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        },
    },
]