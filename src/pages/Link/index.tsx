/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { colors } from "../../shared/themes";
import { useToken } from "../../shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { containerLink } from "../../components/ToolbarContainer/styles";
import { useClipboard } from "use-clipboard-copy";

export function Link() {
    const { User_Access, userId } = useToken()
    const [path, setPath] = useState("")
    const clipboard = useClipboard();
    const handleCopyClick = () => {
        clipboard.copy(path);
    };
    useEffect(() => {
        setPath(User_Access === "Administrativo" ? `https://registro-separado.vercel.app/register/adm/${userId}` : `https://registro-separado.vercel.app/register/${userId}`)
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
                <Box>
                    <Typography sx={{ fontWeight: 600, color: colors.primary_dark, fontSize: '24px', display: 'flex', justifyContent: 'center' }} >
                        Copie o link para adicionar um novo colaborador
                    </Typography>
                    {path.length < 60 ? (<Box sx={containerLink}><CircularProgress /></Box>) : (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 4,
                            marginBottom: 27,
                            borderColor: colors.neutral_base,
                            backgroundColor: colors.neutral_light,
                            borderRadius: 3,
                            padding: 0.5,
                        }}
                        >
                            <Typography sx={{ display: 'flex', justifyContent: 'center', ml: 3 }} >
                                {path}
                            </Typography>

                            <IconButton sx={{ mr: 3 }} onClick={handleCopyClick} >
                                <FileCopyOutlinedIcon />
                            </IconButton>
                        </Box>)}
                </Box>
            </Box>
        </>
    )
}