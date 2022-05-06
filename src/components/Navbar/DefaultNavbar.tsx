import {useDispatch} from "react-redux";
import React, {Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonProps,
    Container,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {
    AccountCircle,
    BookOutlined,
    Equalizer,
    KeyboardArrowDown,
    KeyboardArrowUp,
    Logout,
    Settings
} from "@mui/icons-material";
import UserContext from "../../contexts/UserContext";
import LogoIcon, {ReactComponent as Logo} from './vectors/Logo.svg';
import {ReactComponent as OpenBook} from './vectors/OpenBook.svg';
import {blue} from "@mui/material/colors";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {SearchInput} from "../../tools/custom";


const SpecialButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(blue[200]),
    backgroundColor: '#EAECFF',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#d3d6ee',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none'
    }
}));


const DefaultNavbar: FunctionComponent<{ setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const navigate = useNavigate();
    const globalDispatch = useDispatch();
    const {user, setUser} = useContext(UserContext);
    const [signInClicked, setSignInClicked] = useState<boolean>(false);
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (signInClicked) {
            props.setShow(1);
            setSignInClicked(false);
            setSignUpClicked(false);
        }
    }, [signInClicked]);

    useEffect(() => {
        if (signUpClicked) {
            props.setShow(2);
            setSignInClicked(false);
            setSignUpClicked(false);
        }
    }, [signUpClicked]);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signOut = () => {
        setUser({name: "", avatar: "", authorized: false});
        globalDispatch({type: 'DELETE'});
        handleCloseUserMenu();
    };

    return (
        <AppBar elevation={2} position="sticky" sx={{backgroundColor: 'white'}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: !user.authorized ? 1 : 0, display: {xs: 'none', md: 'flex'}}}>
                        <Link to="/" replace style={{display: 'flex', justifyContent: 'center'}}>
                            <Logo/>
                        </Link>
                    </Typography>

                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        <img src={LogoIcon} alt="logo" height="20"/>
                    </Typography>

                    {
                        user.authorized && (
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                <Button
                                    onClick={() => {
                                    }}
                                    startIcon={<BookOutlined color="primary"/>}
                                    sx={{my: 2, display: 'flex', textTransform: 'none', marginLeft: 2, color: '#323232'}}>
                                    Library
                                </Button>
                            </Box>
                        )
                    }

                    {
                        !user.authorized && (
                            <Button
                                sx={{flexGrow: 0, margin: 1}}
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                                style={{fontSize: 16, textTransform: 'none'}}
                                onClick={() => setSignInClicked(true)}>
                                Sign In
                            </Button>
                        )
                    }

                    {
                        !user.authorized && (
                            <Divider orientation="vertical" color="secondary" flexItem sx={{margin: '20px 0'}}/>
                        )
                    }

                    {
                        !user.authorized && (
                            <Button
                                sx={{flexGrow: 0, margin: 1}}
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                                style={{fontSize: 16, textTransform: 'none'}}
                                onClick={() => setSignUpClicked(true)}>
                                Sign Up
                            </Button>
                        )
                    }

                    {
                        user.authorized && (
                            <SearchInput sx={{display: {xs: 'none', md: 'flex'}, mr: 2}} placeholder="Search"/>
                        )
                    }

                    {
                        user.authorized && (
                            <Box sx={{flexGrow: 0, marginRight: 1}}>
                                <SpecialButton
                                    onClick={() => {
                                    }}
                                    variant="contained"
                                    startIcon={<OpenBook/>}
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        textTransform: 'none',
                                        color: '#323232',
                                        borderRadius: 25
                                    }}
                                >
                                    My Decks
                                </SpecialButton>
                            </Box>
                        )
                    }

                    {
                        user.authorized && (
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Account">
                                    <Button onClick={handleOpenUserMenu}
                                            sx={{
                                                textTransform: 'none',
                                                color: '#323232',
                                                padding: '10px 12px',
                                                margin: '5px 0',
                                            }}
                                            startIcon={<Avatar sx={{width: 32, height: 32}} alt={user.name || "User"}
                                                               src={user.avatar}/>}
                                            endIcon={!anchorElUser ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}>
                                        {user.name || "User"}
                                    </Button>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
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
                                    <MenuItem onClick={handleCloseUserMenu} sx={{width: 320}}>
                                        <ListItemIcon>
                                            <AccountCircle sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Profile
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary">
                                            ⌘
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        navigate('/user/settings', {replace: true});
                                    }} sx={{width: 320}}>
                                        <ListItemIcon>
                                            <Settings sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Settings
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary">
                                            ⌘
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} sx={{width: 320}}>
                                        <ListItemIcon>
                                            <Equalizer sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Statistics
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary">
                                            ⌘
                                        </Typography>
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={(() => signOut())} sx={{width: 320}}>
                                        <ListItemIcon>
                                            <Logout sx={{width: 20, height: 20}}/>
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
                        user.authorized && (
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
            </Container>
        </AppBar>
    )
}

export default DefaultNavbar;
