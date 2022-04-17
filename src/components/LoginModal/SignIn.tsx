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

import {SignInService} from "../../services";


class Status {
    public static IDLE = "IDLE";
    public static Loading = "Loading";
    public static Successful = "Successful";
    public static Error = "Error";
}

interface State {
    email: string;
    password: string;
    inputError: boolean;
    rememberMe: boolean;
    showPassword: boolean;
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

const SignIn: FunctionComponent<{ show: boolean, setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        if (signUpClicked) {
            props.setShow(2);
            setSignUpClicked(false);
        }
    }, [signUpClicked]);

    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        inputError: false,
        rememberMe: false,
        showPassword: false
    });

    const [state, dispatch] = useReducer(Reducer, {
        loading: false, error: false, message: ''
    })

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: Status.IDLE});
            setValues({...values, [prop]: event.target.value, inputError: false});
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
            inputError: values.email === '' || values.password.length < 4,
        });

        if (values.email !== '' && values.password.length >= 4) {
            dispatch({type: Status.Loading, payload: ''});
            SignInService(values.email, values.password)
                .then(async data => {
                    dispatch({type: Status.Successful, payload: "You are logged in"});
                    await sleep(1000);
                    globalDispatch({type: 'PUT', payload: {isPermanent: values.rememberMe, data: data.token}});
                    props.setShow(0);
                })
                .catch((error: Error) => {
                    dispatch({
                        type: Status.Error,
                        payload: error.message === 'Bad Request' ? "Username or password is incorrect" : error.message
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
                                Sign In
                            </Typography>
                            <Box
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
                                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="emailInput">Email</InputLabel>
                                    <OutlinedInput
                                        type='email'
                                        id="emailInput"
                                        error={values.inputError}
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
                                        id="passwordInput"
                                        error={values.inputError}
                                        disabled={state.loading}
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
                                        label="Remember me"
                                        control={<Checkbox disabled={state.loading} checked={values.rememberMe}
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
                                                   marginTop: 75,
                                                   marginBottom: 25
                                               }}>
                                    Sign in
                                </LoadingButton>
                                <Typography className="link" variant="body1" onClick={() => setSignUpClicked(true)}>
                                    Create a new account
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grow>
            </Box>
        </Modal>
    );
}

export default SignIn;
