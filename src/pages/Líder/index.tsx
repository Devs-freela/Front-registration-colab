import { Box, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import FormColaborator from "../../components/FormColaborador";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { columnsHistory } from "../UsuárioCadastro/columns";

export function Lideres() {
    const [rows, setRows] = useState([])
    const [rowsFilteres, setRowsFiltered] = useState([])
    const [column, setColumn] = useState("")
    const [search, setSearch] = useState("")
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [liderId, setLiderId] = useState("")
    const [attReq, setAttReq] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [winSize] = useState(800)

    const handleAtt = () => {
        setAttReq(attReq + 1)
    }

    useEffect(() => {
        api.get("api/lider").then((res) => {
            setRows(res.data)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (attReq != 0)
            setIsLoading(true)
        api.get("api/lider").then((res) => {
            setRows(res.data)
            setIsLoading(false)
        })
    }, [attReq])

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))


    const handleSearch = () => {
        const filter = rows.filter((item) => String(item[column]).toLowerCase().includes(String(search).toLowerCase()))
        if (filter.length == 0) {
            toast.error(`Nenhum resultado encontrado para a pesquisa pelo(a) ${column} ${search}`)
        }
        setRowsFiltered(filter)
    }

    const handleClear = () => {
        setColumn("")
        setSearch("")
        setRowsFiltered([])
    }


    const [optionsSearch] = useState([
        {
            label: "Nome do líder",
            column: "nome"
        },
        {
            label: "CPF",
            column: "cpf"
        },
        {
            label: "Telefone",
            column: "telefone"
        },
        {
            label: "Bairro de atuação",
            column: "bairro"
        },
    ])

    const [openModalHistory, setOpenModalHistory] = useState(false)
    const [rowHistory, setRowsHistory] = useState([])

    const handleOpenModalHistory = (id: string) => {
        setOpenModalHistory(true)
        api.get(`api/colaborador/all/recrutados/${id}?tipo=Lider`).then((res) => {
            setRowsHistory(res.data)
        })
    }

    const handleCloseModalHistory = () => {
        setOpenModalHistory(false)
    }


    return (
        <>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', mb: 3, mt: 2 }}>
                    Listagem de Líderes
                </Typography>
                <Box sx={windowWidth > 600 ? { gap: "10px", display: "flex" } : { gap: "10px", display: "flex", flexDirection: "column" }}>
                    <>
                        <FormControl sx={windowWidth > 600 ? { width: '130px' } : { width: '100%', marginTop: "10px" }} size="small">
                            <InputLabel id="column">Coluna</InputLabel>
                            <Select
                                labelId="column"
                                id="column"
                                label="Coluna"
                                value={column}
                                onChange={(e) => setColumn(e.target.value)}
                            >
                                {optionsSearch.map(({ label, column }) => (
                                    <MenuItem key={column} value={column} sx={{ padding: '2px 7px' }}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            label="Pesquisar"
                            placeholder="Pesquisar"
                            size="small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="search" onClick={() => handleSearch()}>
                                            <SearchIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleClear()}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                </Box>
            </Box>

            <TableGrid
                rows={rowsFilteres.length > 0 ? rowsFilteres : rows}
                columns={columns}
                onEdit={() => { }}
                isLoading={isLoading}
                onDeleteLider={() => { }}
                handleOpenHistory={handleOpenModalHistory}
                history
                handleOpenModalEdit={handleOpenModalEdit}
                setColaboradorId={setLiderId}
            />
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModalEdit} isEdit={true} idColaborador={liderId} closeModal={handleCloseModalEdit} handleAtt={handleAtt} />
            </Dialog>
            <Dialog open={openModalHistory} onClose={handleCloseModalHistory} maxWidth={"lg"}>
                <Box sx={{ padding: "0px 25px" }}>
                    <Box sx={windowWidth < winSize ? { width: "80vw" } : { width: "800px" }}>
                        <Box sx={windowWidth < winSize ? { display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" } : { display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', padding: "40px 0px" }}>
                                    Histórico de fichas cadastradas
                                </Typography>
                                {windowWidth < winSize ? <Button onClick={handleCloseModalHistory} sx={windowWidth < winSize ? { fontWeight: 900, width: "100%", marginBottom: "10px" } : { fontWeight: 900 }}>X</Button> : <></>}
                            </Box>
                            <Box sx={windowWidth < winSize ? { display: "flex", justifyContent: "space-between", width: "100%" } : {}} >
                                <Button variant="contained" onClick={() => console.log("aqui")} sx={windowWidth < winSize ? { width: "90%", marginBottom: "10px", backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } } : { backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } }}>EXPORTAR</Button>
                                {windowWidth < winSize ? <></> : <Button onClick={handleCloseModalHistory} sx={windowWidth < winSize ? { fontWeight: 900, width: "100%", marginBottom: "10px" } : { fontWeight: 900 }}>X</Button>
                                }
                            </Box>
                        </Box>
                        <TableGrid
                            rows={rowHistory}
                            columns={columnsHistory}
                        />
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}