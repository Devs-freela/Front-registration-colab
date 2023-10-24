import { GridColDef } from '@mui/x-data-grid';
import { formatPhoneNumber } from '../../utils/validationCpf';

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
        renderCell: param => {
            const telefone = formatPhoneNumber(param.row.telefone);
            return telefone;
        }
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