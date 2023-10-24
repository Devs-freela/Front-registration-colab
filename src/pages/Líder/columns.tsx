import { GridColDef } from '@mui/x-data-grid';
import { formatPhoneNumber, validationCpf } from '../../utils/validationCpf';

export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'NOME DO LÍDER',
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
        field: 'bairro',
        headerName: 'BAIRRO DE ATUAÇÃO',
    },
];