import {
    Container,
    Navbar,
    Nav,
    NavDropdown, 
    Form, 
    FormControl, 
} from 'react-bootstrap';
import {
    Link,useHistory
} from 'react-router-dom';
import { logout } from '../../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';

const Header = ({name="User"}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector((state)=>state.userLogin);
    const {userInfo} =userLogin;

    const logoutHandler = ()=>{
        dispatch(logout());
        history.push('/');
    }

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
                <NavDropdown title={name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">
                        My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
