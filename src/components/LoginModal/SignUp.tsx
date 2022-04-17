import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useReducer, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grow,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {SignInService, SignUpService} from "../../services";


class Status {
    public static IDLE = "IDLE";
    public static Loading = "Loading";
    public static Successful = "Successful";
    public static Error = "Error";
}

interface State {
    name: string;
    nameError: boolean;
    email: string;
    emailError: boolean;
    password: string;
    passwordError: boolean;
    showPassword: boolean;
    licenseAgreement: boolean;
}

function Reducer(state: any, action: any) {
    switch (action.type) {
        case Status.IDLE:
            return {loading: false, error: false, message: ''};
        case Status.Loading:
            return {loading: true, error: false, message: 'Loading...'};
        case Status.Successful:
            return {loading: false, error: false, message: action.payload};
        case Status.Error:
            return {loading: false, error: true, message: action.payload};
        default:
            return state;
    }
}

const SignUp: FunctionComponent<{ show: boolean, setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const [signInClicked, setSignInClicked] = useState<boolean>(false);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        if (signInClicked) {
            props.setShow(1);
            setSignInClicked(false);
        }
    }, [signInClicked]);

    const [values, setValues] = useState<State>({
        name: '', nameError: false,
        email: '', emailError: false,
        password: '', passwordError: false,
        showPassword: true,
        licenseAgreement: false,
    });

    const [state, dispatch] = useReducer(Reducer, {
        loading: false, error: false, message: ''
    })

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: Status.IDLE});
            setValues({
                ...values, [prop]: event.target.value,
                nameError: false, emailError: false, passwordError: false
            });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickLicenseAgreement = () => {
        dispatch({type: Status.IDLE});
        setValues({
            ...values,
            licenseAgreement: !values.licenseAgreement,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValues({
            ...values,
            nameError: values.name === '',
            emailError: values.email === '',
            passwordError: values.password.length < 4
        });

        if (!values.licenseAgreement) {
            dispatch({
                type: Status.Error,
                payload: "You need first to agree to LLDeck's Terms and Conditions!"
            });
        }

        if (values.licenseAgreement && values.name !== '' && values.email !== '' && values.password.length >= 4) {
            dispatch({type: Status.Loading, payload: ''});
            SignUpService(values.name, values.email, values.password)
                .then(async _data => {
                    dispatch({type: Status.Successful, payload: "You have been registered! Logging you in..."});
                    await sleep(1000);
                    SignInService(values.email, values.password)
                        .then(async data => {
                            dispatch({type: Status.Successful, payload: "You are logged in"});
                            await sleep(1000);
                            globalDispatch({type: 'PUT', payload: {isPermanent: true, data: data.token}});
                            props.setShow(0);
                        })
                        .catch((error: Error) => {
                            dispatch({
                                type: Status.Error,
                                payload: error.message === 'Bad Request' ? "Username or password is incorrect" : error.message
                            });
                        })
                })
                .catch((error: Error) => {
                    globalDispatch({type: 'DELETE'})
                    dispatch({
                        type: Status.Error,
                        payload: error.message === 'Bad Request' ? "Entered email or password unacceptable!" : error.message
                    });
                })
        }
    };

    return (
        <Modal className="fullscreen-container" open={props.show} onClose={() => props.setShow(0)}>
            <Box maxWidth={750} maxHeight={500} style={{margin: '5% auto'}}>
                <Grow in={props.show}>
                    <Paper elevation={4} style={{borderRadius: 15, padding: 50, background: 'rgb(249,252,251)'}}>
                        <Stack alignItems="center" justifyContent="center" spacing={5}>
                            <Typography variant="h5" component="h6" style={{fontWeight: 700}}>
                                Create your own account!
                            </Typography>
                            <Box
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
                                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="nameInput">Name</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        id="nameInput"
                                        error={values.nameError}
                                        disabled={state.loading}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        label="Name"
                                    />
                                </FormControl>
                                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="emailInput">Email</InputLabel>
                                    <OutlinedInput
                                        type='email'
                                        id="emailInput"
                                        error={values.emailError}
                                        disabled={state.loading}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="passwordInput">Password</InputLabel>
                                    <OutlinedInput
                                        disabled={state.loading}
                                        id="passwordInput"
                                        error={values.passwordError}
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
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
                                        label="Password"
                                    />
                                </FormControl>
                                <Stack direction="row" alignItems="center" justifyContent="space-between"
                                       style={{width: '95%'}}>
                                    <FormControlLabel
                                        label="I agree to LLDeck's Terms and Conditions*"
                                        control={<Checkbox disabled={state.loading}
                                                           style={{color: (state.error && !values.licenseAgreement) ? 'red' : ''}}
                                                           checked={values.licenseAgreement}
                                                           onClick={handleClickLicenseAgreement}/>}
                                        style={{
                                            userSelect: 'none',
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            color: (state.error && !values.licenseAgreement) ? 'red' : '#625C5C',
                                        }}/>
                                    <Link to="/help" style={{textDecoration: 'none', color: '#4D5DFD'}}>
                                        Need help?
                                    </Link>
                                </Stack>
                                <Alert hidden={!state.error} severity="error" elevation={1}
                                       style={{padding: 10, width: '90%', marginTop: 25, marginBottom: 25}}>
                                    {state.message}
                                </Alert>
                                <Alert hidden={state.error || state.loading || !state.message} severity="success"
                                       elevation={1}
                                       style={{padding: 10, width: '90%', marginTop: 25, marginBottom: 25}}>
                                    {state.message}
                                </Alert>
                                <LoadingButton loading={state.loading} type="submit" variant="outlined"
                                               style={{
                                                   padding: 10,
                                                   fontSize: 16,
                                                   textTransform: 'none',
                                                   width: 200,
                                                   borderRadius: 50,
                                                   marginTop: 25,
                                                   marginBottom: 25
                                               }}>
                                    Sign up
                                </LoadingButton>
                                <Typography variant="body1" onClick={() => setSignInClicked(true)}>
                                    Already have an account?&nbsp;
                                    <span className="link">
                                        Sign In
                                    </span>
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grow>
            </Box>
        </Modal>
    )
}

export default SignUp;
