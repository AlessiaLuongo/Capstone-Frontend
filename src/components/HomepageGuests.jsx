import { useEffect } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheBestPosts } from "../redux/action";
import SingleBESTPost from "./SingleBESTPost";

const HomepageGuests = () => {
  const dispatch = useDispatch();
  const listOfTheBest = useSelector((state) => state.getTheBestPosts.content);

  // const shuffleArray = () => {
  //   const shuffeldArray = listOfTheBest.sort(() => 0.5 - Math.random());
  //   return shuffeldArray;
  // };

  // const theBestPosts = shuffleArray();

  useEffect(() => {
    dispatch(fetchTheBestPosts());
  }, [dispatch]);
  //----------------------------------------------------------------------------------------------//
  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center gy-4 pt-3 mx-5">
        {listOfTheBest && listOfTheBest.length > 0 ? (
          listOfTheBest.map((bestPost) => {
            return <SingleBESTPost key={bestPost.id} bestPost={bestPost} />;
          })
        ) : (
          <Alert variant="info" className="text-center my-5">
            No Locations found
          </Alert>
        )}
      </Row>
    </Container>
  );
};
export default HomepageGuests;
