import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { api } from "../../utils/api"
import { colors } from "../../shared/themes"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { button, input, inputError } from "../../components/FormColaborador/styles/AppStyles"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { containerCardLogin, containerMain } from "./styles";
import { useToken } from "../../shared/hooks/useAuth";

Yup.setLocale({
    mixed: {
        notOneOf: 'As senhas devem ser iguais',
    },
});

const schema = Yup.object().shape({
    password: Yup.string().required('A senha é obrigatória'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
        .required('A confirmação da senha é obrigatória'),
});
export const RedefinePassword = () => {
    const navigate = useNavigate();

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickConfirmShowPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const currentPathname = window.location.pathname;

    const isAdmin = currentPathname.includes('/adm');

    const { setUser_Access } = useToken()

    const handleRedefinePassword = (data: any) => {
        const path = "/api/colaborador/first-login"

        api.put(path, data).then((res) => {
            toast.success("Senha redefinida com sucesso!")
            localStorage.removeItem("@token")
            localStorage.setItem("@token", res.data.token)
            api.post("/api/auths/verify/token", { token: res.data.token }).then((res) => {
                setUser_Access(res.data.sub.role)
                if (res.data.sub.role == "Lider") {
                    navigate("/Links")
                } else if (res.data.sub.role == "Colaborador-Cadastro") {
                    navigate("/Cadastro")
                } else {
                    navigate("/")
                }

            })
        }
        ).catch((err) => {
            toast.error(err.response.data.message)
        }
        )
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Box sx={containerMain}>
            <Box sx={containerCardLogin}>
                <Box component={"form"} onSubmit={handleSubmit(handleRedefinePassword)}>
                    <Typography sx={{ color: colors.primary_dark, fontSize: "36px", fontWeight: 700, marginLeft: "64px", marginTop: "76px" }}>
                        Redefinir Senha
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "64px", marginRight: "64px", gap: "50px", marginTop: "80px" }}>
                        <FormControl variant="filled" sx={errors.password?.message ? inputError : input}>
                            <InputLabel htmlFor="filled-adornment-password">{errors.password?.message ?? "Insira a nova senha"}</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...register("password")}
                                error={!!errors.password?.message}
                                endAdornment={
                                    <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="filled" sx={errors.confirmPassword?.message ? inputError : input}>
                            <InputLabel htmlFor="filled-adornment-password">{errors.confirmPassword?.message ?? "Repita a senha"}</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register("confirmPassword")}
                                error={!!errors.confirmPassword?.message}
                                endAdornment={
                                    <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickConfirmShowPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Box sx={{ width: "100%", marginTop: "65px", display: "flex", justifyContent: "end" }}>
                            <Button variant='contained' type='submit' sx={{ ...button }} >{"Entrar"}</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}