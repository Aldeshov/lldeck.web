import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import { useReducer, useState } from "react";

import APIRequest from "../../../services";
import { useDispatch } from "react-redux";
import './SignUp.css'
import { useNavigate } from "react-router";

class Status {
    public static IDLE = "IDLE";
    public static Loading = "Loading";
    public static Successful = "Successful";
    public static Error = "Error";
}

interface State {
    name: string;
    email: string;
    password: string;
    showPassword: boolean;
    licenseAgreement: boolean;
}

function Reducer(state: any, action: any) {
    switch (action.type) {
        case Status.IDLE:
            return { loading: false, error: false, message: '' };
        case Status.Loading:
            return { loading: true, error: false, message: 'Loading...' };
        case Status.Successful:
            return { loading: false, error: false, message: action.payload };
        case Status.Error:
            return { loading: false, error: true, message: action.payload };
        default:
            return state;
    }
}

const SignUp = () => {
    const navigate = useNavigate();
    const globalDispatch = useDispatch();

    const [values, setValues] = useState<State>({
        name: '',
        email: '',
        password: '',
        showPassword: true,
        licenseAgreement: false,
    });

    const [state, dispatch] = useReducer(Reducer, {
        loading: false, error: false, message: ''
    })

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Status.IDLE });
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickLicenseAgreement = () => {
        dispatch({ type: Status.IDLE });
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
        dispatch({
            type: values.licenseAgreement ? Status.Loading : Status.Error,
            payload: values.licenseAgreement ? '' : "You need first to agree to LLDeck's Terms and Conditions!"
        });

        if (values.licenseAgreement) {
            dispatch({ type: Status.Loading, payload: '' });
            APIRequest<any>(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            })
                .then(data => {
                    dispatch({ type: Status.Successful, payload: "You are registered!" });
                    globalDispatch({ type: 'PUT', payload: data.token })
                    navigate('/', { replace: true })
                })
                .catch((error: Error) => {
                    globalDispatch({ type: 'DELETE' })
                    dispatch({
                        type: Status.Error,
                        payload: error.message === 'Bad Request' ? "Entered email or password unacceptable!" : error.message
                    });
                })
        }
    };

    return (
        <Stack id="signup-container" alignItems="center" justifyContent="center" spacing={5}>
            <Typography variant="h5" component="h6">
                Create your own account!
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                    <InputLabel htmlFor="nameInput">Name</InputLabel>
                    <OutlinedInput
                        type='text'
                        id="nameInput"
                        disabled={state.loading}
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        value={values.name}
                        onChange={handleChange('name')}
                        label="Name"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="emailInput">Email</InputLabel>
                    <OutlinedInput
                        type='email'
                        id="emailInput"
                        disabled={state.loading}
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
                        label="I agree to LLDeck's Terms and Conditions*"
                        control={<Checkbox disabled={state.loading} style={{ color: (state.error && !values.licenseAgreement) ? 'red' : '' }} checked={values.licenseAgreement} onClick={handleClickLicenseAgreement} />}
                        style={{ color: (state.error && !values.licenseAgreement) ? 'red' : '#999999' }} />
                    <Link target="_blank" href="/help" underline="none" >
                        Need help?
                    </Link>
                </Stack>
                <Alert hidden={!state.error} severity="error" style={{ padding: 10, width: '90%', marginTop: 25, marginBottom: 25 }}>
                    {state.message}
                </Alert>
                <Alert hidden={state.error || state.loading || !state.message} severity="success" style={{ padding: 10, width: '90%', marginTop: 25, marginBottom: 25 }}>
                    {state.message}
                </Alert>
                <LoadingButton loading={state.loading} type="submit" variant="outlined" style={{ padding: 10, width: 200, borderRadius: 50, marginTop: 25, marginBottom: 25 }}>Sign up</LoadingButton>
                <Typography variant="body1">
                    Already have an account?&nbsp;
                    <Link href="/login" >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}

export default SignUp;