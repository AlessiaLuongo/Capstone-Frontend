import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import AddNewActivity from "./AddNewActivity";
import AddNewLocation from "./AddNewLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheTenBestActivities } from "../redux/action";
import SingleBESTActivity from "./SingleBESTActivity";

const HomepageLoggedUser = () => {
  const [showActivity, setShowActivity] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleShowAddNewActivity = () => setShowActivity(true);
  const handleShowAddNewLocation = () => setShowLocation(true);

  const handleCloseActivity = () => setShowActivity(false);
  const handleCloseLocation = () => setShowLocation(false);

  const dispatch = useDispatch();
  const listOfTheBest = useSelector(
    (state) => state.getTheBestActivities.content
  );

  useEffect(() => {
    dispatch(fetchTheTenBestActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //----------------------------------------------------------------------------------------------//
  return (
    <Container>
      <Row className="justify-content-center m-4">
        <Col xs={12} md={7} lg={5} className="text-center">
          <Button
            variant="outline-secondary"
            className="me-3"
            onClick={handleShowAddNewActivity}
          >
            <i className="bi bi-plus-circle"></i> Attività
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleShowAddNewLocation}
          >
            <i className="bi bi-plus-circle"></i> Location
          </Button>
        </Col>
        {showActivity && (
          <AddNewActivity
            showActivity={showActivity}
            handleCloseActivity={handleCloseActivity}
          />
        )}
        {showLocation && (
          <AddNewLocation
            showLocation={showLocation}
            handleCloseLocation={handleCloseLocation}
          />
        )}
      </Row>
      <Row>
        {listOfTheBest && listOfTheBest.length > 0 ? (
          listOfTheBest.map((bestActivity) => {
            return (
              <SingleBESTActivity
                key={bestActivity.id}
                bestActivity={bestActivity}
              />
            );
          })
        ) : (
          <Alert variant="info">No Locations found</Alert>
        )}
      </Row>
    </Container>
  );
};

export default HomepageLoggedUser;
