import {Box, Container, Typography, useMediaQuery} from '@mui/material';
import Drawing from './vectors/Drawing-5.svg';


const FifthSection = () => {
    const matches = useMediaQuery('(max-width:1256px)');

    return (
        <Box className="main-section" style={{backgroundColor: !matches ? '#E9EEFF' : 'white'}}>
            <img src={Drawing} style={{maxWidth: '80%'}} alt="main page drawing-5"/>
            <Container maxWidth="sm" style={{margin: !matches ? 25 : 5}}>
                {
                    !matches
                        ?
                        <h1 style={{fontWeight: 700}}>Use your study time effectively!</h1>
                        :
                        <h2 style={{fontWeight: 700, color: '#4D5DFD'}}>Use your study time effectively!</h2>
                }
                <br/>
                <Typography variant={!matches ? 'h5' : 'h6'} style={{maxWidth: !matches ? 555 : '90%'}}>
                    Choose how many words you want to learn per day and move towards your goal with us!
                    Thanks to our technology, it will be twice as easy for you to memorize new words!
                </Typography>
            </Container>
        </Box>
    )
}

export default FifthSection;
