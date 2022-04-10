import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import Logo from './vectors/Logo.svg';
import './DefaultNavbar.css';

const DefaultNavbar = () => {
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
                        <Nav.Link href="/mydecks">My Decks</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">
                            Sign In
                        </Nav.Link>

                        <Nav.Link eventKey={2} href="/register">
                            Sign Up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DefaultNavbar;