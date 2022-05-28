import {Box, Button, Typography} from '@mui/material';
import Drawing from './vectors/Drawing-1.svg';
import {useNavigate} from "react-router";


const FirstSection = () => {
    const navigate = useNavigate();

    return (
        <Box className="main-section" sx={{backgroundColor: '#E9EEFF'}}>
            <Box component="img" src={Drawing} alt="main page drawing-1" minWidth={256} maxWidth={512} pl={4} pr={4}
                 sx={{width: {xs: '90%', md: '40%'}, pb: {xs: 2, md: 0}}}/>

            <Box display='flex' flexDirection='column' sx={{width: {xs: '75%', md: '40%'}}} p={1}
                 minWidth={256} maxWidth={640}>
                <Typography color="#323232" sx={{fontSize: {xs: 24, md: 46}}} maxWidth={320} lineHeight={1}
                            mb={4} fontWeight={600}>
                    Want to learn a language?
                </Typography>

                <Typography sx={{fontSize: {xs: 15, md: 22}}} mb={2}
                            fontWeight={400} color="#525252">
                    In our program, you can easily memorize words, expressions and any other information using spaced
                    repetitions.
                </Typography>

                <Button onClick={() => navigate('?register=1', {replace: true})}
                        variant='contained' sx={{
                    fontSize: {xs: 14, md: 16},
                    maxWidth: 256,
                    borderRadius: 60,
                    padding: {xs: '10px 128px', md: '16px 96px'},
                    textTransform: 'none',
                    m: {xs: '20px auto', md: 0},
                }}>
                    Explore
                </Button>
            </Box>
        </Box>
    )
}

export default FirstSection;
