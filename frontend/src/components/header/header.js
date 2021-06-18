import {
    Container,
    Navbar,
    Nav,
    NavDropdown, 
    Form, 
    FormControl, 
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="primary" expand="lg" variant="dark" >
            <Container>
                <div className="navbar-brand">
                    <Link to="/" >Share Note</Link>
                </div>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="m-auto">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                <Nav >
                <div className="nav-link">
                    <Link to="/mynotes" >
                        My Notes
                    </Link>
                </div>
                <NavDropdown title="User" id="basic-nav-dropdown">
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
