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
    IconButton,
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
    AccountBox,
    AccountCircle,
    AddBox,
    Equalizer,
    Key,
    KeyboardArrowDown,
    KeyboardArrowUp,
    Language,
    Logout,
    Menu as MenuIcon,
    Search as SearchIcon,
    Settings
} from "@mui/icons-material";
import UserContext from "../../contexts/UserContext";
import {ReactComponent as Logo} from './vectors/Logo.svg';
import {ReactComponent as OpenBook} from './vectors/OpenBook.svg';
import {blue} from "@mui/material/colors";
import User from "../../models/User";


const SpecialButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(blue[200]),
    backgroundColor: '#EAECFF',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#d3d6ee',
    },
}));

const DefaultNavbar: FunctionComponent<{ setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const {user, setUser} = useContext(UserContext);
    const [signInClicked, setSignInClicked] = useState<boolean>(false);
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signOut = () => {
        setUser({valid: false, name: "", avatar: ""});
        globalDispatch({type: 'DELETE'});
        handleCloseUserMenu();
    };

    return (
        <AppBar elevation={2} position="sticky" sx={{backgroundColor: 'white'}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        <Logo/>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {
                                user.valid && (
                                    <MenuItem onClick={handleCloseNavMenu} sx={{width: 256}}>
                                        <ListItemIcon>
                                            <SearchIcon color="primary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Search
                                        </ListItemText>
                                    </MenuItem>
                                )
                            }

                            {
                                user.valid && (
                                    <MenuItem onClick={handleCloseNavMenu} sx={{width: 256}}>
                                        <ListItemIcon>
                                            <OpenBook style={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Library
                                        </ListItemText>
                                    </MenuItem>
                                )
                            }

                            {
                                user.valid && (
                                    <MenuItem onClick={handleCloseNavMenu} sx={{width: 256}}>
                                        <ListItemIcon>
                                            <AccountBox color="primary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            My Decks
                                        </ListItemText>
                                    </MenuItem>
                                )
                            }

                            {
                                !user.valid && (
                                    <MenuItem onClick={() => setSignInClicked(true)} sx={{width: 256}}>
                                        <ListItemIcon>
                                            <Key color="primary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Sign In
                                        </ListItemText>
                                    </MenuItem>
                                )
                            }

                            {
                                !user.valid && (
                                    <MenuItem onClick={() => setSignUpClicked(true)} sx={{width: 256}}>
                                        <ListItemIcon>
                                            <AddBox color="primary" sx={{width: 20, height: 20}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Sign Up
                                        </ListItemText>
                                    </MenuItem>
                                )
                            }
                        </Menu>
                    </Box>
                    <Typography
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        <Logo/>
                    </Typography>

                    {
                        user.valid && (
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    startIcon={<SearchIcon color="primary"/>}
                                    sx={{my: 2, display: 'flex', textTransform: 'none', color: '#323232'}}>
                                    Search
                                </Button>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    startIcon={<OpenBook/>}
                                    sx={{my: 2, display: 'flex', textTransform: 'none', marginLeft: 2, color: '#323232'}}>
                                    Library
                                </Button>
                            </Box>
                        )
                    }

                    {
                        !user.valid && (
                            <Box sx={{flexGrow: {xs: 0, md: 1}}}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    startIcon={<Language color="secondary"/>}
                                    sx={{my: 2, display: 'flex', textTransform: 'none'}}>
                                    Explore
                                </Button>
                            </Box>
                        )
                    }

                    {
                        !user.valid && (
                            <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                                <Button
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    style={{fontSize: 16, textTransform: 'none'}}
                                    onClick={() => setSignInClicked(true)}>
                                    Sign In
                                </Button>
                                <Button
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    style={{fontSize: 16, textTransform: 'none'}}
                                    onClick={() => setSignUpClicked(true)}>
                                    Sign Up
                                </Button>
                            </Box>
                        )
                    }

                    {
                        user.valid && (
                            <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}, marginRight: 1}}>
                                <SpecialButton
                                    onClick={handleCloseNavMenu}
                                    variant="contained"
                                    startIcon={<AccountBox color="primary"/>}
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        textTransform: 'none',
                                        marginLeft: 2,
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
                        user.valid && (
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <Button onClick={handleOpenUserMenu}
                                            sx={{
                                                textTransform: 'none',
                                                color: '#323232',
                                                padding: '10px 15px',
                                                margin: '5px 0'
                                            }}
                                            startIcon={<Avatar sx={{width: 32, height: 32}} alt={user.firstName || "User"}
                                                               src={user.avatar}/>}
                                            endIcon={!anchorElUser ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}>
                                        {user.firstName || "User"}
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
                                    <MenuItem onClick={handleCloseUserMenu} sx={{width: 320}}>
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
                                        <Typography variant="body2" color="text.secondary">
                                            ⌘
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default DefaultNavbar;
