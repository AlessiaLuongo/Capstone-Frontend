import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const RegisterComponent = () => {
  return (
    <Container className="m-5">
      <Row className="justify-content-center align-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="mb-5 text-center">Welcome to HelloWorld!</h2>
          <Form onSubmit={""}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Choose a username" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterComponent;
