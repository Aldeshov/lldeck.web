import { Container, Typography } from '@mui/material';

import './ThirdSection.css'


const ThirdSection = () => {
    return (
        <Container id="third-section" maxWidth="xl">
            <Container maxWidth="sm" style={{ margin: 0 }}>
                <h2>Your next success is not far off.</h2>
                <br />
                <Typography variant="body1" style={{ fontSize: '150%', maxWidth: 500 }}>
                    Each new fact that you remember is an achievement. LLDeck  breaks new material on the part to facilitate memorization and make mastering the material in the phased.
                </Typography>
            </Container>
            <img src='/assets/images/main-page-3.png' style={{ maxWidth: '80%' }} />
        </Container>
    )
}

export default ThirdSection;
