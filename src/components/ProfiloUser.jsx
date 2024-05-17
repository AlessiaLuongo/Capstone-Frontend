import { Card, Col, Container, Image, Row } from "react-bootstrap";

import { useState } from "react";
import ModaleUpdateProfile from "./ModaleUpdateProfile";
import { useSelector } from "react-redux";

const ProfiloUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const currentUser = useSelector((state) => state.loginUserReducer.user);

  return (
    <Container>
      <Row className="my-5 g-3 align-items-center">
        <Col xs={12} md={5} lg={4}>
          <Image
            src={currentUser.avatar}
            roundedCircle
            width={"130vh"}
            height={"130vh"}
          />
        </Col>
        <Col xs={12} md={7} lg={8}>
          <Card border="secondary">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div> {currentUser.username}</div>

              <i className="bi bi-vector-pen me-2" onClick={handleShow}></i>

              <ModaleUpdateProfile
                show={show}
                handleClose={() => {
                  setShow(false);
                }}
                onSave={() => {
                  setShow(false);
                }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {currentUser.name} {""}
                {currentUser.surname}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
