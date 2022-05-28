import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    Grow,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Paper,
    Select,
    Typography
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../../contexts/UserContext";
import {LoadingButton} from "@mui/lab";
import PhoneInput from "react-phone-input-2";
import ProfileStatus from "../../../models/api/ProfileStatus";
import ResponseError from "../../../models/ResponseError";
import ProfileStatusService from "../../../services/ProfileStatusService";
import UserUpdateService from "../../../services/UserUpdateService";
import ProfileUpdateService from "../../../services/ProfileUpdateService";
import UserDeleteService from "../../../services/UserDeleteService";
import {EditRounded} from "@mui/icons-material";
import {AxiosError} from "axios";

interface ProfileState {
    about: string;
    mode: string | number;
    language: string | number;
}

interface UserState {
    email: string;
    emailError: string;
    name: string;
    nameError: string;
    phoneNumber: string;
    phoneNumberError: string;
    oldPassword: string;
    oldPasswordError: string;
    newPassword: string;
    newPasswordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
}


const Settings = () => {
    const {localUser} = useContext(UserContext);
    const [profileStatus, setProfileStatus] = useState<ProfileStatus>();
    const [profileStatusError, setProfileStatusError] = useState<string>();
    const [profileStatusLoading, setProfileStatusLoading] = useState<boolean>(true);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>();

    const [submitted, setSubmitted] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        if (!profileStatus) {
            setProfileStatusLoading(true);
            setProfileStatusError(undefined)
            ProfileStatusService()
                .then((data: ProfileStatus) => setProfileStatus(data))
                .catch((error: ResponseError) => setProfileStatusError(error.data ? error.detail() : error.message))
                .finally(() => setProfileStatusLoading(false))
        }
    }, [profileStatus]);

    const [profileFormValues, setProfileFormValues] = useState<ProfileState>({
        about: localUser.profile?.about || "",
        mode: localUser.profile?.selected_theme_mode || 0,
        language: localUser.profile?.selected_language || 0,
    });

    const [avatar, setAvatar] = useState<File>();
    const [userFormValues, setUserFormValues] = useState<UserState>({
        email: localUser.user?.email || "",
        emailError: "",
        name: localUser.user?.name || "",
        nameError: "",
        phoneNumber: localUser.user?.phone_number || "",
        phoneNumberError: "",
        oldPassword: "",
        oldPasswordError: "",
        newPassword: "",
        newPasswordError: "",
        confirmPassword: "",
        confirmPasswordError: ""
    });

    const handleDeleteSubmit = () => {
        if (!submitted) {
            setSubmitted(true);
            UserDeleteService()
                .then(() => window.location.reload())
                .catch((error: ResponseError) => console.log(error))
                .finally(() => setSubmitted(false))
        }
    }

    const handlePhoneNumber = (value: string) => {
        setUserFormValues({
            ...userFormValues,
            phoneNumber: value,
            phoneNumberError: ""
        });
    }

    const handleChange =
        (prop: keyof UserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setUserFormValues({
                ...userFormValues,
                [prop]: event.target.value,
                emailError: "",
                nameError: "",
                phoneNumberError: "",
                oldPasswordError: "",
                newPasswordError: "",
                confirmPasswordError: ""
            });
        };

    const handlePhotoFile = (event: any) => {
        event.preventDefault();
        setAvatar(event.target.files[0]);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitLoading(true);
        setSubmitError(undefined);
        const formData = new FormData();
        formData.append("name", userFormValues.name);
        formData.append("email", userFormValues.email);
        formData.append("phone_number", userFormValues.phoneNumber ? `+${userFormValues.phoneNumber}` : '');
        formData.append("old_password", userFormValues.oldPassword);
        formData.append("new_password1", userFormValues.newPassword);
        formData.append("new_password2", userFormValues.confirmPassword);
        if (avatar) formData.append("avatar", avatar);
        UserUpdateService(formData).then(() => {
            ProfileUpdateService({
                about: profileFormValues.about,
                selected_theme_mode: profileFormValues.mode,
                selected_language: profileFormValues.language,
            })
                .then(() => window.location.reload())
                .catch((error: AxiosError<any>) => setSubmitError(error.message))
                .finally(() => setSubmitLoading(false))
        }).catch((error: AxiosError<any>) => {
            if (error.response && error.response.data) {
                setSubmitError(error.response.data.avatar || error.message)
                let data = error.response.data
                setUserFormValues({
                    ...userFormValues,
                    nameError: data.name,
                    emailError: data.email,
                    phoneNumberError: data.phone_number,
                    oldPasswordError: data.old_password,
                    newPasswordError: data.new_password1,
                    confirmPasswordError: data.new_password2,
                });
            } else setSubmitError(error.message);
            setSubmitLoading(false);
        })
    };

    return (
        <Container maxWidth="lg" style={{margin: "auto"}}>
            <Paper elevation={0} sx={{
                width: '80%',
                margin: '5% auto',
                padding: 5,
                display: {md: 'flex', xs: 'none'},
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', margin: 1}}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={
                            <label htmlFor="avatar">
                                <input style={{display: 'none'}} onChange={handlePhotoFile}
                                       accept="image/*" id="avatar" type="file"/>
                                <IconButton component="span">
                                    <EditRounded color="primary"/>
                                </IconButton>
                            </label>
                        }
                    >
                        <Avatar sx={{
                            width: 200,
                            height: 200,
                            margin: 2,
                            boxShadow: '0 0 2px #BBBBBB'
                        }} alt={localUser.user?.name} src={localUser.user?.avatar}/>
                    </Badge>

                    <Typography component="span" sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h5" component="div">
                            {localUser.user?.name}
                        </Typography>
                        <span style={{color: '#585656', margin: '2px 0'}}>
                            {localUser.user?.phone_number}
                        </span>
                        <span style={{color: '#585656', margin: '2px 0'}}>
                            {localUser.user?.email}
                        </span>
                        <span style={{color: '#4D5DFD', margin: '2px 0'}}>
                            {localUser.profile?.about}
                        </span>
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        margin: 'auto 10px',
                        width: 160,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        {
                            profileStatusLoading ? <CircularProgress/> :
                                profileStatusError ?
                                    <span style={{
                                        color: 'red',
                                        fontWeight: 600,
                                        fontSize: 16
                                    }}>{profileStatusError}</span> :
                                    profileStatus && (
                                        <Typography variant="body2" component="div"
                                                    sx={{color: '#5E6CFF', textAlign: 'center', fontWeight: 500}}>
                                            Studied <strong>{profileStatus.cards_learned_today}</strong> cards
                                            in <strong>{profileStatus.minutes_gone_today.toFixed(2)}</strong> minutes today
                                        </Typography>
                                    )
                        }
                    </Paper>

                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        width: 160,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {
                            profileStatusLoading ? <CircularProgress/> :
                                profileStatusError ?
                                    <div style={{color: 'red', fontWeight: 600}}>{profileStatusError}</div> :
                                    profileStatus && (
                                        <Typography variant="body2" component="div"
                                                    sx={{color: '#5E6CFF', textAlign: 'center', fontWeight: 500}}>
                                            Total <strong>{profileStatus.total_reviews}</strong> reviews
                                        </Typography>
                                    )
                        }
                    </Paper>
                </Box>
            </Paper>

            <Box sx={{mt: -12, display: {md: 'none', xs: ''}}}>
                <Box top={128} margin='0 auto' position='relative' display="flex" alignItems="center"
                     justifyContent="center">
                    <Badge overlap="circular"
                           anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                           badgeContent={
                               <label htmlFor="avatar">
                                   <input style={{display: 'none'}} onChange={handlePhotoFile}
                                          accept="image/*" id="avatar" type="file"/>
                                   <IconButton component="span" sx={{zIndex: 100}}>
                                       <EditRounded color="primary"/>
                                   </IconButton>
                               </label>
                           }>
                        <Avatar sx={{
                            zIndex: 1,
                            width: 200,
                            height: 200,
                            margin: 2,
                            boxShadow: '0 0 8px #cccccc',
                        }} alt={localUser.user?.name}
                                src={localUser.user?.avatar}/>
                    </Badge>
                </Box>

                <Paper elevation={0} sx={{
                    width: '70%',
                    padding: 5,
                    margin: '5% auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
                }}>

                    <Typography component="div"
                                sx={{display: 'flex', flexDirection: 'column', textAlign: 'center', mt: 10}}>
                        <Typography variant="h5" component="div">
                            {localUser.user?.name}
                        </Typography>
                        <span style={{color: '#585656', margin: '2px 0'}}>
                            {localUser.user?.phone_number}
                        </span>
                        <span style={{color: '#585656', margin: '2px 0'}}>
                            {localUser.user?.email}
                        </span>
                        <span style={{color: '#4D5DFD', margin: '2px 0'}}>
                            {localUser.profile?.about}
                        </span>
                    </Typography>

                    <Paper sx={{
                        border: '2px solid #5E6CFF',
                        padding: 2,
                        m: '25px 0',
                        width: 256,
                        maxWidth: '80%',
                        height: 64,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {
                            profileStatusLoading ? <CircularProgress/> :
                                profileStatusError ?
                                    <div style={{
                                        color: 'red',
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}>{profileStatusError}</div> :
                                    profileStatus && (
                                        <Typography variant="body2" component="div"
                                                    sx={{color: '#5E6CFF', textAlign: 'center', fontWeight: 500}}>
                                            Studied <strong>{profileStatus.cards_learned_today}</strong> cards
                                            in <strong>{profileStatus.minutes_gone_today.toFixed(2)}</strong> minutes today.
                                            <br/>
                                            Total <strong>{profileStatus.total_reviews}</strong> reviews.
                                        </Typography>
                                    )
                        }
                    </Paper>
                </Paper>
            </Box>

            <Container maxWidth="md">
                <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" gap={2}
                     justifyContent="space-between">
                    <Box noValidate component="form"
                         sx={{
                             width: 330,
                             maxWidth: '95%',
                             display: 'flex',
                             flexDirection: 'column',
                             gap: 1,
                         }}>
                        <Typography variant="h6" component="div">
                            Settings
                        </Typography>
                        <FormControl error={!!userFormValues.nameError} variant="outlined" size="small" margin="dense">
                            <InputLabel sx={{fontSize: 14}} htmlFor="nameInput">Name</InputLabel>
                            <OutlinedInput
                                type='text'
                                label="Name"
                                id="nameInput"
                                inputProps={{'aria-label': 'weight'}}
                                value={userFormValues.name}
                                aria-describedby="nameError"
                                sx={{backgroundColor: 'white', fontSize: 15}}
                                onChange={handleChange('name')}
                            />
                            <FormHelperText id="firstNameError">{userFormValues.nameError}</FormHelperText>
                        </FormControl>
                        <FormControl error={!!userFormValues.phoneNumberError} variant="outlined" size="small"
                                     margin="dense">
                            <PhoneInput
                                country={'us'}
                                specialLabel="Telephone"
                                value={userFormValues.phoneNumber}
                                aria-describedby="phoneNumberError"
                                inputStyle={{height: 40}}
                                containerStyle={{backgroundColor: 'white'}}
                                containerClass={userFormValues.phoneNumberError ? "error" : ''}
                                inputProps={{required: true}}
                                onChange={handlePhoneNumber}
                            />
                            <FormHelperText id="phoneNumberError">{userFormValues.phoneNumberError}</FormHelperText>
                        </FormControl>
                        <FormControl error={!!userFormValues.emailError} size="small" variant="outlined" margin="dense">
                            <InputLabel sx={{fontSize: 14}} htmlFor="emailInput">Email</InputLabel>
                            <OutlinedInput
                                type='email'
                                label="Email"
                                id="emailInput"
                                value={userFormValues.email}
                                aria-describedby="emailError"
                                sx={{backgroundColor: 'white', fontSize: 15}}
                                inputProps={{'aria-label': 'weight'}}
                                onChange={handleChange('email')}
                            />
                            <FormHelperText id="emailError">{userFormValues.emailError}</FormHelperText>
                        </FormControl>
                    </Box>

                    <Box noValidate
                         component="form"
                         sx={{
                             width: 330,
                             maxWidth: '95%',
                             display: 'flex',
                             flexDirection: 'column',
                             flexWrap: 'wrap',
                             gap: 1
                         }}>
                        <Typography variant="h6" component="div">
                            Change your password
                        </Typography>
                        <FormControl size="small" margin="dense"
                                     error={!!userFormValues.oldPasswordError} variant="outlined">
                            <InputLabel htmlFor="currentPassword" sx={{fontSize: 14}}>
                                Current password
                            </InputLabel>
                            <OutlinedInput
                                type="password"
                                id="currentPassword"
                                label="Current password"
                                aria-describedby="oldPasswordError"
                                value={userFormValues.oldPassword}
                                inputProps={{'aria-label': 'weight'}}
                                sx={{backgroundColor: 'white'}}
                                onChange={handleChange("oldPassword")}/>
                            <FormHelperText id="oldPasswordError">{userFormValues.oldPasswordError}</FormHelperText>
                        </FormControl>
                        <FormControl size="small" margin="dense"
                                     error={!!userFormValues.newPasswordError} variant="outlined">
                            <InputLabel htmlFor="newPassword" sx={{fontSize: 14}}>
                                New password
                            </InputLabel>
                            <OutlinedInput
                                type="password"
                                id="newPassword"
                                label="New password"
                                aria-describedby="newPasswordError"
                                value={userFormValues.newPassword}
                                inputProps={{'aria-label': 'weight'}}
                                sx={{backgroundColor: 'white'}}
                                onChange={handleChange("newPassword")}/>
                            <FormHelperText id="newPasswordError">{userFormValues.newPasswordError}</FormHelperText>
                        </FormControl>
                        <FormControl size="small" margin="dense"
                                     error={!!userFormValues.confirmPasswordError} variant="outlined">
                            <InputLabel htmlFor="confirmPassword" sx={{fontSize: 14}}>
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                type="password"
                                id="confirmPassword"
                                label="Confirm password"
                                aria-describedby="confirmPasswordError"
                                value={userFormValues.confirmPassword}
                                inputProps={{'aria-label': 'weight'}}
                                sx={{backgroundColor: 'white'}}
                                onChange={handleChange("confirmPassword")}/>
                            <FormHelperText
                                id="confirmPasswordError">{userFormValues.confirmPasswordError}</FormHelperText>
                        </FormControl>
                    </Box>
                </Box>

                <Box noValidate
                     component="form"
                     sx={{
                         maxWidth: {xs: '95%', sm: 330, md: '100%'},
                         display: 'flex',
                         flexDirection: 'column',
                         flexWrap: 'wrap',
                         gap: 2,
                         mt: 2
                     }}>
                    <Typography variant="h6" component="div">
                        About
                    </Typography>
                    <FormControl size="small" sx={{width: '100%', backgroundColor: 'white'}} variant="outlined">
                        <OutlinedInput
                            type="text"
                            id="aboutInput"
                            rows={4}
                            multiline
                            value={profileFormValues.about}
                            inputProps={{'aria-label': 'weight'}}
                            onChange={(event) => setProfileFormValues({
                                ...profileFormValues,
                                about: event.target.value
                            })}/>
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        m: '20px 0',
                        gap: 2,
                    }}>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" gap={2} mt={1}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 500}}>
                            Mode:
                        </Typography>
                        <FormControl>
                            <Select sx={{width: 225, height: 40, backgroundColor: 'white', color: '#323232'}}
                                    value={profileFormValues.mode}
                                    onChange={(event) => setProfileFormValues({
                                        ...profileFormValues,
                                        mode: event.target.value
                                    })}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>System</MenuItem>
                                <MenuItem value={2}>Light</MenuItem>
                                <MenuItem value={3}>Dark</MenuItem>
                                <MenuItem value={4}>High contrast</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" gap={2} mt={1}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 500}}>
                            Language:
                        </Typography>
                        <FormControl>
                            <Select sx={{width: 225, height: 40, backgroundColor: 'white', color: '#323232'}}
                                    value={profileFormValues.language}
                                    onChange={(event) => setProfileFormValues({
                                        ...profileFormValues,
                                        language: event.target.value
                                    })}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>English</MenuItem>
                                <MenuItem value={2}>Russian</MenuItem>
                                <MenuItem value={3}>Kazakh</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" m={1}>
                    <Typography className="link" variant="body1" onClick={handleOpen}>
                        Delete account
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" width="100%">
                    <Grow mountOnEnter unmountOnExit in={!!submitError}>
                        <Alert elevation={1} onClose={() => setSubmitError(undefined)} severity="error"
                               style={{padding: '10px 25px', width: '90%', marginTop: 25, marginBottom: 25}}>
                            {submitError || "Invalid fields"}
                        </Alert>
                    </Grow>
                </Box>

                <Box width="100%" display="flex" m="10px 0">
                    <LoadingButton sx={{m: 'auto', borderRadius: 25, padding: '10px 75px', textTransform: 'none'}}
                                   variant="contained" loading={submitLoading} onClick={handleSubmit}>
                        Save
                    </LoadingButton>
                </Box>
            </Container>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Card sx={{
                    top: '50%',
                    left: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 512,
                    maxWidth: '90%',
                    p: 4,
                }} elevation={0}>
                    <CardContent sx={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around !important',
                        gap: 2
                    }}>
                        <Typography variant="h5" fontWeight={500} gutterBottom component="div">
                            Are you sure you want to delete your account?
                        </Typography>
                        <Box width="100%" display="flex" flexDirection="row" alignItems="center"
                             justifyContent="space-around">
                            <Button onClick={handleClose} variant='contained' sx={{
                                borderRadius: 60,
                                fontFamily: 'Manrope',
                                padding: {xs: '4px 32px', md: '8px 64px'},
                                textTransform: 'none',
                            }}>
                                No
                            </Button>
                            <LoadingButton loading={submitted} variant='outlined' color="error" sx={{
                                borderRadius: 60,
                                fontFamily: 'Manrope',
                                padding: {xs: '4px 28px', md: '8px 60px'},
                                textTransform: 'none',
                            }} onClick={handleDeleteSubmit}>
                                Yes
                            </LoadingButton>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </Container>
    )
}

export default Settings;
