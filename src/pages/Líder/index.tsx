import { Dialog, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import FormColaborator from "../../components/FormColaborador";

export function Lideres() {
    const [rows, setRows] = useState([])
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [liderId, setLiderId] = useState("")
    const [attReq, setAttReq] = useState(0)

    const handleAtt = () => {
        setAttReq(attReq + 1)
    }

    useEffect(() => {
        api.get("api/lider").then((res) => setRows(res.data))
    }, [])

    useEffect(() => {
        if (attReq != 0)
            api.get("api/lider").then((res) => setRows(res.data))
    }, [attReq])

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', mb: 3, mt: 2 }}>
                Listagem de Líderes
            </Typography>
            <TableGrid
                rows={rows}
                columns={columns}
                onEdit={() => { }}
                onDeleteLider={() => { }}
                handleOpenModalEdit={handleOpenModalEdit}
                setColaboradorId={setLiderId}
            />
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModalEdit} isEdit={true} idColaborador={liderId} closeModal={handleCloseModalEdit} handleAtt={handleAtt} />
            </Dialog>
        </>
    )
}