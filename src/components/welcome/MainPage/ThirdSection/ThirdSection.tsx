import {Box, Typography} from '@mui/material';
import DrawingMini from './vectors/Drawing-3-mini.svg';
import Drawing from './vectors/Drawing-3.svg';


const ThirdSection = () => {
    return (
        <Box className="main-section" sx={{backgroundColor: '#E9EEFF'}}>
            <Box component="img" width='90%' minWidth={256} maxWidth={512} src={Drawing} alt="main page drawing-3"
                 sx={{display: {xs: 'none', md: 'revert'}, width: '45%'}}/>
            <Box component="img" width='95%' maxWidth={1080} src={DrawingMini} mb={2} alt="main page drawing-2 mobile"
                 sx={{display: {xs: 'revert', md: 'none'}}}/>

            <Box display='flex' flexDirection='column' sx={{width: {xs: '75%', md: '40%'}}} p={1}
                 minWidth={256} maxWidth={640}>
                <Typography color="#323232" sx={{fontSize: {xs: 24, md: 38}}} lineHeight={1}
                            mb={4} fontWeight={700}>
                    Don't lose motivation.
                </Typography>

                <Typography sx={{fontSize: {xs: 15, md: 22}}} mb={2}
                            fontWeight={400} color="#525252">
                    Learn the material once and for all.
                    When even a small amount of material covered feels like a victory, it motivates you to keep working.
                </Typography>
            </Box>
        </Box>
    )
}

export default ThirdSection;
