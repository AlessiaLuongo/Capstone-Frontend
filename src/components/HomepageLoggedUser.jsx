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
  const listOfTheBest = useSelector((state) => state.getTheBestPosts.content);

  useEffect(() => {
    dispatch(fetchTheBestPosts());
  }, [dispatch]);
  //----------------------------------------------------------------------------------------------//
  return (
    <Container fluid className="pb-5">
      <Row className="justify-content-center py-5">
        <Col xs={12} md={6} lg={4} className="text-center">
          <Button
            variant="primary"
            className="me-3"
            onClick={handleShowAddNewActivity}
          >
            <i className="bi bi-plus-circle"></i> Attività
          </Button>
          <Button variant="primary" onClick={handleShowAddNewLocation}>
            <i className="bi bi-plus-circle"></i> Luogo
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
      <Row className="gy-4 mx-5 ">
        {listOfTheBest && listOfTheBest.length > 0 ? (
          listOfTheBest.map((bestPost) => {
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
