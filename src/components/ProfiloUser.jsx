import { Alert, Col, Container, Image, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import ModaleUpdateProfile from "./ModaleUpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouriteActivities } from "../redux/action";
import SingleActivity from "./SingleActivity";

const ProfiloUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const currentUser = useSelector((state) => state.loginUserReducer.user);
  const accessToken = useSelector(
    (state) => state.loginUserReducer.accessToken
  );

  const listOfFavouriteActivities = useSelector(
    (state) => state.getFavouriteActivities.content
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavouriteActivities(accessToken));
  }, [dispatch, accessToken]);

  console.log("Current User:", currentUser);
  console.log("Access Token:", accessToken);
  console.log("List of Favourite Activities:", listOfFavouriteActivities);

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
        {listOfFavouriteActivities.length > 0 ? (
          listOfFavouriteActivities.map((activity) => (
            <SingleActivity key={activity.id} activity={activity} />
          ))
        ) : (
          <Alert variant="info" className="text-center my-5">
            No Activities found
          </Alert>
        )}
        <Col>I miei luoghi preferiti </Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
