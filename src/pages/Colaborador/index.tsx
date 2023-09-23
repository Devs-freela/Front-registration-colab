import { Box, Button, Typography } from "@mui/material"
import { TableGrid } from "../../components/TableGrid"
import { colors } from "../../shared/themes";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import FormColaborator from "../../components/FormColaborador";
import { api } from "../../utils/api";

export function Colaborador() {
    const [rows, setRows] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [colaboradorId, setColaboradorId] = useState("")
    const [attReq, setAttReq] = useState(0)

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    const handleAtt = () => {
        setAttReq(attReq + 1)
    }


    useEffect(() => {
        api.get("/api/colaborador/findAll?tipo=Colaborador-Comum").then((res) => setRows(res.data))
    }, [, attReq])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    return (
        <>
            <Box sx={windowWidth > 600 ? { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2 } : { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, flexDirection: "column" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px' }}>
                    Colaboradores
                </Typography>
                <Box sx={{ gap: "10px", display: "flex" }}>
                    <Button variant="contained" sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } }}>EXPORTAR</Button>
                    <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>NOVO COLABORADOR</Button>
                </Box>
            </Box>
            <TableGrid
                rows={rows}
                columns={columns}
                handleOpenModalEdit={handleOpenModalEdit}
                onEdit={() => { }}
                onDelete={() => { }}
                setColaboradorId={setColaboradorId}
                handleAttReq={handleAtt}
            />
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModal} handleAtt={handleAtt} closeModal={handleCloseModal} />
            </Dialog>
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModalEdit} isEdit={true} idColaborador={colaboradorId} closeModal={handleCloseModalEdit} handleAtt={handleAtt} />
            </Dialog>
        </>
    )
}