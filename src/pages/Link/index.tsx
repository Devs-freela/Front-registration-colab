import { Box, IconButton, Typography } from "@mui/material";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { colors } from "../../shared/themes";

export function Link() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
                <Box>
                    <Typography sx={{ fontWeight: 600, color: colors.primary_dark, fontSize: '24px' }} >
                        Copie o link para adicionar um novo colaborador
                    </Typography>
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
                            https://www.google.com
                        </Typography>
                        <IconButton sx={{ mr: 3 }} >
                            <FileCopyOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    )
}