import { Box, Typography } from "@mui/material";
import { colors } from "../../shared/themes";

export function Bairros() {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                Listagem de Bairros
            </Typography>
        </Box>
    )
}