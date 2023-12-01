import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { useState } from 'react'
import { colors } from '../../shared/themes'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import LockResetIcon from '@mui/icons-material/LockReset';

interface ModalDeleteProps {
    id: string,
}

export function ModalResetSenha({ id }: ModalDeleteProps) {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleReset = (data: any) => {
        api.put(`api/colaborador/update/password/${id}`).then((res) => {
            toast.success('Senha resetada com sucesso!')
            handleClose()
        }).catch((err) => toast.error(err.response.data.message))
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <LockResetIcon color="primary" />
            </IconButton>

            <Dialog open={open} >
                <DialogTitle
                    sx={{
                        color: colors.primary_base,
                        fontSize: '1.25rem',
                    }}
                >
                    Deseja realmente resetar a senha?
                </DialogTitle>

                <DialogActions sx={{ marginRight: '15px', marginBottom: '15px' }}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleReset} sx={{ backgroundColor: colors.primary_lightest, color: colors.primary_base, fontWeight: 600, '&:hover': { backgroundColor: '#c9b047', } }}>
                        Resetar Senha
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
