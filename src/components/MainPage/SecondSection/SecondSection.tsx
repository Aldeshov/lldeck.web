import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import DrawingMini from './vectors/Drawing-2-mini.svg';
import Drawing from './vectors/Drawing-2.svg';


const SecondSection = () => {
    const matches = useMediaQuery('(max-width:1256px)');
    const buttonStyle: {} = {
        marginBottom: 20,
        borderRadius: 60,
        padding: '16px 64px',
        fontSize: 16,
        marginTop: matches ? 20 : 0,
        textTransform: 'none'
    }

    return (
        <Box className="main-section" style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            {
                !matches
                    ?
                    <img src={Drawing} style={{width: '90%', maxWidth: 1500, margin: '25px 25px 0 25px'}}
                         alt="main page drawing-2"/>
                    :
                    <img src={DrawingMini} style={{width: '100%', maxWidth: 1080, margin: 0}}
                         alt="main page drawing-2 mini"/>
            }
            {
                matches && (
                    <Typography variant='h6' style={{maxWidth: '90%', margin: 20, textAlign: 'center'}}>
                        Achieve the best possible results
                        <br/>
                        Step by step study any language.
                    </Typography>
                )
            }
            <Button variant='contained' style={buttonStyle}>
                Start to learn
            </Button>
        </Box>
    )
}

export default SecondSection;
