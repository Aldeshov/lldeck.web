import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import { useReducer, useState } from "react";

import APIRequest from "../../services";
import { useDispatch } from "react-redux";
import './SignIn.css'

class Status {
    public static Loading = "Loading";
    public static Successful = "Successful";
    public static Error = "Error";
}

interface State {
    email: string;
    password: string;
    rememberMe: boolean;
    showPassword: boolean;
    loading: boolean;
}

function Reducer(state: any, action: any) {
    switch (action.type) {
        case Status.Loading:
            return { loading: true, error: false, message: '' };
        case Status.Successful:
            return { loading: false, error: false, message: action.payload };
        case Status.Error:
            return { loading: false, error: true, message: action.payload };
        default:
            throw new Error('Undefined value');
    }
}

const SignIn = () => {
    // const globalDispatch = useDispatch();
    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        rememberMe: false,
        showPassword: false,
        loading: false,
    });

    const [state, dispatch] = useReducer(Reducer, {
        loading: false, error: false, message: ''
    })

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
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
        dispatch({ type: Status.Loading, payload: '' });
        APIRequest<any>(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
            .then(data => {
                dispatch({ type: Status.Successful, payload: "You are logged in" });
                // globalDispatch({ type: 'PUT', payload: data.token })
                // navigate('/', { replace: true })
            })
            .catch((error: Error) => {
                dispatch({
                    type: Status.Error,
                    payload: error.message === 'Bad Request' ? "Username or password is incorrect" : error.message
                });
            })
    };

    return (
        <Stack id="signin-container" alignItems="center" justifyContent="center" spacing={5}>
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
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="emailInput">Email</InputLabel>
                    <OutlinedInput
                        disabled={state.loading}
                        id="emailInput"
                        type='email'
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        value={values.email}
                        onChange={handleChange('email')}
                        label="Email"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="passwordInput">Password</InputLabel>
                    <OutlinedInput
                        disabled={state.loading}
                        id="passwordInput"
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
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ width: '90%' }}>
                    <FormControlLabel
                        label="Remember me"
                        control={<Checkbox disabled={state.loading} checked={values.rememberMe} onClick={handleClickRememberMe} />}
                        style={{ color: '#999999' }} />
                    <Link target="_blank" href="/restore" underline="none" >
                        Forgot Password?
                    </Link>
                </Stack>
                <Alert hidden={!state.error} severity="error" style={{ padding: 10, width: '90%', marginTop: 25, marginBottom: 25 }}>
                    {state.message}
                </Alert>
                <Alert hidden={state.error || state.loading || !state.message} severity="success" style={{ padding: 10, width: '90%', marginTop: 25, marginBottom: 25 }}>
                    {state.message}
                </Alert>
                <LoadingButton loading={state.loading} type="submit" variant="outlined" style={{ padding: 10, width: 200, borderRadius: 50, marginTop: 25, marginBottom: 25 }}>Sign in</LoadingButton>
                <Link href="/register" >
                    Create a new account
                </Link>
            </Box>
        </Stack>
    )
}

export default SignIn;