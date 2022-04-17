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
    Slide,
    Stack,
    Typography,
    useMediaQuery
} from "@mui/material";
import {ReactComponent as CloseIcon} from "./vectors/CloseIcon.svg";
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
    const matches = useMediaQuery('(max-width:1256px)');
    const [visible, setVisible] = useState<boolean>(false);
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        if (props.show) setVisible(true);
    }, [props.show]);

    useEffect(() => {
        if (!visible && signUpClicked) {
            setSignUpClicked(false);
            props.setShow(2);
        }
    }, [visible]);

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

    const form = (
        <Paper elevation={4}
               style={{
                   borderRadius: 15,
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
                    <LoadingButton loading={state.loading} type="submit" variant={!matches ? "outlined" : "contained"}
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
