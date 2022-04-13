import {useDispatch} from "react-redux";
import {Navigate, useNavigate} from "react-router";
import {useContext, useReducer, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
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
import LoadingButton from '@mui/lab/LoadingButton';

import {SignInService, SignUpService} from "../../../services";
import UserContext from "../../../contexts/UserContext";

import './SignUp.css'


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

const SignUp = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const globalDispatch = useDispatch();
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

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
                            globalDispatch({type: 'PUT', payload: {isPermament: true, data: data.token}});
                            navigate('/', {replace: true});
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
        <Stack id="signup-container" alignItems="center" justifyContent="center" spacing={5}>
            {
                user.valid && (
                    <Navigate to="/" replace/>
                )
            }
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
                <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
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
                <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
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
                <FormControl sx={{m: 1, width: '90%'}} variant="outlined">
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" style={{width: '90%'}}>
                    <FormControlLabel
                        label="I agree to LLDeck's Terms and Conditions*"
                        control={<Checkbox disabled={state.loading}
                                           style={{color: (state.error && !values.licenseAgreement) ? 'red' : ''}}
                                           checked={values.licenseAgreement} onClick={handleClickLicenseAgreement}/>}
                        style={{color: (state.error && !values.licenseAgreement) ? 'red' : '#999999'}}/>
                    <Link target="_blank" href="/help" underline="none">
                        Need help?
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
                    up</LoadingButton>
                <Typography variant="body1">
                    Already have an account?&nbsp;
                    <Link href="/login">
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}

export default SignUp;
