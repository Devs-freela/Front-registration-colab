/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { body, button, buttonMobile, buttonMobileSuccess, buttonSuccess, container, containerLoadingBtn, containerLoadingBtnMobile, containerSelect, form, input, inputError, inputGroup1, inputGroup2, inputGroupMobile, title } from './styles/AppStyles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { calculateAge } from './utils/calculateAge';
import { colors } from '../../shared/themes';
import { api } from '../../utils/api';
import { useToken } from '../../shared/hooks/useAuth';

const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    dataNascimento: Yup.date().required('A data de nascimento é obrigatória').typeError('A data de nascimento é obrigatória'),
    idade: Yup.number(),
    telefone: Yup.string().required('O telefone é obrigatório').length(15, 'Telefone deve conter 11 dígitos numéricos'),
    email: Yup.string().email('Digite um email válido').required('O email é obrigatório'),
    profissao: Yup.string(),
    escolaridade: Yup.string(),
    redesSociais: Yup.string().required('Rede social é obrigatório'),
    cep: Yup.string(),
    rua: Yup.string(),
    bairro: Yup.string(),
    numeroCasa: Yup.string(),
    complemento: Yup.string(),
    rg: Yup.string(),
    orgaoExpedidor: Yup.string(),
    cpf: Yup.string().length(14, 'CPF deve conter 11 dígitos numéricos').required('CPF é obrigatório'),
    tituloEleitor: Yup.string(),
    zona: Yup.string(),
    secao: Yup.string(),
    faixaSalarial: Yup.number(),
    recebeBeneficio: Yup.boolean(),
    nomeMae: Yup.string().required('O nome da mãe é obrigatório'),
    nomePai: Yup.string()
});

interface props {
    handleCloseModal: () => void
    isEdit?: boolean
    idColaborador?: string
    handleAtt?: () => void
    closeModal?: () => void
    formLider?: boolean
}

function FormColaborator({ handleCloseModal, isEdit, idColaborador, handleAtt, closeModal, formLider }: props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [cepFind, setCepFind] = useState(false)
    const [cepLoading, setCeploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ageSetted, setAgeSetted] = useState(false)
    const [apiSuccess, setApiSuccess] = useState(false)
    const [winSize] = useState(600)
    const [shrinkEdit, setShrinkEdit] = useState(false)
    const [cpf, setCpf] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');


    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
        resolver: !isEdit ? yupResolver(schema) : yupResolver(schema),
    });

    const { userId, User_Access } = useToken()

    const recutador = (userAccess: string, userId: string) => {
        if (userAccess === "Lider") {
            return { liderId: userId }
        } else if (userAccess === "Colaborador-Cadastro") {
            return { recrutadorId: userId }
        } else if (userAccess === "Administrativo") {
            return { admId: userId }
        }
    }

    const idRecrutador = recutador(User_Access, userId)

    const onSubmit = (data: any) => {
        setLoading(true)
        if (!isEdit) {
            // console.log({ ...data, liderId: id });
            api.post(`/api/colaborador`, {
                ...data,
                ...idRecrutador
            }).then((res) => {
                if (handleAtt) {
                    handleAtt()
                }
                setLoading(false)
                setApiSuccess(true)
                setPhoneNumber("")
                setCpf("")
                reset()
                toast.success(res.data.message)
                if (closeModal) {
                    closeModal()
                }
                setTimeout(() => {
                    setApiSuccess(false)
                }, 3000)
            }).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.message)
            })
        } else {
            if (!formLider) {
                api.put(`/api/colaborador/update/${idColaborador}`, data).then((res) => {
                    if (handleAtt) {
                        handleAtt()
                    }
                    setLoading(false)
                    setApiSuccess(true)
                    toast.success("Dados editados com sucesso!")
                    setTimeout(() => {
                        setApiSuccess(false)
                    }, 3000)
                    handleCloseModal()
                }).catch((err) => {
                    setLoading(false)
                    toast.error(err.response.data.message)
                })
            } else {
                api.put(`/api/lider/${idColaborador}`, data).then((res) => {
                    if (handleAtt) {
                        handleAtt()
                    }
                    setLoading(false)
                    setApiSuccess(true)
                    toast.success("Dados editados com sucesso!")
                    setTimeout(() => {
                        setApiSuccess(false)
                    }, 3000)
                    handleCloseModal()
                }).catch((err) => {
                    setLoading(false)
                    toast.error(err.response.data.message)
                })
            }
        }
    };

    const cepListenner = watch("cep")
    const dataNascimentoListenner = watch("dataNascimento")

    useEffect(() => {
        const age = calculateAge(dataNascimentoListenner?.toString())
        if (age) {
            setAgeSetted(true)
            setValue("idade", age)
        }

    }, [dataNascimentoListenner])

    useEffect(() => {
        if (cepListenner?.length === 9 && !isEdit) {
            setCeploading(true)
            axios.get(`https://brasilapi.com.br/api/cep/v1/${cepListenner}`, {
            }).then((res) => {
                setValue("rua", res.data.street)
                setValue("bairro", res.data.neighborhood)
                setCepFind(true)
                setCeploading(false)
            }).catch((err) => {
                err.response.data.errors.map((erro: any) => {
                    toast.error(erro.message)
                    if (erro.message === "CEP NAO ENCONTRADO") {
                        toast.error("Cep não encontrado")
                        setValue("rua", "")
                        setValue("bairro", "")
                        setCepFind(false)
                        setCeploading(false)
                    }
                })
            })
        }
    }, [cepListenner])

    function formatarData(data: string) {
        const dataObj = new Date(data);
        const ano = dataObj.getFullYear();
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const dia = dataObj.getDate().toString().padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    }

    const handleCPFEdit = (cpf: string) => {
        const numericValue = cpf.replace(/\D/g, '');

        let formattedCPF = numericValue;
        if (numericValue.length > 3) {
            formattedCPF = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        }
        if (numericValue.length > 6) {
            formattedCPF = `${formattedCPF.slice(0, 7)}.${formattedCPF.slice(7)}`;
        }
        if (numericValue.length > 9) {
            formattedCPF = `${formattedCPF.slice(0, 11)}-${formattedCPF.slice(11)}`;
        }
        setCpf(formattedCPF);
        return formattedCPF
    }


    const handlePhoneNumberEdit = (number: string): string => {

        const numericValue = number.replace(/\D/g, '');

        let formattedPhoneNumber = numericValue;

        if (numericValue.length > 2) {
            formattedPhoneNumber = `(${numericValue.slice(0, 2)}`;
            if (numericValue.length > 2) {
                formattedPhoneNumber = `${formattedPhoneNumber}) ${numericValue.slice(2, 7)}`;
                if (numericValue.length > 7) {
                    formattedPhoneNumber = `${formattedPhoneNumber}-${numericValue.slice(7, 11)}`;
                }
            }
        }

        setPhoneNumber(formattedPhoneNumber)
        return formattedPhoneNumber
    }


    const [faixaSalarialDefault, setFaixaSalarialDefault] = useState<number>()
    const [escolaridadeDefault, setEscolaridadeDefault] = useState<number>()
    const [recebeBeneficio, setRecebeBeneficio] = useState(false)
    const [userRole, setUserRoles] = useState()
    const [loadingEdit, setLoadingEdit] = useState(false)

    useEffect(() => {
        if (isEdit) {
            setLoadingEdit(true)
            api.get(`/api/colaborador/${idColaborador}`).then((res) => {
                setUserRoles(res.data.role?.name)
                setValue("nome", res.data.nome)
                setValue("dataNascimento", formatarData(res.data.dataNascimento) as unknown as Date)
                setValue("telefone", handlePhoneNumberEdit(res.data.telefone))
                setValue("email", res.data.email)
                setValue("profissao", res.data.profissao)
                setValue("escolaridade", res.data.escolaridade)
                setValue("redesSociais", res.data.redesSociais)
                setValue("nomeMae", res.data.nomeMae)
                setValue("nomePai", res.data.nomePai)
                setValue("cep", res.data.cep)
                setValue("rua", res.data.rua)
                setValue("bairro", res.data.bairro)
                setValue("numeroCasa", res.data.numeroCasa)
                setValue("complemento", res.data.complemento)
                setValue("rg", res.data.rg)
                setValue("orgaoExpedidor", res.data.orgaoExpedidor)
                setValue("cpf", handleCPFEdit(res.data.cpf))
                setValue("tituloEleitor", res.data.tituloEleitor)
                setValue("secao", res.data.secao)
                setValue("zona", res.data.zona)
                setValue("faixaSalarial", res.data.faixaSalarial)
                setValue("recebeBeneficio", res.data.recebeBeneficio)
                setFaixaSalarialDefault(res.data.faixaSalarial)
                setEscolaridadeDefault(res.data.escolaridade)
                setRecebeBeneficio(res.data.recebeBeneficio)
                setShrinkEdit(true)
                setLoadingEdit(false)
            })
        }
    }, [])

    const handleCPF = (event: any) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '');

        let formattedCPF = numericValue;
        if (numericValue.length > 3) {
            formattedCPF = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        }
        if (numericValue.length > 6) {
            formattedCPF = `${formattedCPF.slice(0, 7)}.${formattedCPF.slice(7)}`;
        }
        if (numericValue.length > 9) {
            formattedCPF = `${formattedCPF.slice(0, 11)}-${formattedCPF.slice(11)}`;
        }

        setCpf(formattedCPF);
    }

    const handlePhoneNumber = (event: any) => {
        const { value } = event.target;

        const numericValue = value.replace(/\D/g, '');

        let formattedPhoneNumber = numericValue;

        if (numericValue.length > 2) {
            formattedPhoneNumber = `(${numericValue.slice(0, 2)}`;
            if (numericValue.length > 2) {
                formattedPhoneNumber = `${formattedPhoneNumber}) ${numericValue.slice(2, 7)}`;
                if (numericValue.length > 7) {
                    formattedPhoneNumber = `${formattedPhoneNumber}-${numericValue.slice(7, 11)}`;
                }
            }
        }

        setPhoneNumber(formattedPhoneNumber);
    }

    const handleCEP = (event: any) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '');

        let formattedCEP = numericValue;
        if (numericValue.length > 5) {
            formattedCEP = `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
        }

        setValue('cep', formattedCEP);
    }


    return loadingEdit ? <Box sx={container}><CircularProgress /></Box> : (
        <Box sx={body}>
            <Box sx={container}>
                <Typography variant="h2" component="h2" sx={title}>
                    {!isEdit ? "Cadastrar novo colaborador" : "Editar"}
                </Typography>
                <Box sx={form} component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700 }}>
                        Dados Pessoais
                    </Typography>
                    <Box sx={windowWidth < winSize ? inputGroupMobile : inputGroup1}>
                        <TextField
                            label={errors.nome?.message ?? "Nome Completo"}
                            {...register("nome")}
                            error={!!errors.nome?.message}
                            variant="filled"
                            {...register}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            sx={windowWidth < winSize ? errors.nome?.message ? inputError : input : errors.nome?.message ? inputError : { ...input, gridColumn: "1/3" }}
                        />
                        <TextField
                            label={errors.dataNascimento?.message ?? "Data de nascimento"}
                            {...register("dataNascimento")}
                            error={!!errors.dataNascimento?.message}
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                max: '2100-12-31',
                                min: '1000-12-31'
                            }}
                            sx={errors.dataNascimento?.message ? inputError : input}
                            type='date'
                        />
                        <TextField
                            label={errors.idade?.message ?? "Idade"}
                            {...register("idade")}
                            error={!!errors.idade?.message}
                            variant="filled"
                            type='number'
                            InputLabelProps={ageSetted ? { shrink: true } : { shrink: false }}
                            sx={errors.idade?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.telefone?.message ?? "Telefone"}
                            placeholder='(DDD) 99999-9999'
                            {...register("telefone")}
                            error={!!errors.telefone?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumber(e)}
                            inputProps={{ maxLength: 15 }}
                            variant="filled"
                            sx={errors.telefone?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.email?.message ?? "Email"}
                            {...register("email")}
                            error={!!errors.email?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.email?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.profissao?.message ?? "Profissão"}
                            {...register("profissao")}
                            error={!!errors.profissao?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.profissao?.message ? inputError : input}
                        />
                        <FormControl variant='filled'>
                            <InputLabel sx={errors.escolaridade?.message ? { color: "#d32f2f" } : { color: "#202B71" }}>{errors.escolaridade?.message ?? "Escolaridade"}</InputLabel>
                            <Select
                                label={errors.escolaridade?.message ?? "Escolaridade"}
                                {...register("escolaridade")}
                                error={!!errors.escolaridade?.message}
                                sx={errors.escolaridade?.message ? inputError : { ...input, padding: 0 }}
                                defaultValue={isEdit ? escolaridadeDefault : ""}
                            >
                                <MenuItem value={0}>Ensino fundamental incompleto</MenuItem>
                                <MenuItem value={1}>Ensino fundamental completo</MenuItem>
                                <MenuItem value={2}>Ensino médio incompleto</MenuItem>
                                <MenuItem value={3}>Ensino médio completo</MenuItem>
                                <MenuItem value={4}>Superior incompleto</MenuItem>
                                <MenuItem value={5}>Superior completo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label={errors.redesSociais?.message ?? "Instagram"}
                            {...register("redesSociais")}
                            error={!!errors.redesSociais?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.redesSociais?.message ? inputError : input}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
                        <TextField
                            fullWidth
                            label={errors.nomeMae?.message ?? "Nome da mãe"}
                            {...register("nomeMae")}
                            error={!!errors.nomeMae?.message}
                            variant="filled"
                            {...register}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            sx={windowWidth < winSize ? errors.nomeMae?.message ? inputError : input : errors.nomeMae?.message ? inputError : { ...input, gridColumn: "1/3" }}
                        />
                        <TextField
                            fullWidth
                            label={errors.nomePai?.message ?? "Nome do pai"}
                            {...register("nomePai")}
                            error={!!errors.nomePai?.message}
                            variant="filled"
                            {...register}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            sx={windowWidth < winSize ? errors.nomePai?.message ? inputError : input : errors.nomePai?.message ? inputError : { ...input, gridColumn: "1/3" }}
                        />
                    </Box>
                    <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700, marginTop: 3 }}>
                        Endereço
                    </Typography>
                    <Box sx={windowWidth < winSize ? inputGroupMobile : inputGroup2}>
                        <TextField
                            label={errors.cep?.message ?? "Cep"}
                            {...register("cep")}
                            error={!!errors.cep?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            onChange={(e) => handleCEP(e)}
                            sx={windowWidth < winSize ? errors.cep?.message ? inputError : input : errors.cep?.message ? inputError : input}
                        />
                        {cepLoading ?
                            <Box sx={{ width: "231px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e4e4e4", borderBottom: "4px solid #202B71" }}>
                                <CircularProgress size={25} />
                            </Box>
                            :
                            <TextField
                                label={errors.rua?.message ?? "Rua"}
                                {...register("rua")}
                                error={!!errors.rua?.message}
                                variant="filled"
                                InputLabelProps={cepFind && !shrinkEdit ? { shrink: true } : shrinkEdit ? { shrink: true } : {}}
                                sx={errors.rua?.message ? inputError : input}
                            />
                        }
                        {cepLoading ?
                            <Box sx={{ width: "231px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e4e4e4", borderBottom: "4px solid #202B71" }}>
                                <CircularProgress size={25} />
                            </Box>
                            :
                            <TextField
                                label={errors.bairro?.message ?? "Bairro"}
                                {...register("bairro")}
                                error={!!errors.bairro?.message}
                                {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                                variant="filled"
                                InputLabelProps={cepFind && !shrinkEdit ? { shrink: true } : shrinkEdit ? { shrink: true } : {}}
                                sx={errors.bairro?.message ? inputError : input}
                            />
                        }
                        <TextField
                            label={errors.numeroCasa?.message ?? "Número"}
                            {...register("numeroCasa")}
                            error={!!errors.numeroCasa?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.numeroCasa?.message ? inputError : input}
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            fullWidth
                            label={errors.complemento?.message ?? "Complemento"}
                            {...register("complemento")}
                            error={!!errors.complemento?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.complemento?.message ? inputError : input}
                        />
                    </Box>
                    <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700, marginTop: 3 }}>
                        Documentos
                    </Typography>
                    <Box sx={windowWidth < winSize ? inputGroupMobile : inputGroup1}>
                        <TextField
                            label={errors.rg?.message ?? "RG"}
                            {...register("rg")}
                            error={!!errors.rg?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={windowWidth < winSize ? errors.rg?.message ? inputError : input : errors.rg?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.orgaoExpedidor?.message ?? "Orgão Expeditor"}
                            {...register("orgaoExpedidor")}
                            error={!!errors.orgaoExpedidor?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.orgaoExpedidor?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.cpf?.message ?? "CPF"}
                            {...register("cpf")}
                            error={!!errors.cpf?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            value={cpf}
                            onChange={(e) => handleCPF(e)}
                            inputProps={{ maxLength: 14 }}
                            variant="filled"
                            sx={errors.cpf?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.tituloEleitor?.message ?? "Título de eleitor"}
                            {...register("tituloEleitor")}
                            error={!!errors.tituloEleitor?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.tituloEleitor?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.zona?.message ?? "Zona eleitoral"}
                            {...register("zona")}
                            error={!!errors.zona?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.zona?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.secao?.message ?? "Sessão eleitoral"}
                            {...register("secao")}
                            error={!!errors.secao?.message}
                            {...(shrinkEdit ? { InputLabelProps: { shrink: true } } : {})}
                            variant="filled"
                            sx={errors.secao?.message ? inputError : input}
                        />
                    </Box>
                    <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700, marginTop: 3 }}>
                        Faixa salarial
                    </Typography>
                    <Box sx={windowWidth < winSize ? inputGroupMobile : inputGroup1}>
                        <FormControl variant='filled'>
                            <InputLabel sx={errors.faixaSalarial?.message ? { color: "#d32f2f" } : { color: "#202B71" }}>{errors.faixaSalarial?.message ?? "Salário mínimo"}</InputLabel>
                            <Select
                                label={errors.faixaSalarial?.message ?? "Salário mínimo"}
                                {...register("faixaSalarial")}
                                error={!!errors.faixaSalarial?.message}
                                sx={errors.faixaSalarial?.message ? inputError : { ...input, padding: 0 }}
                                defaultValue={isEdit ? faixaSalarialDefault : ""}
                            >
                                <MenuItem value={0}>Menos de 1 salário mínimo</MenuItem>
                                <MenuItem value={1}>1 Salário mínimo</MenuItem>
                                <MenuItem value={2}>2 Salários mínimos</MenuItem>
                                <MenuItem value={3}>3 Salários mínimos</MenuItem>
                                <MenuItem value={4}>4 Salários mínimos</MenuItem>
                                <MenuItem value={5}>5 Salários mínimos</MenuItem>
                                <MenuItem value={6}>6 Salários mínimos</MenuItem>
                                <MenuItem value={7}>Mais de 6 salários mínimos</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700, marginTop: 3 }}>
                        Benefícios
                    </Typography>
                    <Box sx={containerSelect}>
                        <Typography>Recebe algum benefício?</Typography>
                        <Typography sx={{ marginLeft: "20px", fontWeight: 700 }}>Não</Typography>
                        <Switch
                            defaultChecked={recebeBeneficio}
                            color='info'
                            {...register("recebeBeneficio")}
                        />
                        <Typography sx={{ fontWeight: 700 }}>Sim</Typography>
                    </Box>
                    {isEdit &&
                        <>
                            <Typography variant='h4' component="h4" sx={{ fontSize: "20px", color: "#202B71", fontWeight: 700, marginTop: 3 }}>
                                Alterar perfil?
                            </Typography>
                            <Box sx={windowWidth < winSize ? inputGroupMobile : inputGroup1}>
                                <FormControl variant='filled'>
                                    <InputLabel sx={{ color: "#202B71" }}>{errors.faixaSalarial?.message ?? "Perfil"}</InputLabel>
                                    <Select
                                        defaultValue={userRole}
                                        onChange={(event) => {
                                            api.put(`api/colaborador/role/${idColaborador}?tipo=${event.target.value}`).then((res) => {
                                                toast.success("Perfil do colaborador editado com sucesso!")
                                                if (handleAtt)
                                                    handleAtt()
                                            }
                                            )
                                        }}
                                    >
                                        <MenuItem value={"Colaborador-Comum"}>Colaborador</MenuItem>
                                        <MenuItem value={"Colaborador-Cadastro"}>Usuário de cadastro</MenuItem>
                                        <MenuItem value={"Lider"}>Líder</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </>

                    }
                    {loading ?
                        <Box sx={{ display: "flex", marginTop: 5, justifyContent: "end" }}>
                            <Box sx={windowWidth < winSize ? containerLoadingBtnMobile : containerLoadingBtn}>
                                <CircularProgress color='inherit' size={25} />
                            </Box>
                        </Box>
                        :
                        !apiSuccess && <Box sx={{ display: "flex", marginTop: 5, justifyContent: "end", gap: "10px" }}>
                            <Button variant='contained' onClick={handleCloseModal} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                            <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{isEdit ? "Editar" : "Cadastrar"}</Button>
                        </Box>
                    }
                    {apiSuccess &&
                        <Box sx={{ display: "flex", marginTop: 5, justifyContent: "end" }}>
                            <Button variant='contained' type='submit' color='success' sx={windowWidth < winSize ? buttonMobileSuccess : buttonSuccess} >{isEdit ? "Concluído !" : "Cadastrado !"}</Button>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default FormColaborator;
