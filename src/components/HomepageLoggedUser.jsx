import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNewActivity from "./AddNewActivity";
import AddNewLocation from "./AddNewLocation";

const HomepageLoggedUser = () => {
  const [showActivity, setShowActivity] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleShowAddNewActivity = () => setShowActivity(true);
  const handleShowAddNewLocation = () => setShowLocation(true);

  const handleCloseActivity = () => setShowActivity(false);
  const handleCloseLocation = () => setShowLocation(false);

  return (
    <Container>
      <Row className="justify-content-center">
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
    </Container>
  );
};

export default HomepageLoggedUser;
