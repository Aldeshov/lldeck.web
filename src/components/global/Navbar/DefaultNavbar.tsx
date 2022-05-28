import React, {useContext, useState} from "react";
import {
    Alert,
    AppBar,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Snackbar,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {
    AssignmentIndRounded,
    InsertChartRounded,
    KeyboardArrowDown,
    KeyboardArrowUp,
    MeetingRoomRounded,
    SettingsApplicationsRounded
} from "@mui/icons-material";
import UserContext from "../../../contexts/UserContext";
import LogoIcon from './vectors/Logo.svg';
import {ReactComponent as AccountIcon} from './vectors/AccountIcon.svg';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import TokenStore from "../../../stores/TokenStore";
import APIRequest from "../../../services/APIRequest";

const DefaultNavbar = () => {
    const navigate = useNavigate();
    const {localUser} = useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleNotFinished = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleSignIn = () => {
        navigate('/?login=1', {replace: true});
    }

    const handleSignUp = () => {
        navigate('/?register=1', {replace: true});
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signOut = () => {
        APIRequest(`/auth/users/me`, "POST", {logout: 1}).then(() => {
            TokenStore.delete();
            window.location.reload();
        }).catch((error) => error)
    };

    return (
        <AppBar position="sticky" elevation={0}
                sx={{backgroundColor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: 'flex'}}>
                        <Link to="/" replace style={{display: 'flex', justifyContent: 'center'}}>
                            <Box component="img" src={LogoIcon} alt="logo" sx={{height: {xs: 24, sm: 32}}}/>
                        </Link>
                    </Typography>

                    {
                        // Loading animation
                        !localUser.ready && <CircularProgress/>
                    }

                    {
                        // Sign in & Sign up buttons
                        !localUser.user && localUser.ready && (
                            <Box flexGrow={0} display="flex" flexDirection="row" alignItems="center">
                                <Button
                                    sx={{margin: 1}}
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    style={{fontSize: 16, textTransform: 'none'}}
                                    onClick={handleSignIn}>
                                    Sign In
                                </Button>
                                <Divider orientation="vertical" flexItem sx={{margin: '20px 0'}}/>
                                <Button
                                    sx={{margin: 1}}
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    style={{fontSize: 16, textTransform: 'none'}}
                                    onClick={handleSignUp}>
                                    Sign Up
                                </Button>
                            </Box>
                        )
                    }

                    {
                        // My Decks button
                        localUser.user && (
                            <Box sx={{flexGrow: 0, marginRight: 1}}>
                                <Button disableElevation
                                        onClick={() => navigate('/decks', {replace: true})}
                                        variant="contained"
                                        startIcon={<AccountIcon style={{transform: 'scale(0.8)'}}/>}
                                        sx={{
                                            my: 2,
                                            display: 'flex',
                                            textTransform: 'none',
                                            color: '#323232',
                                            borderRadius: 25,
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: '#EAECFF',
                                            },
                                        }}>
                                    My Decks
                                </Button>
                            </Box>
                        )
                    }

                    {
                        // Profile Avatar button (desktop & mobile)
                        localUser.user && (
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Account" sx={{display: {xs: 'none', sm: 'revert'}}}>
                                    <Button onClick={handleOpenUserMenu}
                                            sx={{
                                                display: {xs: 'none', sm: 'inline-flex'},
                                                textTransform: 'none',
                                                color: '#323232',
                                                padding: '10px 12px',
                                                margin: '5px 0',
                                            }}
                                            startIcon={<Avatar sx={{width: 32, height: 32}}
                                                               alt={localUser.user ? localUser.user.name : "Profile"}
                                                               src={localUser.user?.avatar}/>}
                                            endIcon={!anchorElUser ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}>
                                        Profile
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Account" sx={{display: {xs: 'revert', sm: 'none'}}}>
                                    <IconButton onClick={handleOpenUserMenu}
                                                sx={{
                                                    display: {xs: 'revert', sm: 'none'},
                                                    color: '#323232',
                                                    margin: '5px 0',
                                                }}>
                                        <Avatar sx={{width: 32, height: 32, border: '2px solid #5E6CFF'}}
                                                alt={localUser.user ? localUser.user.name : "Profile"}
                                                src={localUser.user?.avatar}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px', width: 256}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}>
                                    <MenuItem onClick={() => {
                                        handleNotFinished();
                                        handleCloseUserMenu();
                                        navigate('/settings', {replace: true});
                                    }}>
                                        <ListItemIcon>
                                            <AssignmentIndRounded color="secondary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Profile
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        navigate('/settings', {replace: true});
                                    }} sx={{width: 320}}>
                                        <ListItemIcon>
                                            <SettingsApplicationsRounded color="secondary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Settings
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleNotFinished();
                                        handleCloseUserMenu();
                                        navigate('/settings', {replace: true});
                                    }}>
                                        <ListItemIcon>
                                            <InsertChartRounded color="secondary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Statistics
                                        </ListItemText>
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={(() => signOut())}>
                                        <ListItemIcon>
                                            <MeetingRoomRounded color="error" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Log out
                                        </ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{width: '100%'}} elevation={2}>
                        Page for this option is not ready yet!
                        In <strong>Settings</strong> you can see some part of it.
                    </Alert>
                </Snackbar>
            </Container>
        </AppBar>
    )
}

export default DefaultNavbar;
