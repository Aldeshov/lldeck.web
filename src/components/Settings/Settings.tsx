import {Avatar, Box, Container, Paper, Typography} from "@mui/material";
import React from "react";

const Settings = () => {
    return (
        <Container maxWidth={false} style={{height: '100%', margin: 0}}>
            <Paper elevation={1} sx={{
                width: '80%',
                margin: '5% auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar sx={{width: '30%', height: '30%', margin: 5}} alt="Azat"
                            src="https://i.pinimg.com/originals/b9/30/a1/b930a1acad60630cefb07d8c1df819c4.jpg"/>

                    <Typography component="span" sx={{display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{fontWeight: 500}}>Azat Aldeshov</h2>
                        <span style={{color: '#585656', margin: '2px 0'}}>+7 777 777 77 77</span>
                        <span style={{color: '#585656', margin: '2px 0'}}>azata1919@gmail.com</span>
                        <span style={{color: '#4D5DFD', margin: '2px 0'}}>Aim: to learn 400 words in a month</span>
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        width: 160,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Typography variant="body2" component="div"
                                    sx={{
                                        color: '#5E6CFF',
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        margin: 'auto',
                                    }}>
                            Studied 0 cards in 0 seconds today
                        </Typography>
                    </Paper>

                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        width: 160,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Typography variant="body2" component="div"
                                    sx={{
                                        color: '#5E6CFF',
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        margin: 'auto',
                                    }}>
                            Total: 1756 reviews
                        </Typography>
                    </Paper>
                </Box>
            </Paper>
        </Container>
    )
}

export default Settings;