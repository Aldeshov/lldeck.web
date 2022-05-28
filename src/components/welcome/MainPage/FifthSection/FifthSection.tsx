import {Box, Typography} from '@mui/material';
import Drawing from './vectors/Drawing-5.svg';


const FifthSection = () => {
    return (
        <Box className="main-section" sx={{backgroundColor: "#E9EEFF"}}>
            <Box component="img" src={Drawing} alt="main page drawing-5" minWidth={256} maxWidth={512} pl={4} pr={4}
                 sx={{width: {xs: '90%', md: '40%'}, pb: {xs: 2, md: 0}}}/>

            <Box display='flex' flexDirection='column' sx={{width: {xs: '75%', md: '40%'}}} p={1}
                 minWidth={256} maxWidth={640}>
                <Typography color="#323232" sx={{fontSize: {xs: 24, md: 38}}} lineHeight={1}
                            mb={4} fontWeight={700}>
                    Use your study time effectively!
                </Typography>

                <Typography sx={{fontSize: {xs: 15, md: 22}}} mb={2}
                            fontWeight={400} color="#525252">
                    Choose how many words you want to learn per day and move towards your goal with us!
                    Thanks to our technology, it will be twice as easy for you to memorize new words!
                </Typography>
            </Box>
        </Box>
    )
}

export default FifthSection;
