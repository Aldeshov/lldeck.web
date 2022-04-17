import {Box, Container, Typography, useMediaQuery} from '@mui/material';
import Drawing from './vectors/Drawing-4.svg';


const FourthSection = () => {
    const matches = useMediaQuery('(max-width:1256px)');

    return (
        <Box className="main-section wrap-reversed">
            <Container maxWidth="sm" style={{margin: !matches ? 25 : 5}}>
                {
                    !matches
                        ?
                        <h1 style={{fontWeight: 700}}>Your next success is not far off.</h1>
                        :
                        <h2 style={{fontWeight: 700, color: '#4D5DFD'}}>Your next success is not far off.</h2>
                }
                <br/>
                <Typography variant={!matches ? 'h5' : 'h6'} style={{maxWidth: !matches ? 555 : '90%'}}>
                    Each new fact that you remember is an achievement. LLDeck breaks new material on the part to
                    facilitate memorization and make mastering the material in the phased.
                </Typography>
            </Container>
            <img src={Drawing} style={{width: matches ? '90%' : '45%', maxWidth: 512, margin: 25}}
                 alt="main page drawing-1"/>
        </Box>
    )
}

export default FourthSection;
