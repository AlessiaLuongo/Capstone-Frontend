import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/action";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => {
    return state.loginUserReducer.accessToken;
  });

  const logout = () => {
    dispatch(logoutUser());
    navigate("/homepage");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/homepage">
          <img
            src="logoHelloWorld.png"
            alt="hello-world-logo"
            id="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/homepage">Home</Nav.Link>
            <Nav.Link href="/activities">Attività</Nav.Link>
            <Nav.Link href="/locations">Luoghi</Nav.Link>
          </Nav>
          <Nav>
            {token ? (
              <>
                <Nav.Link href="/profile">Profilo</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Registrati</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
