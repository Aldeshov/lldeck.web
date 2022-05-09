import {Box, Container, Typography, useMediaQuery} from '@mui/material';
import DrawingMini from './vectors/Drawing-3-mini.svg';
import Drawing from './vectors/Drawing-3.svg';


const ThirdSection = () => {
    const matches = useMediaQuery('(max-width:1080px)');

    return (
        <Box className="main-section" style={{backgroundColor: '#E9EEFF', padding: matches ? '50px 0' : ''}}>
            {
                !matches
                    ?
                    <img src={Drawing} style={{width: '45%', maxWidth: 512, margin: 25}}
                         alt="main page drawing-3"/>
                    :
                    <img src={DrawingMini} style={{width: '90%', maxWidth: 1080, margin: 0}}
                         alt="main page drawing-3 mini"/>
            }
            <Container maxWidth="sm" style={{margin: matches ? 10 : 25}}>
                {
                    !matches
                        ?
                        <h1 style={{fontWeight: 700}}>Don't lose motivation.</h1>
                        :
                        <h2 style={{fontWeight: 700, color: '#4D5DFD', textAlign: 'center'}}>Don't lose motivation.</h2>
                }
                <br/>
                <Typography variant={!matches ? 'h5' : 'h6'}
                            style={{
                                maxWidth: !matches ? 555 : '100%',
                                fontWeight: 400,
                                textAlign: matches ? 'center' : 'unset'
                            }}>
                    Learn the material once and for all.
                    When even a small amount of material covered feels like a victory, it motivates you to keep working.
                </Typography>
            </Container>
        </Box>
    )
}

export default ThirdSection;
