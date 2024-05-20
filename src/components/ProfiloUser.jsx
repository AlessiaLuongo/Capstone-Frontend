import { Col, Container, Image, Row } from "react-bootstrap";

import { useState } from "react";
import ModaleUpdateProfile from "./ModaleUpdateProfile";
import { useSelector } from "react-redux";

const ProfiloUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const currentUser = useSelector((state) => state.loginUserReducer.user);

  console.log(currentUser.listOfFavouriteActivities);

  return (
    <Container>
      <Row className="py-5 g-3 align-items-center ">
        <Col xs={12} md={5} lg={4}>
          <Image
            src={currentUser.avatar}
            roundedCircle
            width={"130vh"}
            height={"130vh"}
          />
          <Col></Col>
        </Col>
        <Col xs={12} md={7} lg={8}>
          <div className="d-flex justify-content-between">
            {currentUser.username}
            <i className="bi bi-vector-pen me-2 " onClick={handleShow}></i>
            <ModaleUpdateProfile
              show={show}
              handleClose={() => {
                setShow(false);
              }}
              onSave={() => {
                setShow(false);
              }}
            />
          </div>
          <hr />
          {currentUser.name} {""}
          {currentUser.surname}
        </Col>
      </Row>
      <Row className="flex-column">
        <Col>
          Le mie attività preferite {currentUser.listOfFavouriteLocations}
        </Col>
        <Col>
          I miei luoghi preferiti {currentUser.listOfFavouriteActivities}
        </Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
