import { Alert, Col, Container, Image, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import ModaleUpdateProfile from "./ModaleUpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteActivities,
  fetchFavouriteLocations,
} from "../redux/action";
import SingleActivity from "./SingleActivity";
import SingleLocation from "./SingleLocation";

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

  const listOfFavouriteLocations = useSelector(
    (state) => state.getFavouriteLocations.content
  );

  useEffect(() => {
    dispatch(fetchFavouriteLocations(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container fluid className="p-5">
      <Row className="py-5 g-3 align-items-center px-5">
        <Col xs={12} md={5} lg={4}>
          <Image
            src={currentUser.avatar}
            roundedCircle
            width={"130vh"}
            height={"130vh"}
          />
        </Col>
        <Col xs={12} md={7} lg={8} className="profile-infos">
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
      <Row className="flex-row g-4 p-5">
        <h2> Le mie attività preferite</h2>
        {listOfFavouriteActivities.length > 0 ? (
          listOfFavouriteActivities.map((activity) => (
            <SingleActivity key={activity.id} activity={activity} />
          ))
        ) : (
          <Alert variant="info" className="text-center mx-5">
            No Activities found
          </Alert>
        )}

        <hr />

        <h2>I miei luoghi preferiti</h2>
        {listOfFavouriteLocations.length > 0 ? (
          listOfFavouriteLocations.map((location) => (
            <SingleLocation key={location.id} location={location} />
          ))
        ) : (
          <Alert variant="info" className="text-center mx-5">
            No Locations found
          </Alert>
        )}
      </Row>
    </Container>
  );
};
export default ProfiloUser;
