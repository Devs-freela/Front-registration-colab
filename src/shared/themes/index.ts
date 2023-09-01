import { createTheme } from '@mui/material';

export const colors = {
    background_dark: '#F9F9F9',
    background_base: '#FFFFFF',
    primary_light: '#F2F3F7',
    primary_dark: '#202B71',
    primary_lightest: '#EED15A',
    primary_base: '#515151',
    secondary_lightest: '#FF9999',
    secondary_light: '#FF4D5B',
    secondary_dark: '#B3000E',
    secondary_base: '#DC0032',
    secondary_darkest: '#660000',
    neutral_light: '#DDDDDD',
    neutral_dark: '#515151',
    neutral_lightest: '#EFEFEF',
    neutral_base: '#9A9A9A',
    neutral_darkest: '#2B2B2B',
};

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: colors.primary_base,
            contrastText: colors.background_base,
        },
        secondary: {
            main: colors.neutral_dark,
            contrastText: colors.background_base,
        },
        background: {
            default: colors.background_dark,
            paper: colors.background_base,
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Roboto',
            'sans-serif',
        ].join(','),
    },
});
