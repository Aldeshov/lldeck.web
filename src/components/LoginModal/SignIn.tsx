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
import {ReactComponent as CloseIcon} from "./vectors/CloseIcon.svg";
import {SignInService} from "../../services";
import RequestStatus from "../../models/RequestStatus";
import {validateEmail, validatePassword} from "../../tools/validators";
import {sleep} from "../../tools/extra";
import ResponseError from "../../models/ResponseError";

interface InputState {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    rememberMe: boolean;
    showPassword: boolean;
}

const SignIn: FunctionComponent<{ show: boolean, setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const matches = useMediaQuery('(max-width:1256px)');
    const [visible, setVisible] = useState<boolean>(false);
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);
    const [useStateElement, setUseStateElement] = useState<{ status: RequestStatus, message: string }>({
        status: RequestStatus.IDLE,
        message: ""
    })
    const [values, setValues] = useState<InputState>({
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        rememberMe: false,
        showPassword: false
    });

    useEffect(() => {
        if (props.show) setVisible(true);
    }, [props.show]);

    useEffect(() => {
        if (!visible && signUpClicked) {
            setSignUpClicked(false);
            props.setShow(2);
        }
    }, [visible]);

    const handleChange =
        (prop: keyof InputState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value, emailError: "", passwordError: ""});
            setUseStateElement({status: RequestStatus.IDLE, message: ""});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickRememberMe = () => {
        setValues({
            ...values,
            rememberMe: !values.rememberMe,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValues({
            ...values,
            emailError: !validateEmail(values.email) ? "Please enter valid email address" : "",
            passwordError: !validatePassword(values.password) ? "Password too short" : "",
        });

        if (validateEmail(values.email) && validatePassword(values.password)) {
            setUseStateElement({status: RequestStatus.LOADING, message: ""});
            SignInService(values.email, values.password)
                .then(
                    async (data: any) => {
                        setUseStateElement({status: RequestStatus.SUCCESSFUL, message: "You are signed in"});
                        await sleep(1000);
                        globalDispatch({type: 'PUT', payload: {isPermanent: values.rememberMe, data: data.token}});
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
        }
    };

    const form = (
        <Paper elevation={4}
               style={{
                   borderRadius: !matches ? 15 : '15px 15px 0px 0px',
                   padding: !matches ? 50 : '50px 20px',
                   background: 'rgb(249,252,251)',
                   position: 'relative'
               }}>
            {
                matches && (
                    <IconButton aria-label="delete" size="small"
                                style={{position: "absolute", right: 25, top: 25}}
                                onClick={() => props.setShow(0)}>
                        <CloseIcon/>
                    </IconButton>
                )
            }
            <Stack alignItems="center" justifyContent="center" spacing={5}>
                <Typography variant="h5" component="h6" style={{fontWeight: 700}}>
                    Sign In
                </Typography>
                <Box
                    noValidate
                    method="post"
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                    autoComplete="on"
                >
                    <FormControl error={!!values.emailError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="emailInput">Email</InputLabel>
                        <OutlinedInput
                            type="email"
                            label="Email"
                            id="emailInput"
                            value={values.email}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            onChange={handleChange('email')}
                            inputProps={{'aria-label': 'weight'}}
                            aria-describedby="emailError"
                        />
                        <FormHelperText id="emailError">{values.emailError}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!values.passwordError} sx={{m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="passwordInput">Password</InputLabel>
                        <OutlinedInput
                            label="Password"
                            id="passwordInput"
                            value={values.password}
                            disabled={useStateElement.status === RequestStatus.LOADING}
                            onChange={handleChange('password')}
                            aria-describedby="passwordError"
                            type={values.showPassword ? 'text' : 'password'}
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
                           style={{width: '100%'}}>
                        <FormControlLabel
                            label="Remember me"
                            control={<Checkbox disabled={useStateElement.status === RequestStatus.LOADING}
                                               checked={values.rememberMe}
                                               onClick={handleClickRememberMe}/>}
                            style={{
                                color: '#625C5C',
                                userSelect: 'none',
                                fontFamily: 'Manrope',
                                textAlign: 'center',
                            }}/>
                        <Link to="/restore" style={{textDecoration: 'none', color: '#4D5DFD'}}>
                            Forgot Password?
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
                        Sign in
                    </LoadingButton>
                    <Typography className="link" variant="body1" onClick={() => {
                        setSignUpClicked(true);
                        props.setShow(0);
                    }}>
                        Create a new account
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );

    return (
        <Modal className="fullscreen-container" open={visible} onClose={() => props.setShow(0)}
               style={{display: matches ? 'flex' : ''}}>
            <Box maxWidth={!matches ? 750 : 500} maxHeight={!matches ? 500 : 640}
                 style={{margin: !matches ? '5% auto' : 'auto auto 0 auto', width: matches ? '100%' : ''}}>
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
    );
}

export default SignIn;
