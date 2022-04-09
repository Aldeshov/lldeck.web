import { Button, Container, Typography } from '@mui/material';

import './SecondSection.css'

const SecondSection = () => {
    return (
        <Container id="second-section" maxWidth="xl">
            <img src='/assets/images/main-page-2.png' style={{ minWidth: '40%', maxWidth: '80%' }} />
            <Container maxWidth="sm" style={{ margin: 0 }}>
                <Typography variant="body1" style={{ fontSize: '150%', maxWidth: 500 }}>
                    Achieve the best possible results. <br /> Step by step study any language.
                </Typography>
                <Button variant='contained' color='secondary' style={{ margin: 20, borderRadius: 30, padding: 16, fontStyle: 'none' }}>
                    Start to learn
                </Button>
            </Container>
        </Container>
    )
}

export default SecondSection;
