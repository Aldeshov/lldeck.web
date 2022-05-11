import {useDispatch} from "react-redux";
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
    AccountBox,
    AssignmentIndRounded,
    InsertChartRounded,
    KeyboardArrowDown,
    KeyboardArrowUp,
    MeetingRoomRounded,
    SettingsApplicationsRounded
} from "@mui/icons-material";
import UserContext from "../../../contexts/UserContext";
import LogoIcon, {ReactComponent as Logo} from './vectors/Logo.svg';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {SearchInput} from "../../../tools/custom";


const DefaultNavbar = () => {
    const navigate = useNavigate();
    const globalDispatch = useDispatch();
    const {localUser} = useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleNotFinished = () => {
        setOpenSnackbar(true);
        handleCloseUserMenu();
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
        globalDispatch({type: 'DELETE'});
        window.location.reload()
    };

    return (
        <AppBar elevation={2} position="sticky" sx={{backgroundColor: 'white'}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: !localUser.authorized ? 1 : 0, display: {xs: 'none', md: 'flex'}}}>
                        <Link to="/" replace style={{display: 'flex', justifyContent: 'center'}}>
                            <Logo/>
                        </Link>
                    </Typography>

                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <Link to="/" replace style={{display: 'flex', justifyContent: 'center'}}>
                            <img src={LogoIcon} alt="logo" height="20"/>
                        </Link>
                    </Typography>

                    {
                        !localUser.ready && <CircularProgress/>
                    }

                    {
                        !localUser.authorized && localUser.ready && (
                            <Button
                                sx={{flexGrow: 0, margin: 1}}
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                                style={{fontSize: 16, textTransform: 'none'}}
                                onClick={handleSignIn}>
                                Sign In
                            </Button>
                        )
                    }

                    {
                        !localUser.authorized && localUser.ready && (
                            <Divider orientation="vertical" flexItem sx={{margin: '20px 0'}}/>
                        )
                    }

                    {
                        !localUser.authorized && localUser.ready && (
                            <Button
                                sx={{flexGrow: 0, margin: 1}}
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                                style={{fontSize: 16, textTransform: 'none'}}
                                onClick={handleSignUp}>
                                Sign Up
                            </Button>
                        )
                    }

                    {
                        localUser.authorized && localUser.ready && (
                            <Box sx={{flexGrow: 1, ml: 2, display: {xs: 'none', md: 'flex'}}}>
                                <SearchInput sx={{width: '256px'}} placeholder="Search"/>
                            </Box>
                        )
                    }

                    {
                        localUser.authorized && localUser.ready && (
                            <Box sx={{flexGrow: 0, marginRight: 1}}>
                                <Button disableElevation
                                        onClick={() => navigate('/decks', {replace: true})}
                                        variant="contained"
                                        startIcon={<AccountBox color="primary"/>}
                                        sx={{
                                            my: 2,
                                            display: 'flex',
                                            textTransform: 'none',
                                            color: '#323232',
                                            borderRadius: 25,
                                            backgroundColor: '#EAECFF',
                                            '&:hover': {
                                                backgroundColor: '#d3d6ee',
                                            },
                                        }}>
                                    My Decks
                                </Button>
                            </Box>
                        )
                    }

                    {
                        localUser.authorized && localUser.ready && (
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Account">
                                    <Button onClick={handleOpenUserMenu}
                                            sx={{
                                                textTransform: 'none',
                                                color: '#323232',
                                                padding: '10px 12px',
                                                margin: '5px 0',
                                            }}
                                            startIcon={<Avatar sx={{width: 32, height: 32}}
                                                               alt={localUser.user ? localUser.user.name : "Profile"}
                                                               src={`${process.env.REACT_APP_API_URL}${localUser.user?.avatar}`}/>}
                                            endIcon={!anchorElUser ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}>
                                        Profile
                                    </Button>
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
                                    <MenuItem onClick={handleNotFinished}>
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
                                    <MenuItem onClick={handleNotFinished}>
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

                    {
                        localUser.authorized && localUser.ready && (
                            <Box sx={{
                                flexGrow: 1,
                                display: {xs: 'flex', md: 'none'},
                                marginBottom: 2,
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <SearchInput sx={{width: '90%'}} placeholder="Search"/>
                            </Box>
                        )
                    }
                </Toolbar>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{width: '100%'}} elevation={2}>
                        This option will be available soon!
                    </Alert>
                </Snackbar>
            </Container>
        </AppBar>
    )
}

export default DefaultNavbar;
