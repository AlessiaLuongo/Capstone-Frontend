import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNewActivity from "./AddNewActivity";

const HomepageLoggedUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={7} lg={5} className="text-center">
          <Button
            variant="outline-secondary"
            className="me-3"
            onClick={handleShow}
          >
            <i className="bi bi-plus-circle"></i> Attività
          </Button>
          <Button variant="outline-secondary">
            <i className="bi bi-plus-circle"></i> Location
          </Button>
        </Col>
        {show && <AddNewActivity show={show} handleClose={handleClose} />}
      </Row>
    </Container>
  );
};

export default HomepageLoggedUser;
