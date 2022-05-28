import {Box, Button} from '@mui/material';
import DrawingMobile from './vectors/Drawing-2Mobile.svg';
import Drawing from './vectors/Drawing-2.svg';
import {useNavigate} from "react-router";


const SecondSection = () => {
    const navigate = useNavigate();

    return (
        <Box className="main-section" flexDirection='column' justifyContent='flex-start'>
            <Box component="img" width='90%' maxWidth={1280} src={Drawing} alt="main page drawing-2"
                 sx={{display: {xs: 'none', md: 'revert'}}}/>
            <Box component="img" width='95%' src={DrawingMobile} alt="main page drawing-2 mobile"
                 sx={{display: {xs: 'revert', md: 'none'}}}/>

            <Button onClick={() => navigate('?register=1', {replace: true})} variant='contained'
                    sx={{
                        mt: {xs: 2, md: 0},
                        borderRadius: 60,
                        padding: {xs: '10px 85px', md: '16px 64px'},
                        fontSize: {xs: 14, md: 16},
                        textTransform: 'none'
                    }}>
                Start to learn
            </Button>
        </Box>
    )
}

export default SecondSection;
