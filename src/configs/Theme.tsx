import {createTheme} from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: "Public Sans, Manrope, Roboto, sans-serif"
    },
    palette: {
        // mode: 'dark',
        text: {
            primary: '#323232'
        },
        primary: {
            main: '#4D5DFD'
        }
    },
});

export default theme;
