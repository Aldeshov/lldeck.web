import {Box, Button, Container, Typography, useMediaQuery} from '@mui/material';
import Drawing from './vectors/Drawing-1.svg';


const FirstSection = () => {
    const matches = useMediaQuery('(max-width:1256px)');

    const buttonStyle: {} = {
        margin: 20,
        borderRadius: 60,
        padding: '16px 96px',
        fontSize: 16,
        textTransform: 'none'
    }

    return (
        <Box className="main-section" style={{backgroundColor: !matches ? '#E9EEFF' : 'white'}}>
            <img src={Drawing} style={{width: matches ? '90%' : '45%', maxWidth: 512, margin: 25}}
                 alt="main page drawing-1"/>
            <Container maxWidth="sm" style={{margin: !matches ? 25 : 5}}>
                {
                    !matches
                        ?
                        <h1 style={{fontWeight: 700}}>Achieve the best possible results</h1>
                        :
                        <h2 style={{fontWeight: 700, color: '#4D5DFD'}}>Achieve the best possible results</h2>
                }
                <br/>
                <Typography variant={!matches ? 'h5' : 'h6'} style={{maxWidth: !matches ? 555 : '90%'}}>
                    Our program aim to facilitate the memorization of words, expressions and any other information using
                    spaced repetitions.
                </Typography>
                <Button hidden={matches} variant='contained' style={buttonStyle}>
                    Explore
                </Button>
            </Container>
        </Box>
    )
}

export default FirstSection;
