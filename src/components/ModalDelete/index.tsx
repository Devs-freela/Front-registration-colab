import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
} from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { colors } from '../../shared/themes'
import React from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { input, inputError } from '../FormColaborador/styles/AppStyles'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'

interface ModalDeleteProps {
    id: string,
    handleAtt: () => void
    onDeleteBairro?: boolean
    onDeleteLider?: boolean
    onDeleteEquipe?: boolean
}

const schema = Yup.object().shape({
    password: Yup.string().required('A senha é obrigatória'),
});

export function ModalDelete({ id, handleAtt, onDeleteBairro, onDeleteLider, onDeleteEquipe }: ModalDeleteProps) {
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (data: any) => {

        if (onDeleteBairro === true) {
            api.delete(`api/bairro/${id}`, {
                'headers': {
                    'password': data.password
                }
            }).then((res) => {
                toast.success("Bairro deletado com sucesso!.")
                setOpen(false)
                handleAtt()

            }).catch((err) => toast.error(err.response.data.message))
        }
        if (onDeleteEquipe === true) {
            api.delete(`api/equipe/${id}`, {
                'headers': {
                    'password': data.password
                }
            }).then((res) => {
                toast.success("Equipe deletada com sucesso!")
                setOpen(false)
                handleAtt()

            }).catch((err) => toast.error(err.response.data.message))
        }
        if (!onDeleteBairro && !onDeleteEquipe && !onDeleteLider) {
            api.delete(`api/colaborador/${id}`, {
                'headers': {
                    'password': data.password
                }
            }).then((res) => {
                toast.success("Deletado com sucesso!.")
                setOpen(false)
                handleAtt()
            }).catch((err) => toast.error(err.response.data.message))
        }

    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <DeleteIcon color="primary" />
            </IconButton>

            <Dialog open={open} component={"form"} onSubmit={handleSubmit(handleDelete)}>
                <DialogTitle
                    sx={{
                        color: colors.primary_base,
                        fontSize: '1.25rem',
                    }}
                >
                    Insira sua senha:
                </DialogTitle>
                <DialogContent
                    sx={{ width: '310px' }}
                >
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

                </DialogContent>
                <DialogActions sx={{ marginRight: '15px', marginBottom: '15px' }}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" type='submit' sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
