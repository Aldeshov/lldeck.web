import { Container, Typography } from '@mui/material';

import './FifthSection.css'


const FifthSection = () => {
    return (
        <Container id="fifth-section" maxWidth="xl">
            <Container maxWidth="sm" style={{ margin: 0 }}>
                <Typography variant="body1" style={{ fontSize: '150%', maxWidth: 500 }}>
                    <h2>
                        Use your study time effectively!
                    </h2>
                    <br />
                    Choose how many words you want to learn per day and move towards your goal with us!
                    Thanks to our technology, it will be twice as easy for you to memorize new words!
                </Typography>
            </Container>
            <img src='/assets/images/main-page-5.png' style={{ maxWidth: '80%' }} />
        </Container>
    )
}

export default FifthSection;
