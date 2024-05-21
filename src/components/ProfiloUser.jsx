import { Alert, Col, Container, Image, Row } from "react-bootstrap";

import { useState } from "react";
import ModaleUpdateProfile from "./ModaleUpdateProfile";
import { useSelector } from "react-redux";
import SingleActivity from "./SingleActivity";

const ProfiloUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const currentUser = useSelector((state) => state.loginUserReducer.user);

  const listOfFavourites = useSelector(
    (state) => state.getFavouriteActivities.content
  );
  console.log("List of favourite Activities", listOfFavourites);

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
        <Col>Le mie attività preferite</Col>
        {listOfFavourites && listOfFavourites.length > 0 ? (
          listOfFavourites.map((activity, index) => {
            return <SingleActivity key={index} activity={activity} />;
          })
        ) : (
          <Alert variant="info" className="text-center my-5">
            No Favourites found
          </Alert>
        )}
        <Col>I miei luoghi preferiti </Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
