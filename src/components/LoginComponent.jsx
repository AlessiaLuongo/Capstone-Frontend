import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, getCurrentUser } from "../redux/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const token = useSelector((state) => state.loginUserReducer.accessToken);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
      navigate("/homepage");
    }
  }, [dispatch, token, navigate]);

  //----------------------------------------------------------------------------------------------//

  return (
    <Container className="p-5">
      <Row className="justify-content-center align-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="mb-5 text-center">Welcome back!</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(LoginUser(login));
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={login.email}
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginComponent;
