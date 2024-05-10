import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import AddNewActivity from "./AddNewActivity";
import AddNewLocation from "./AddNewLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheBestPosts } from "../redux/action";
import SingleBESTPost from "./SingleBESTPost";

const HomepageLoggedUser = () => {
  const [showActivity, setShowActivity] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleShowAddNewActivity = () => setShowActivity(true);
  const handleShowAddNewLocation = () => setShowLocation(true);

  const handleCloseActivity = () => setShowActivity(false);
  const handleCloseLocation = () => setShowLocation(false);

  const dispatch = useDispatch();
  const listOfTheBest = useSelector((state) => state.getTheBestPosts);
  const listOfTheBestActivities = listOfTheBest.content[0];
  const listOfTheBestLocations = listOfTheBest.content[1];
  const bestPosts = [];

  const putAllPostsTogether = () => {
    for (let i = 0; i < listOfTheBestActivities.length; i++) {
      const bestActivity = listOfTheBestActivities[i];
      bestPosts.push(bestActivity);
    }
    for (let i = 0; i < listOfTheBestLocations.length; i++) {
      const bestLocation = listOfTheBestLocations[i];
      bestPosts.push(bestLocation);
    }
    return bestPosts;
  };
  putAllPostsTogether();

  const shuffleArray = () => {
    const shuffeldArray = bestPosts.sort(() => 0.5 - Math.random());
    return shuffeldArray;
  };

  const theBestPosts = shuffleArray();

  useEffect(() => {
    dispatch(fetchTheBestPosts());
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
        {theBestPosts && theBestPosts.length > 0 ? (
          theBestPosts.map((bestPost) => {
            return <SingleBESTPost key={bestPost.id} bestPost={bestPost} />;
          })
        ) : (
          <Alert variant="info">No Locations found</Alert>
        )}
      </Row>
    </Container>
  );
};

export default HomepageLoggedUser;
