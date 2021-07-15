import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import titleCase from "../../utils/titleCase";

const Header = ({ setSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container style={{ fontSize: "18px" }}>
        <div className="navbar-brand">
          <Link
            to="/"
            style={{ fontSize: "24px", fontSmooth: "4", letterSpacing: "2px" }}
          >
            SHARE NOTE
          </Link>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <div className="nav-link">
                  <Link to="/mynotes">My Notes</Link>
                </div>
                <NavDropdown
                  title={userInfo ? titleCase(userInfo.name) : "User"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    style={{ fontSize: "16px" }}
                    href="/profile"
                  >
                    <img
                      alt=""
                      src={`${userInfo?.pic}`}
                      width="40"
                      height="40"
                      style={{ marginRight: 10, borderRadius: "18px" }}
                    />
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    style={{ fontSize: "16px" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="nav-link">
                <Link
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
