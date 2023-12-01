/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { TableGrid } from "../../components/TableGrid"
import { colors } from "../../shared/themes";
import { columns, columnsHistory } from "./columns";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import FormColaborator from "../../components/FormColaborador";
import { api } from "../../utils/api";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import axios from "axios";
import saveAs from "file-saver";

export function UserCadastro() {
    const [rows, setRows] = useState([])
    const [rowsFiltered, setRowsFiltered] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [colaboradorId, setColaboradorId] = useState("")
    const [attReq, setAttReq] = useState(0)
    const [openModalHistory, setOpenModalHistory] = useState(false)
    const [rowHistory, setRowsHistory] = useState([])
    const [winSize] = useState(800)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [totalRows, setTotalRows] = useState()
    const [isLoading, setIsLoading] = useState(true)

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

    const [idModalHistory, setIdModalHistory] = useState<string>()

    const handleOpenModalHistory = (id: string) => {
        setIdModalHistory(id)
        setOpenModalHistory(true)
        api.get(`api/colaborador/all/recrutados/${id}?tipo=Colaborador-Cadastro`).then((res) => {
            setRowsHistory(res.data)
        })
    }

    const handleCloseModalHistory = () => {
        setOpenModalHistory(false)
    }

    useEffect(() => {
        setIsLoading(true)
        api.get(`/api/colaborador/findAll?tipo=Colaborador-Cadastro&skip=${skip}&take=${take}`).then((res) => { setRows(res.data.items); setTotalRows(res.data.total); setIsLoading(false) })
    }, [, skip])

    useEffect(() => {
        if (attReq !== 0)
            setIsLoading(true)

        api.get(`/api/colaborador/findAll?tipo=Colaborador-Cadastro&skip=${skip}&take=${take}`).then((res) => { setRows(res.data.items); setTotalRows(res.data.total); setIsLoading(false) })
    }, [attReq])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    const [optionsSearch] = useState([
        {
            label: "Nome",
            column: "nome"
        },
        {
            label: "Cpf",
            column: "cpf"
        },
        {
            label: "Telefone",
            column: "telefone"
        },
        {
            label: "Email",
            column: "email"
        },
    ])

    const [column, setColumn] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    const handleSearch = () => {
        const filter = rows.filter((item) => String(item[column]).toLowerCase().includes(String(search).toLowerCase()))
        if (filter.length === 0) {
            toast.error(`Nenhum resultado encontrado para a pesquisa pelo(a) ${column} ${search}`)
        }
        setRowsFiltered(filter)
    }

    const handleClear = () => {
        setColumn("")
        setSearch("")
        setRowsFiltered([])
    }


    const handleExport = (tipo: string) => {
        if (tipo) {
            //  api.get(`api/colaborador/download/file?tipo=${tipo}`,).then((res) => res.data)
            const accessToken = localStorage.getItem('@token');
            // setFetchFile(true)
            axios({
                url: `${process.env.REACT_APP_PORT_PROJECT_BACKEND}/api/colaborador/download/recrutados/${idModalHistory}?tipo=${tipo}`,
                method: 'GET',
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res) => {
                const blob = new Blob([res.data])
                // setFetchFile(false)
                saveAs(blob, `colaboradores_${new Date().toLocaleDateString()}.xlsx`)
                toast.success("Arquivo esportado com sucesso")
            }).catch((err) => {
                // setFetchFile(false)
                toast.error(err.response.data.message)
            })
        }
    }

    return (
        <>
            <Box sx={windowWidth > 600 ? { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2 } : { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, flexDirection: "column" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', marginLeft: '5px' }}>
                    Usuários de cadastro
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
                    {/* <Button variant="contained" onClick={() => handleExport("Colaborador-Comum")} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } }}>EXPORTAR</Button>
                    <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>NOVO COLABORADOR</Button> */}
                </Box>
            </Box>
            <TableGrid
                rows={rowsFiltered.length > 0 ? rowsFiltered : rows}
                columns={columns}
                handleOpenModalEdit={handleOpenModalEdit}
                onEdit={() => { }}
                onDelete={() => { }}
                setColaboradorId={setColaboradorId}
                handleAttReq={handleAtt}
                history={true}
                handleOpenHistory={handleOpenModalHistory}
                setSkip={setSkip}
                totalRows={totalRows}
                isLoading={isLoading}
                onReset={() => { }}
            />
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModal} handleAtt={handleAtt} closeModal={handleCloseModal} />
            </Dialog>
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModalEdit} isEdit={true} idColaborador={colaboradorId} closeModal={handleCloseModalEdit} handleAtt={handleAtt} />
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
                                <Button variant="contained" onClick={() => handleExport("Colaborador-Cadastro")} sx={windowWidth < winSize ? { width: "90%", marginBottom: "10px", backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } } : { backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: colors.neutral_base, } }}>EXPORTAR</Button>
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