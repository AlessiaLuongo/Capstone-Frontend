import { useEffect } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheBestPosts } from "../redux/action";
import SingleBESTPost from "./SingleBESTPost";

const HomepageGuests = () => {
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
      <Row className="m-4">
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
export default HomepageGuests;
