import { Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export function Lideres() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        api.get("api/lider").then((res) => setRows(res.data))
    }, [])

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