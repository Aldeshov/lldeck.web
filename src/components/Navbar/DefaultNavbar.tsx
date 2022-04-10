import { useContext } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AccountCircle, Equalizer, Logout, Settings } from "@mui/icons-material";

import UserContext from "../../contexts/UserContext";
import Logo from './vectors/Logo.svg';
import './DefaultNavbar.css';


const DefaultNavbar = () => {
    const globalDispatch = useDispatch();
    const { user, setUser } = useContext(UserContext);

    const signOut = () => {
        setUser({ valid: false, name: "", avatar: "" });
        globalDispatch({ type: 'DELETE' });
    };

    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="light">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} width={96} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/library">Library</Nav.Link>
                        {
                            user.valid && (
                                <Nav.Link href="/mydecks">My Decks</Nav.Link>
                            )
                        }
                        {
                            user.valid && (
                                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/profile/settings"><Settings /> Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile/statistics"><Equalizer /> Statistics</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile/info"><AccountCircle /> Information</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="" onClick={(() => signOut())}><Logout /> Log out</NavDropdown.Item>
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
                                <Nav.Link href="/login">
                                    Sign In
                                </Nav.Link>
                            )
                        }
                        {
                            !user.valid && (
                                <Nav.Link href="/register">
                                    Sign Up
                                </Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DefaultNavbar;