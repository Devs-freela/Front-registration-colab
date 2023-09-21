import { Box, TextField } from "@mui/material"
import { LoginProps } from "./interfacesLogin"
import { api } from "../../utils/api"
import { colors } from "../../shared/themes"
import { containerCardLogin, containerMain } from "./styles"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { input, inputError } from "../../components/FormColaborador/styles/AppStyles"

const schema = Yup.object().shape({
    email: Yup.string().email().required('O Email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export const Login = () => {

    const handleLogin = (data: LoginProps) => {
        api.post("/api/login", data).then((res) => console.log(res)).catch((err) => console.log(err))
    }


    const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Box sx={containerMain}>
            <Box sx={containerCardLogin}>
                <Box>
                    <Box sx={{ color: colors.primary_dark, fontSize: "40px", fontWeight: 700, fontFamily: "Roboto", marginLeft: "64px", marginTop: "76px" }}>Login</Box>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "64px", marginRight: "64px", gap: "50px" }}>
                        <TextField
                            label={errors.email?.message ?? "email"}
                            {...register("email")}
                            error={!!errors.email?.message}
                            variant="filled"
                            sx={errors.email?.message ? inputError : input}
                        />
                        <TextField
                            label={errors.password?.message ?? "password"}
                            {...register("password")}
                            error={!!errors.password?.message}
                            variant="filled"
                            sx={errors.password?.message ? inputError : input}
                        />
                    </Box>
                    <Box></Box>
                </Box>
            </Box>
        </Box >
    )
}