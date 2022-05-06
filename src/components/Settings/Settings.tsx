import {
    Avatar,
    Box,
    Button,
    ButtonProps,
    Container,
    FormControl,
    InputLabel,
    Paper,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import {BootstrapInput} from "../../tools/custom";
import {blue} from "@mui/material/colors";
import {ArrowDropDownRounded} from "@mui/icons-material";


const SimpleChoiceButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(blue[200]),
    border: '1px solid #C6C5C5',
    backgroundColor: 'white',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#d7d7d7',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none'
    },
}));

const Settings = () => {
    return (
        <Container maxWidth="lg" style={{margin: "auto"}}>
            <Paper elevation={1} sx={{
                width: '80%',
                margin: '5% auto',
                padding: 5,
                display: {md: 'flex', xs: 'none'},
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', margin: 1}}>
                    <Avatar sx={{width: 200, height: 200, margin: 2}} alt="Azat"
                            src="https://i.pinimg.com/originals/b9/30/a1/b930a1acad60630cefb07d8c1df819c4.jpg"/>

                    <Typography component="span" sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h5" component="div">
                            Azat Aldeshov
                        </Typography>
                        <span style={{color: '#585656', margin: '2px 0'}}>+7 777 777 77 77</span>
                        <span style={{color: '#585656', margin: '2px 0'}}>azata1919@gmail.com</span>
                        <span style={{color: '#4D5DFD', margin: '2px 0'}}>Aim: to learn 400 words in a month</span>
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        margin: 'auto 10px',
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

            <Box sx={{mt: -12, display: {md: 'none', xs: ''}}}>
                <Avatar sx={{
                    width: 200,
                    height: 200,
                    margin: '0 auto',
                    position: 'relative',
                    top: 150,
                    boxShadow: '0 0 8px #cccccc'
                }} alt="Azat" src="https://i.pinimg.com/originals/b9/30/a1/b930a1acad60630cefb07d8c1df819c4.jpg"/>

                <Paper elevation={1} sx={{
                    width: '70%',
                    padding: 5,
                    margin: '5% auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>

                    <Typography component="div"
                                sx={{display: 'flex', flexDirection: 'column', textAlign: 'center', mt: 15}}>
                        <Typography variant="h5" component="div">
                            Azat Aldeshov
                        </Typography>
                        <span style={{color: '#585656', margin: '2px 0'}}>+7 777 777 77 77</span>
                        <span style={{color: '#585656', margin: '2px 0'}}>azata1919@gmail.com</span>
                        <span style={{color: '#4D5DFD', margin: '2px 0'}}>Aim: to learn 400 words in a month</span>
                    </Typography>

                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        m: '25px 0',
                        width: 128,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Typography variant="body2" component="div"
                                    sx={{
                                        color: '#5E6CFF',
                                        textAlign: 'center',
                                        fontWeight: 500,
                                    }}>
                            Studied 0 cards in 0 seconds today
                        </Typography>
                    </Paper>

                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        width: 128,
                        height: 64,
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
                </Paper>
            </Box>

            <Typography variant="h5" component="div" sx={{ml: '15%'}}>
                Settings
            </Typography>

            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    m: '20px 15%',
                    maxWidth: 400,
                }}>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="fullName">
                        Full Name
                    </InputLabel>
                    <BootstrapInput defaultValue="Azat Aldeshov" id="fullName"/>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="email">
                        Email
                    </InputLabel>
                    <BootstrapInput defaultValue="azata1919@gmail.com" id="email"/>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="telephone">
                        Telephone
                    </InputLabel>
                    <BootstrapInput defaultValue="+7 777 777 77 77" id="telephone"/>
                </FormControl>
            </Box>

            <Typography variant="h5" component="div" sx={{ml: '15%', mt: 5}}>
                Aim to learn
            </Typography>

            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    maxWidth: 800,
                    m: '20px 15%',
                    gap: 5,
                }}>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="aim">
                        New
                    </InputLabel>
                    <BootstrapInput id="aim"/>
                </FormControl>
            </Box>

            <Typography variant="h5" component="div" sx={{ml: '15%', mt: 5}}>
                Change your password
            </Typography>

            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    maxWidth: 400,
                    m: '20px 15%',
                    gap: 5,
                }}>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="current">
                        Current
                    </InputLabel>
                    <BootstrapInput type="password" id="current"/>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="new">
                        New
                    </InputLabel>
                    <BootstrapInput type="password" id="new"/>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: '25px 15%',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        m: '10px 0'
                    }}>
                    <Typography variant="body1" component="div" sx={{fontWeight: 500, mr: 5, mb: 1, mt: 1}}>
                        Mode:
                    </Typography>
                    <SimpleChoiceButton endIcon={<ArrowDropDownRounded sx={{color: 'gray'}}/>}>
                        <Typography sx={{width: 200, color: 'gray'}} component="span">
                            Day
                        </Typography>
                    </SimpleChoiceButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        m: '10px 0'
                    }}>
                    <Typography variant="body1" component="div" sx={{fontWeight: 500, mr: 5, mb: 1, mt: 1}}>
                        Language:
                    </Typography>
                    <SimpleChoiceButton endIcon={<ArrowDropDownRounded sx={{color: 'gray'}}/>}>
                        <Typography sx={{width: 200, color: 'gray'}} component="span">
                            English
                        </Typography>
                    </SimpleChoiceButton>
                </Box>
            </Box>

            <Typography sx={{m: '25px 15%'}} className="link" variant="body1">
                Delete account
            </Typography>

            <Box sx={{width: '100%', display: 'flex'}}>
                <Button variant="contained"
                        sx={{m: '20px auto', borderRadius: 25, padding: '10px 75px', textTransform: 'none'}}>
                    Save
                </Button>
            </Box>
        </Container>
    )
}

export default Settings;
