/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import { TableGrid } from "../../components/TableGrid";
import { GridColDef } from "@mui/x-data-grid";
import { api } from "../../utils/api";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { button, buttonMobile, input, inputError } from "../../components/FormColaborador/styles/AppStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
    nome: Yup.string().required('O bairro é obrigatório'),
    zona: Yup.string().required('A zona é obrigatória')
});

export function Bairros() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [column, setColumn] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [rows, setRows] = useState([])
    const [attReq, setAttReq] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [winSize] = useState(600)
    const [isEdit, setIsEdit] = useState(false)
    const [bairroId, setBairroId] = useState("")
    const [rowsFiltered, setRowsFiltered] = useState([])
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAtt = () => {
        setAttReq(attReq + 1)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModalEdit = () => {
        setIsEdit(true)
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setIsEdit(false)
        setBairroId("")
        setOpenModalEdit(false)
    }

    const onSubmit = (data: any) => {
        if (isEdit) {

        } else {
            api.post("api/bairro", data)
                .then((res) => {
                    toast.success("Bairro cadastrado com sucesso.");
                    setAttReq(attReq + 1)
                    handleCloseModal()
                })
                .catch((err) => toast.error(err.data.message))
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'nome',
            headerName: 'NOME DO BAIRRO',
        },

        {
            field: 'zona',
            headerName: 'ZONA',
        },
    ];

    const [optionsSearch] = useState([
        {
            label: "Nome do bairro",
            column: "nome"
        },
        {
            label: "Zona",
            column: "zona"
        },
    ])

    useEffect(() => {
        setIsLoading(true)
        api.get("api/bairro").then((res) => { setRows(res.data); setIsLoading(false) })
    }, [])

    useEffect(() => {
        if (attReq !== 0)
            setIsLoading(true)
        api.get("api/bairro").then((res) => { setRows(res.data); setIsLoading(false) })
    }, [attReq])

    useEffect(() => {
        if (bairroId !== "")
            api.get(`api/bairro/${bairroId}`).then((res) => { setValue("nome", res.data.nome); setValue("zona", res.data.zona) })
    }, [bairroId])

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

    return (
        <>
            <Box sx={windowWidth > 600 ? { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2 } : { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, flexDirection: "column" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', marginLeft: '5px' }}>
                    Bairros
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
                    <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>NOVO BAIRRO</Button>
                </Box>
            </Box>
            <TableGrid
                rows={rowsFiltered.length > 0 ? rowsFiltered : rows}
                columns={columns}
                handleOpenModalEdit={handleOpenModalEdit}
                onEdit={() => { }}
                onDeleteBairro={() => { }}
                setColaboradorId={setBairroId}
                handleAttReq={handleAtt}
                isLoading={isLoading}
            />
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth={"lg"}>
                <Box sx={{ width: '500px', padding: "20px" }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ marginBottom: "40px" }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                            Cadastrar bairros
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        <TextField
                            label={errors.nome?.message ?? "Bairro"}
                            {...register("nome")}
                            error={!!errors.nome?.message}
                            variant="filled"
                            {...register}
                            sx={errors.nome?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.zona?.message ?? "Zona"}
                            {...register("zona")}
                            error={!!errors.zona?.message}
                            variant="filled"
                            {...register}
                            sx={errors.zona?.message ? inputError : input}
                        />
                    </Box>
                    <Box sx={{ marginTop: "40px", display: "flex", justifyContent: "end", gap: "20px" }}>
                        <Button variant='contained' onClick={handleCloseModal} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                        <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{isEdit ? "Editar" : "Cadastrar"}</Button>
                    </Box>
                </Box>
            </Dialog>
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                <Box sx={windowWidth < winSize ? { width: '80vw', padding: "20px" } : { width: '500px', padding: "20px" }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ marginBottom: "40px" }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                            Editar bairro
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        <TextField
                            label={errors.nome?.message ?? "Bairro"}
                            {...register("nome")}
                            error={!!errors.nome?.message}
                            variant="filled"
                            {...register}
                            InputLabelProps={{
                                shrink: true
                            }
                            }
                            sx={errors.nome?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.zona?.message ?? "Zona"}
                            {...register("zona")}
                            error={!!errors.zona?.message}
                            variant="filled"
                            {...register}
                            InputLabelProps={{
                                shrink: true
                            }
                            }
                            sx={errors.zona?.message ? inputError : input}
                        />
                    </Box>
                    <Box sx={windowWidth < winSize ? { marginTop: "40px", display: "flex", gap: "20px", flexDirection: "column", width: "100%" } : { marginTop: "40px", display: "flex", justifyContent: "end", gap: "20px" }}>
                        <Button variant='contained' onClick={handleCloseModalEdit} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                        <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{"Editar"}</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}