import { Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/themes";

export function Lideres() {
    const rows = [
        {
            id: 1,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 2,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 3,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 4,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 5,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 6,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 7,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 8,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 9,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },
        {
            id: 10,
            nome: 'João',
            cpf: '123.456.789-10',
            quemCadastrou: 'Maria',
            DataDeCadastro: '01/01/2021',
        },

    ]

    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', mb: 3, mt: 2 }}>
                Listagem de Líderes
            </Typography>
            <TableGrid
                rows={rows}
                columns={columns}
                onEdit={() => { }}
            />
        </>
    )
}