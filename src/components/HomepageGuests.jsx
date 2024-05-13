import { useEffect } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheBestPosts } from "../redux/action";
import SingleBESTPost from "./SingleBESTPost";

const HomepageGuests = () => {
  const dispatch = useDispatch();
  const listOfTheBest = useSelector((state) => state.getTheBestPosts.content);

  console.log(listOfTheBest);

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
    <Container>
      <Row className="m-4">
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
export default HomepageGuests;
