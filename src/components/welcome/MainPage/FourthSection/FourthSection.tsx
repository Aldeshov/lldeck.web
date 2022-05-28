import {Box, Typography} from '@mui/material';
import Drawing from './vectors/Drawing-4.svg';


const FourthSection = () => {
    return (
        <Box className="main-section wrap-reversed">
            <Box display='flex' flexDirection='column' sx={{width: {xs: '75%', md: '40%'}}} p={1}
                 minWidth={256} maxWidth={640}>
                <Typography color="#323232" sx={{fontSize: {xs: 24, md: 38}}} lineHeight={1}
                            mb={4} fontWeight={700}>
                    Your next success is not far off.
                </Typography>

                <Typography sx={{fontSize: {xs: 15, md: 22}}} mb={2}
                            fontWeight={400} color="#525252">
                    Each new fact that you remember is an achievement. LLDeck breaks new material on the part to
                    facilitate memorization and make mastering the material in the phased.
                </Typography>
            </Box>

            <Box component="img" src={Drawing} alt="main page drawing-4" minWidth={256} maxWidth={512} pl={4} pr={4}
                 sx={{width: {xs: '90%', md: '40%'}, pb: {xs: 2, md: 0}}}/>
        </Box>
    )
}

export default FourthSection;
