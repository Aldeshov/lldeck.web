import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grow,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Paper,
    Slide,
    Stack,
    Typography,
    useMediaQuery
} from "@mui/material";

import {SignInService, SignUpService} from "../../services";
import {ReactComponent as CloseIcon} from "./vectors/CloseIcon.svg";
import RequestStatus from "../../models/RequestStatus";
import {validateEmail, validatePassword} from "../../tools/validators";
import {sleep} from "../../tools/extra";
import ResponseError from "../../models/ResponseError";

interface InputState {
    firstName: string;
    firstNameError: string;
    lastName: string;
    lastNameError: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    showPassword: boolean;
    licenseAgreement: boolean;
}


const SignUp: FunctionComponent<{ show: boolean, setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const matches = useMediaQuery('(max-width:1256px)');
    const [visible, setVisible] = useState<boolean>(false);
    const [signInClicked, setSignInClicked] = useState<boolean>(false);
    const [useStateElement, setUseStateElement] = useState<{ status: RequestStatus, message: string }>({
        status: RequestStatus.IDLE,
        message: ""
    })
    const [values, setValues] = useState<InputState>({
        email: '',
        emailError: "",
        password: '',
        passwordError: "",
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        showPassword: true,
        licenseAgreement: false,
    });

    useEffect(() => {
        if (props.show) setVisible(true);
    }, [props.show]);

    useEffect(() => {
        if (!visible && signInClicked) {
            setSignInClicked(false);
            props.setShow(1);
        }
    }, [visible]);

    const handleChange =
        (prop: keyof InputState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({
                ...values,
                [prop]: event.target.value,
                emailError: "",
                firstNameError: "",
                lastNameError: "",
                passwordError: ""
            });
            setUseStateElement({status: RequestStatus.IDLE, message: ""});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickLicenseAgreement = () => {
        setUseStateElement({status: RequestStatus.IDLE, message: ""});
        setValues({
            ...values,
            licenseAgreement: !values.licenseAgreement,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const allValid = (
        values.licenseAgreement &&
        validateEmail(values.email) &&
        validatePassword(values.password) &&
        values.firstName !== '' &&
        values.lastName !== ''
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValues({
            ...values,
            firstNameError: values.firstName === '' ? "Please enter the first name" : "",
            lastNameError: values.lastName === '' ? "Please enter the last name" : "",
            emailError: !validateEmail(values.email) ? "Please enter valid email address" : "",
            passwordError: !validatePassword(values.password) ? "Password too short" : "",
        });

        if (!values.licenseAgreement) {
            setUseStateElement({
                status: RequestStatus.ERROR,
                message: "You need first to agree to LLDeck's Terms and Conditions!"
            });
        }

        if (allValid) {
            setUseStateElement({status: RequestStatus.LOADING, message: ""});
            SignUpService(values.firstName, values.lastName, values.email, values.password)
                .then(
                    async () => {
                        setUseStateElement({
                            status: RequestStatus.SUCCESSFUL,
                            message: "You have been registered! Logging you in..."
                        });
                        await sleep(1000);
                        SignInService(values.email, values.password)
                            .then(
                                async (data: any) => {
                                    setUseStateElement({status: RequestStatus.LOADING, message: "You are logged in"});
                                    await sleep(1000);
                                    globalDispatch({type: 'PUT', payload: {isPermanent: true, data: data.token}});
                                    props.setShow(0);
                                },
                                (error: ResponseError) => {
                                    if (error.data) {
                                        if (error.data.non_field_errors) {
                                            let messages = "";
                                            for (let message of error.data.non_field_errors) messages += (message + "\n");
                                            setUseStateElement({status: RequestStatus.ERROR, message: messages});
                                            return;
                                        }
                                    }
                                    setUseStateElement({status: RequestStatus.ERROR, message: error.message});
                                })
                    },
                    (error: ResponseError) => {
                        console.log(error)
                        globalDispatch({type: 'DELETE'});
                        setUseStateElement({status: RequestStatus.ERROR, message: error.message});
                    })
        }
    };

    const form = (
        <Paper elevation={4} style={{
            borderRadius: !matches ? 15 : '15px 15px 0px 0px',
            padding: !matches ? 50 : '50px 20px',
            background: 'rgb(249,252,251)',
            position: 'relative'
        }}>
            {
                matches && (
                    <IconButton aria-label="delete" size="small"
                                style={{position: "absolute", right: 20, top: 20}}
                                onClick={() => props.setShow(0)}>
                        <CloseIcon/>
                    </IconButton>
                )
            }
            <Stack alignItems="center" justifyContent="center" spacing={5}>
                <Typography variant="h5" component="h6" style={{fontWeight: 700}}>
                    Create your own account!
                </Typography>
                <Box
                    noValidate
                    method="post"
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        maxWidth: 750,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                    autoComplete="on"
                >
                    <FormControl error={!!values.firstNameError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="firstNameInput">First name</InputLabel>
                        <OutlinedInput
                            type='text'
                            label="First name"
                            id="firstNameInput"
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            inputProps={{'aria-label': 'weight'}}
                            value={values.firstName}
                            aria-describedby="firstNameError"
                            onChange={handleChange('firstName')}
                        />
                        <FormHelperText id="firstNameError">{values.firstNameError}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!values.lastNameError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="lastNameInput">Last name</InputLabel>
                        <OutlinedInput
                            type='text'
                            label="Last name"
                            id="lastNameInput"
                            value={values.lastName}
                            aria-describedby="lastNameError"
                            inputProps={{'aria-label': 'weight'}}
                            onChange={handleChange('lastName')}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                        />
                        <FormHelperText id="lastNameError">{values.lastNameError}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!values.emailError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="emailInput">Email</InputLabel>
                        <OutlinedInput
                            type='email'
                            label="Email"
                            id="emailInput"
                            value={values.email}
                            aria-describedby="emailError"
                            inputProps={{'aria-label': 'weight'}}
                            onChange={handleChange('email')}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                        />
                        <FormHelperText id="emailError">{values.emailError}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!values.passwordError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="passwordInput">Password</InputLabel>
                        <OutlinedInput
                            label="Password"
                            id="passwordInput"
                            value={values.password}
                            aria-describedby="passwordError"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="passwordError">{values.passwordError}</FormHelperText>
                    </FormControl>
                    <Stack direction="row" alignItems="center" justifyContent="space-between"
                           style={{width: '95%'}}>
                        <FormControlLabel
                            label="I agree to LLDeck's Terms and Conditions*"
                            control={<Checkbox disabled={useStateElement.status === RequestStatus.LOADING}
                                               style={{color: (useStateElement.status === RequestStatus.ERROR && !values.licenseAgreement) ? 'red' : ''}}
                                               checked={values.licenseAgreement}
                                               onClick={handleClickLicenseAgreement}/>}
                            style={{
                                userSelect: 'none',
                                textAlign: 'center',
                                fontFamily: 'Manrope',
                                color: (useStateElement.status === RequestStatus.ERROR && !values.licenseAgreement) ? 'red' : '#625C5C',
                            }}/>
                        <Link to="/help" style={{textDecoration: 'none', color: '#4D5DFD'}}>
                            Need help?
                        </Link>
                    </Stack>
                    <Grow mountOnEnter unmountOnExit
                          in={useStateElement.status === RequestStatus.ERROR || useStateElement.status === RequestStatus.SUCCESSFUL}>
                        <Alert elevation={1}
                               onClose={() => {
                                   setUseStateElement({status: RequestStatus.IDLE, message: ""})
                               }}
                               severity={useStateElement.status === RequestStatus.SUCCESSFUL ? "success" : "error"}
                               style={{padding: '10px 25px', width: '90%', marginTop: 25, marginBottom: 25}}>
                            {useStateElement.message}
                        </Alert>
                    </Grow>
                    <LoadingButton loading={useStateElement.status === RequestStatus.LOADING} type="submit"
                                   variant={!matches ? "outlined" : "contained"}
                                   style={{
                                       padding: 10,
                                       fontSize: 16,
                                       textTransform: 'none',
                                       width: !matches ? 200 : 250,
                                       borderRadius: 50,
                                       marginTop: 75,
                                       marginBottom: 25
                                   }}>
                        Sign up
                    </LoadingButton>
                    <Typography variant="body1" onClick={() => {
                        setSignInClicked(true);
                        props.setShow(0);
                    }}>
                        Already have an account?&nbsp;
                        <span className="link">Sign In</span>
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );

    return (
        <Modal className="fullscreen-container" open={visible} onClose={() => props.setShow(0)}
               style={{display: matches ? 'flex' : ''}}>
            <Box maxWidth={!matches ? 750 : 500} maxHeight={!matches ? 500 : 640}
                 style={{margin: !matches ? '2% auto' : 'auto auto 0 auto', width: matches ? '100%' : ''}}>
                {
                    !matches
                        ?
                        <Grow in={props.show} mountOnEnter unmountOnExit
                              onExited={() => setVisible(false)}
                              onExit={() => props.setShow(0)}>
                            {form}
                        </Grow>
                        :
                        <Slide direction="up" in={props.show} mountOnEnter unmountOnExit
                               onExited={() => setVisible(false)}
                               onExit={() => props.setShow(0)}>
                            {form}
                        </Slide>
                }
            </Box>
        </Modal>
    )
}

export default SignUp;
