import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, startLoader, stopLoader } from "../redux/action";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoader());
    dispatch(registerUser(newUser));
    dispatch(stopLoader());
    navigate("/login");
  };

  const isLoading = useSelector((state) => state.registerUser.isLoading);

  return (
    <Container className="p-4">
      <Row className="justify-content-center align-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="mb-5 text-center">Welcome to HelloWorld!</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={newUser.surname}
                onChange={(e) =>
                  setNewUser({ ...newUser, surname: e.target.value })
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            ) : (
              <Button variant="primary" type="submit">
                Salva
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterComponent;
