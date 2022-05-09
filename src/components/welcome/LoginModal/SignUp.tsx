import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {FunctionComponent, useEffect, useState} from "react";
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

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import './styles/SignUp.css'

import {SignInService, SignUpService} from "../../../services";
import {ReactComponent as CloseIcon} from "./vectors/CloseIcon.svg";
import RequestStatus from "../../../models/RequestStatus";
import {validateEmail, validateName, validatePassword, validatePhoneNumber} from "../../../tools/validators";
import {sleep} from "../../../tools/extra";
import ResponseError from "../../../models/ResponseError";
import {useNavigate} from "react-router";

interface InputState {
    name: string;
    nameError: string;
    phoneNumber: string;
    phoneNumberError: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
    showPassword: boolean;
    licenseAgreement: boolean;
}


const SignUp: FunctionComponent<{ show: boolean }> = ({show}) => {
    const navigate = useNavigate();
    const globalDispatch = useDispatch();
    const matches = useMediaQuery('(max-width:900px)');
    const [visible, setVisible] = useState<boolean>(false);
    const [signInClicked, setSignInClicked] = useState<boolean>(false);
    const [useStateElement, setUseStateElement] = useState<{ status: RequestStatus, message: string }>({
        status: RequestStatus.IDLE,
        message: ""
    })
    const [values, setValues] = useState<InputState>({
        name: "",
        nameError: "",
        email: '',
        emailError: "",
        phoneNumber: "",
        phoneNumberError: "",
        password: '',
        passwordError: "",
        confirmPassword: "",
        confirmPasswordError: "",
        showPassword: false,
        licenseAgreement: false,
    });

    useEffect(() => {
        if (show) setVisible(true)
    }, [show]);

    useEffect(() => {
        if (!visible && signInClicked) {
            setSignInClicked(false);
            navigate('?login=1', {replace: true})
        }
    }, [visible, signInClicked, navigate]);

    const handleClose = () => {
        navigate('', {replace: true})
    }

    const handleChange =
        (prop: keyof InputState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({
                ...values,
                [prop]: event.target.value,
                emailError: "",
                nameError: "",
                passwordError: "",
                confirmPasswordError: "",
                phoneNumberError: ""
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

    const handlePhoneNumber = (value: string) => {
        setValues({
            ...values,
            phoneNumber: value,
            emailError: "",
            nameError: "",
            passwordError: "",
            confirmPasswordError: "",
            phoneNumberError: ""
        });
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const allValid = (
        values.licenseAgreement &&
        validateName(values.name) &&
        validateEmail(values.email) &&
        validatePassword(values.password) &&
        validatePhoneNumber(values.phoneNumber) &&
        values.confirmPassword === values.password
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValues({
            ...values,
            nameError: !validateName(values.name) ? "Please enter the name" : "",
            emailError: !validateEmail(values.email) ? "Please enter valid email address" : "",
            passwordError: !validatePassword(values.password) ? "Password too short" : "",
            confirmPasswordError: values.confirmPassword !== values.password ? "Please make sure that the passwords match" : "",
            phoneNumberError: !validatePhoneNumber(values.phoneNumber) ? "Please enter the valid telephone" : "",
        });

        if (!values.licenseAgreement) {
            setUseStateElement({
                status: RequestStatus.ERROR,
                message: "You need first to agree to LLDeck's Terms and Conditions!"
            });
        }

        if (allValid) {
            setUseStateElement({status: RequestStatus.LOADING, message: ""});
            SignUpService(values.name, `+${values.phoneNumber}`,
                values.email, values.password, values.confirmPassword
            )
                .then(
                    async () => {
                        setUseStateElement({
                            status: RequestStatus.SUCCESSFUL,
                            message: "You have been registered! Logging you in..."
                        });
                        await sleep(1000);
                        SignInService(values.email, values.confirmPassword, true)
                            .then(
                                async (data: any) => {
                                    setUseStateElement({status: RequestStatus.LOADING, message: "You are logged in"});
                                    await sleep(1000);
                                    globalDispatch({type: 'PUT', payload: {isPermanent: true, data: data.token}});
                                    window.location.href = '/'
                                },
                                (error) => {
                                    if (error.data) {
                                        setValues({
                                            ...values,
                                            emailError: error.data.email || "",
                                            passwordError: error.data.password || "",
                                        });
                                        setUseStateElement({
                                            status: RequestStatus.ERROR,
                                            message: error.data.__all__ || error.message
                                        });
                                    } else {
                                        setUseStateElement({
                                            status: RequestStatus.ERROR,
                                            message: error.message
                                        });
                                    }
                                })
                    },
                    (error: ResponseError) => {
                        globalDispatch({type: 'DELETE'});
                        if (error.data) {
                            setValues({
                                ...values,
                                nameError: error.data.name || "",
                                emailError: error.data.email || "",
                                phoneNumberError: error.data.phone_number || "",
                                passwordError: error.data.password1 || "",
                                confirmPasswordError: error.data.password2 || ""
                            })
                            setUseStateElement({
                                status: RequestStatus.ERROR,
                                message: error.message === 'Bad Request' ? 'Invalid data, please correct them' : error.message
                            });
                        } else {
                            setUseStateElement({
                                status: RequestStatus.ERROR,
                                message: error.message
                            });
                        }
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
                                onClick={handleClose}>
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
                    <FormControl error={!!values.nameError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="nameInput">Name</InputLabel>
                        <OutlinedInput
                            type='text'
                            label="Name"
                            id="nameInput"
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            inputProps={{'aria-label': 'weight'}}
                            value={values.name}
                            aria-describedby="nameError"
                            onChange={handleChange('name')}
                        />
                        <FormHelperText id="firstNameError">{values.nameError}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!values.phoneNumberError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <PhoneInput
                            country={'us'}
                            specialLabel="Telephone"
                            value={values.phoneNumber}
                            aria-describedby="phoneNumberError"
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            containerClass={values.phoneNumberError ? "error" : ''}
                            inputProps={{
                                required: true
                            }}
                            onChange={handlePhoneNumber}
                        />
                        <FormHelperText id="phoneNumberError">{values.phoneNumberError}</FormHelperText>
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
                    <FormControl error={!!values.confirmPasswordError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="confirmPasswordInput">Confirm password</InputLabel>
                        <OutlinedInput
                            label="Confirm password"
                            id="confirmPasswordInput"
                            value={values.confirmPassword}
                            aria-describedby="confirmPasswordError"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('confirmPassword')}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                        />
                        <FormHelperText id="confirmPasswordError">{values.confirmPasswordError}</FormHelperText>
                    </FormControl>
                    <Stack direction="row" alignItems="center" justifyContent="space-between"
                           style={{width: '100%'}}>
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
                        handleClose();
                    }}>
                        Already have an account?&nbsp;
                        <span className="link">Sign In</span>
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );

    return (
        <Modal className="fullscreen-container" open={visible} onClose={handleClose}
               style={{display: matches ? 'flex' : ''}}>
            <Box maxWidth={!matches ? 750 : 500} maxHeight={!matches ? 500 : 640}
                 style={{margin: !matches ? '2% auto' : 'auto auto 0 auto', width: matches ? '100%' : ''}}>
                {
                    !matches
                        ?
                        <Grow in={show} mountOnEnter unmountOnExit
                              onExited={() => setVisible(false)}
                              onExit={handleClose}>
                            {form}
                        </Grow>
                        :
                        <Slide direction="up" in={show} mountOnEnter unmountOnExit
                               onExited={() => setVisible(false)}
                               onExit={handleClose}>
                            {form}
                        </Slide>
                }
            </Box>
        </Modal>
    )
}

export default SignUp;
