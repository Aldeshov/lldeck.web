import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import Drawing from './vectors/Drawing-1.svg';
import {useNavigate} from "react-router";


const FirstSection = () => {
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:1080px)');

    return (
        <Box className="main-section" style={{backgroundColor: '#E9EEFF'}}>
            <img src={Drawing} style={{width: matches ? '80%' : '45%', maxWidth: 512, margin: 25}}
                 alt="main page drawing-1"/>
            <Box
                style={{margin: !matches ? 25 : 5, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {
                    !matches
                        ?
                        <h1 style={{fontWeight: 700}}>Achieve the best possible results</h1>
                        :
                        <h2 style={{fontWeight: 700, color: '#4D5DFD', textAlign: 'center'}}>
                            Achieve the best possible results
                        </h2>
                }
                <br/>
                <Typography variant={!matches ? 'h5' : 'h6'}
                            style={{
                                fontWeight: 400,
                                maxWidth: !matches ? 555 : '100%',
                                textAlign: matches ? 'center' : 'unset',
                                padding: matches ? '0 20px' : ''
                            }}>
                    Our program aim to facilitate the memorization of words, expressions and any other information using
                    spaced repetitions.
                </Typography>
                <Button onClick={() => {
                    navigate('?register=1', {replace: true})
                }} variant='contained' style={{
                    fontSize: 16,
                    maxWidth: 256,
                    borderRadius: 60,
                    padding: '16px 96px',
                    textTransform: 'none',
                    margin: matches ? '25px auto 50px' : 25,
                }}>
                    Explore
                </Button>
            </Box>
        </Box>
    )
}

export default FirstSection;
