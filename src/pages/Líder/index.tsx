import { Box, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import FormColaborator from "../../components/FormColaborador";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export function Lideres() {
    const [rows, setRows] = useState([])
    const [rowsFilteres, setRowsFiltered] = useState([])
    const [column, setColumn] = useState("")
    const [search, setSearch] = useState("")
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [liderId, setLiderId] = useState("")
    const [attReq, setAttReq] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

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
                handleOpenModalEdit={handleOpenModalEdit}
                setColaboradorId={setLiderId}
            />
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <FormColaborator handleCloseModal={handleCloseModalEdit} isEdit={true} idColaborador={liderId} closeModal={handleCloseModalEdit} handleAtt={handleAtt} />
            </Dialog>
        </>
    )
}