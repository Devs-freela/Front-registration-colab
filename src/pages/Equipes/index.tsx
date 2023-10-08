import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import { TableGrid } from "../../components/TableGrid"
import { colors } from "../../shared/themes";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import FormColaborator from "../../components/FormColaborador";
import { api } from "../../utils/api";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { useToken } from "../../shared/hooks/useAuth";
import { columns } from "./columns";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { button, buttonMobile, input, inputError } from "../../components/FormColaborador/styles/AppStyles";
import DeleteIcon from "@mui/icons-material/Delete";


const schema = Yup.object().shape({
    nome: Yup.string().required('O nome da equipe é obrigatório'),
    liderId: Yup.string().required('A lider é obrigatório'),
    bairroId: Yup.string().required('O Bairro é obrigatório'),
});


export function Equipes() {
    const [rows, setRows] = useState([])
    const [rowsFiltered, setRowsFiltered] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [colaboradorId, setColaboradorId] = useState("")
    const [attReq, setAttReq] = useState(0)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [totalRows, setTotalRows] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [winSize] = useState(600)
    const [bairros, setBairros] = useState([])
    const [lideres, setLideres] = useState([])
    const [colaboradores, setColaboradores] = useState<any>([])
    const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<any>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [valueAutoComplete, setValueAutoComplete] = useState<any>()
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setColaboradores([...colaboradores, colaboradoresSelecionados])
        reset()
        setColaboradoresSelecionados([])
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

    const handleExport = (tipo: string) => {
        if (tipo) {
            api.get(`api/colaborador/download/file?tipo=${tipo}`)
        }
    }

    const { setUser_Access, setUserId } = useToken()

    useEffect(() => {
        if (localStorage.getItem("@token")) {
            api.post("/api/auths/verify/token", { token: localStorage.getItem("@token") }).then((res) => {
                setUser_Access(res.data.sub.role)
                setUserId(res.data.sub.id)
            }).catch((err) => {
                //window.location.href = "/login"
            })
        }
    }, [])

    const DeleteValueFromArray = (data: any) => {
        const newArr = [...colaboradores, data]

        const colaboradoresRestante = colaboradoresSelecionados?.filter((colaborador: any) => colaborador.id != data.id)

        setColaboradoresSelecionados(colaboradoresRestante)
        setColaboradores(newArr)
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    const [optionsSearch] = useState([
        {
            label: "Nome",
            column: "nome"
        },
        {
            label: "Idade",
            column: "idade"
        },
        {
            label: "Telefone",
            column: "telefone"
        },
        {
            label: "Bairro",
            column: "bairro"
        },
        {
            label: "Data de cadastro",
            column: "createdAt"
        },
    ])

    const [column, setColumn] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    const onSubmit = (data: any) => {
        console.log({ ...data, mambrosId: colaboradoresSelecionados.map((colaborador: any) => colaborador.id) })
        api.post("api/equipe", {
            ...data,
            membrosIds: colaboradoresSelecionados.map((colaborador: any) => colaborador.id)
        }).then((res) => {
            toast.success("Equipe cadastrada com sucesso!");
            setAttReq(attReq + 1);
            setOpenModal(false)
            setColaboradores([...colaboradores, colaboradoresSelecionados])
            reset()
            setColaboradoresSelecionados([])
        }).catch((err) => toast.error(err.response.data.message))
    }

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

    const handleAutoComplete = (data: any) => {
        const newArr = [...colaboradoresSelecionados, data]

        const colaboradoresRestante = colaboradores?.filter((colaborador: any) => colaborador.id != data.id)
        console.log({ colaboradores })
        setColaboradoresSelecionados(newArr)
        setColaboradores(colaboradoresRestante)
    }

    useEffect(() => {
        api.get("api/colaborador").then((res: any) => setColaboradores(res.data))
        api.get("api/lider").then((res: any) => setLideres(res.data))
        api.get("api/bairro").then((res: any) => setBairros(res.data))
    }, [openModal, openModalEdit])

    useEffect(() => {
        api.get("api/equipe").then((res: any) => setRows(res.data))
    }, [])

    useEffect(() => {
        if (attReq != 0)
            api.get("api/equipe").then((res: any) => setRows(res.data))
    }, [attReq])

    return (
        <>
            <Box sx={windowWidth > 600 ? { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2 } : { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, flexDirection: "column" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px' }}>
                    Equipes
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
                    <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>ADICIONAR EQUIPE</Button>
                </Box>
            </Box>
            <Paper>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#202b71" }}>
                                <TableCell sx={{ fontWeight: 600, color: "#FFF" }}>NOME DA EQUIPE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 && rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                return <>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            sx={{ display: "flex", flexDirection: "row-reverse" }}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                <Box sx={{ display: "flex", padding: "10px 0px" }}>
                                                    <Typography sx={{ marginLeft: "50px" }}>{row.nome}</Typography>
                                                    <Typography sx={{ marginLeft: "50px" }}>{row.bairro.nome}</Typography>
                                                </Box>
                                                <Box>
                                                    <IconButton
                                                        sx={{ marginRight: "50px" }}
                                                        onClick={() => {
                                                            api.delete(`api/equipe/${row.id}`).then((res) => {
                                                                toast.success("Equipe deletada com sucesso!")
                                                                setAttReq(attReq + 1)
                                                            }).catch((err) => toast.error(err.response.data.message))
                                                        }
                                                        }>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: "#202B710F" }}>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Bairro</TableCell>
                                                    <TableCell>Telefone</TableCell>
                                                    <TableCell sx={{ width: "60vw" }}></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            {row.membros.map((item: any) => (
                                                <TableRow key={item.id} sx={{ width: "100%", }}>
                                                    <TableCell sx={{ width: "200px" }}>{item.nome}</TableCell>
                                                    <TableCell sx={{ width: "200px" }}>{"status"}</TableCell>
                                                    <TableCell sx={{ width: "200px" }}>{item.bairro}</TableCell>
                                                    <TableCell sx={{ width: "200px" }}>{item.telefone}</TableCell>
                                                </TableRow>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>

                                </>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth={"lg"}>
                <Box sx={{ width: '500px', padding: "20px" }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ marginBottom: "40px" }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                            Cadastrar Equipe
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        <TextField
                            label={errors.nome?.message ?? "Nome da equipe"}
                            {...register("nome")}
                            error={!!errors.nome?.message}
                            variant="filled"
                            {...register}
                            sx={errors.nome?.message ? inputError : input}
                        />
                        <FormControl variant='filled'>
                            <InputLabel sx={errors.bairroId?.message ? { color: "#d32f2f" } : { color: "#202B71" }}>{errors.bairroId?.message ?? "Selecione um bairro de atuação "}</InputLabel>
                            <Select
                                label={errors.bairroId?.message ?? "Bairro"}
                                {...register("bairroId")}
                                error={!!errors.bairroId?.message}
                                sx={errors.bairroId?.message ? inputError : { ...input, padding: 0 }}
                                defaultValue={""}
                            >
                                {bairros.map((bairro: any) => (
                                    <MenuItem value={bairro.id}>{bairro.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant='filled'>
                            <InputLabel sx={errors.liderId?.message ? { color: "#d32f2f" } : { color: "#202B71" }}>{errors.liderId?.message ?? "Selecione um líder "}</InputLabel>
                            <Select
                                label={errors.liderId?.message ?? "Selecione um Líder"}
                                {...register("liderId")}
                                error={!!errors.liderId?.message}
                                sx={errors.liderId?.message ? inputError : { ...input, padding: 0 }}
                                defaultValue={""}
                            >
                                {lideres.map((lider: any) => (
                                    <MenuItem value={lider.id}>{lider.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={colaboradores}
                            getOptionLabel={(option) =>
                                `${option.nome}`
                            }
                            sx={{ gridColumn: "1 / 3" }}
                            isOptionEqualToValue={(Option: any, value: any) =>
                                Option.id === value.id
                            }
                            ListboxProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                            value={valueAutoComplete}
                            onChange={(e, value: any) => handleAutoComplete(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Colaborador" size="small" />
                            )}
                        />
                        <Box sx={{ backgroundColor: "#e5e5e5" }}>
                            {colaboradoresSelecionados.length > 0 ? (
                                <Box>
                                    {colaboradoresSelecionados.map((item: any) => (
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                m: 1,
                                                p: 1,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                            key={item.id}
                                        >
                                            {`${item.nome}`}
                                            <IconButton onClick={() => DeleteValueFromArray(item)}>
                                                <DeleteIcon color="primary" />
                                            </IconButton>
                                        </Paper>
                                    ))}
                                </Box>
                            ) : (
                                <Typography
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "200px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Nenhum colaborador selecionado
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "40px", display: "flex", justifyContent: "end", gap: "20px" }}>
                        <Button variant='contained' onClick={handleCloseModal} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                        <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{"Cadastrar"}</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}