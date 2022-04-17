import {useDispatch} from "react-redux";
import {Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {AccountCircle, Equalizer, Logout, Settings} from "@mui/icons-material";
import UserContext from "../../contexts/UserContext";
import Logo from './vectors/Logo.svg';


const DefaultNavbar: FunctionComponent<{ setShow: Dispatch<SetStateAction<number>> }> = (props: any) => {
    const globalDispatch = useDispatch();
    const {user, setUser} = useContext(UserContext);
    const [signInClicked, setSignInClicked] = useState<boolean>(false);
    const [signUpClicked, setSignUpClicked] = useState<boolean>(false);

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

    const signOut = () => {
        setUser({valid: false, name: "", avatar: ""});
        globalDispatch({type: 'DELETE'});
    };

    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="light" style={{boxShadow: '2px 2px 5px #D5D5D5'}}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} width={96} alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/library">Library</Nav.Link>
                        {
                            user.valid && (
                                <Nav.Link href="/my-decks">My Decks</Nav.Link>
                            )
                        }
                        {
                            user.valid && (
                                <NavDropdown title="Profile">
                                    <NavDropdown.Item href="/profile/settings"><Settings/> Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile/statistics"><Equalizer/> Statistics</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile/info"><AccountCircle/> Information</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="" onClick={(() => signOut())}><Logout/> Log
                                        out</NavDropdown.Item>
                                </NavDropdown>
                            )
                        }
                    </Nav>

                    <Nav>
                        {
                            user.valid && (
                                <Nav.Link href="/profile">{user.name}</Nav.Link>
                            )
                        }
                        {
                            !user.valid && (
                                <Nav.Item>
                                    <Button
                                        aria-controls="fade-menu"
                                        aria-haspopup="true"
                                        aria-expanded="true"
                                        style={{fontSize: 16, textTransform: 'none'}}
                                        onClick={() => setSignInClicked(true)}>
                                        Sign In
                                    </Button>
                                </Nav.Item>
                            )
                        }
                        {
                            !user.valid && (
                                <Nav.Item>
                                    <Button
                                        aria-controls="fade-menu"
                                        aria-haspopup="true"
                                        aria-expanded="true"
                                        style={{fontSize: 16, textTransform: 'none'}}
                                        onClick={() => setSignUpClicked(true)}>
                                        Sign Up
                                    </Button>
                                </Nav.Item>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DefaultNavbar;
