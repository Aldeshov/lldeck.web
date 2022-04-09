import { Container, Typography } from '@mui/material';

import './FourthSection.css'


const FourthSection = () => {
    return (
        <Container id="fourth-section" maxWidth="xl">
            <img src='/assets/images/main-page-4.png' style={{ maxWidth: '80%' }} />
            <Container maxWidth="sm" style={{ margin: 0 }}>
                <Typography variant="body1" style={{ fontSize: '150%', maxWidth: 500 }}>
                    <h2>
                        Don't lose motivation.
                    </h2>
                    <br />
                    Learn the material once and for all.
                    When even a small amount of material covered feels like a victory, it motivates you to keep working.                </Typography>
            </Container>
        </Container>
    )
}

export default FourthSection;
