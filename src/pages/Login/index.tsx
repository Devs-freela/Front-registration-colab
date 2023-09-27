import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { LoginProps } from "./interfacesLogin"
import { api } from "../../utils/api"
import { colors } from "../../shared/themes"
import { containerCardLogin, containerMain } from "./styles"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { button, input, inputError } from "../../components/FormColaborador/styles/AppStyles"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const schema = Yup.object().shape({
    email: Yup.string().email().required('O Email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const currentPathname = window.location.pathname;

    const isAdmin = currentPathname.includes('/adm');

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = (data: any) => {
        const path = isAdmin ? "/api/auths/login" : "/api/auths/login/colaborador"

        api.post(path, data).then((res) => {

            toast.success("Login realizado com sucesso!")
            localStorage.setItem("@token", res.data.token)

            api.post("/api/auths/verify/token", { token: res.data.token }).then((res) => {
                if (res.data.sub.role == "PrimeiroLogin") {
                    isAdmin ? navigate("/firstLogin/adm") : navigate("/firstLogin")
                } else {
                    navigate("/")
                }

            })
        }
        ).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Box sx={containerMain}>
            <Box sx={containerCardLogin}>
                <Box component={"form"} onSubmit={handleSubmit(handleLogin)}>
                    <Typography sx={{ color: colors.primary_dark, fontSize: "40px", fontWeight: 700, marginLeft: "64px", marginTop: "76px" }}>
                        Login
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "64px", marginRight: "64px", gap: "50px", marginTop: "80px" }}>
                        <TextField
                            label={errors.email?.message ?? "email"}
                            {...register("email")}
                            error={!!errors.email?.message}
                            variant="filled"
                            sx={errors.email?.message ? inputError : input}
                        />
                        <FormControl variant="filled" sx={errors.password?.message ? inputError : input}>
                            <InputLabel htmlFor="filled-adornment-password">{errors.password?.message ?? "Password"}</InputLabel>
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
                        <Box sx={{ width: "100%", marginTop: "65px", display: "flex", justifyContent: "end" }}>
                            <Button variant='contained' type='submit' sx={{ ...button }} >{"Entrar"}</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}