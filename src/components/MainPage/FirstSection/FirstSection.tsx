import { Chip, Container, Grid, Link, Typography } from '@mui/material';
import { AutoAwesomeOutlined } from '@mui/icons-material';

import './FirstSection.css'


const FirstSection = () => {
    return (
        <Container id="first-section" maxWidth="xl">
            <Container maxWidth="sm">
                <Typography variant="body1" style={{ fontSize: '150%', maxWidth: 500 }}>
                    <Link href="/" underline="none">
                        LLDeck
                    </Link>
                    &nbsp;─&nbsp;a program to facilitate the memorization of words, expressions and any other information using spaced repetitions.
                </Typography>
                <Grid container justifyContent="start" spacing={2} style={{ marginTop: 16, marginBottom: 16 }}>
                    <Grid item>
                        <Chip icon={<AutoAwesomeOutlined sx={{ width: 20 }} />} label="Get Material" color="primary" style={{ fontWeight: 500 }} />
                    </Grid>
                    <Grid item>
                        <Chip icon={<AutoAwesomeOutlined sx={{ width: 20 }} />} label="Study" color="primary" style={{ fontWeight: 500 }} />
                    </Grid>
                    <Grid item>
                        <Chip icon={<AutoAwesomeOutlined sx={{ width: 20 }} />} label="See progress" color="primary" style={{ fontWeight: 500 }} />
                    </Grid>
                </Grid>
            </Container>
            <img src='/assets/images/main-page-1.png' style={{ minWidth: '40%', maxWidth: '80%' }} />
        </Container>
    )
}

export default FirstSection;
