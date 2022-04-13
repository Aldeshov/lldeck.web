import {useDispatch} from "react-redux";
import {Navigate, useNavigate} from "react-router";
import React, {useContext, useReducer, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";

import {SignInService} from "../../../services";

import './SignIn.css'
import UserContext from "../../../contexts/UserContext";


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

const SignIn = () => {
    const navigate = useNavigate();
    const globalDispatch = useDispatch();
    const {user} = useContext(UserContext);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

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
                    globalDispatch({type: 'PUT', payload: {isPermament: values.rememberMe, data: data.token}})
                    navigate('/', {replace: true})
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
        <Stack id="signin-container" alignItems="center" justifyContent="center" spacing={5}>
            {
                user.valid && (
                    <Navigate to="/" replace/>
                )
            }
            <Typography variant="h5" component="h6">
                Sign In
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                method="POST"
                sx={{
                    width: '80%',
                    maxWidth: 750,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
                autoComplete="on"
            >
                <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
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
                <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" style={{width: '90%'}}>
                    <FormControlLabel
                        label="Remember me"
                        control={<Checkbox disabled={state.loading} checked={values.rememberMe}
                                           onClick={handleClickRememberMe}/>}
                        style={{color: '#999999'}}/>
                    <Link target="_blank" href="/restore" underline="none">
                        Forgot Password?
                    </Link>
                </Stack>
                <Alert hidden={!state.error} severity="error"
                       style={{padding: 10, width: '90%', marginTop: 25, marginBottom: 25}}>
                    {state.message}
                </Alert>
                <Alert hidden={state.error || state.loading || !state.message} severity="success"
                       style={{padding: 10, width: '90%', marginTop: 25, marginBottom: 25}}>
                    {state.message}
                </Alert>
                <LoadingButton loading={state.loading} type="submit" variant="outlined"
                               style={{padding: 10, width: 200, borderRadius: 50, marginTop: 25, marginBottom: 25}}>Sign
                    in</LoadingButton>
                <Typography variant="body1">
                    New here?&nbsp;
                    <Link href="/register">
                        Create a new account!
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}

export default SignIn;
