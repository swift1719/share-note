import {
    Container,
    Navbar,
    Nav,
    NavDropdown, 
    Form, 
    FormControl, 
} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="primary" expand="lg" variant="dark" >
            <Container>
                <Navbar.Brand href="/">Share Note</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="m-auto">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                <Nav >
                <Nav.Link href="#home">My Notes</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
