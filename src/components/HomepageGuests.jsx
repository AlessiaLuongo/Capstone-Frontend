import { useEffect } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheBestPosts, startLoader, stopLoader } from "../redux/action";
import SingleBESTPost from "./SingleBESTPost";

const HomepageGuests = () => {
  const dispatch = useDispatch();
  const listOfTheBest = useSelector((state) => state.getTheBestPosts.content);
  const isLoading = useSelector((state) => state.getTheBestPosts.isLoading);

  useEffect(() => {
    dispatch(startLoader());
    dispatch(fetchTheBestPosts()).finally(() => {
      dispatch(stopLoader());
    });
  }, [dispatch]);

  //----------------------------------------------------------------------------------------------//
  return (
    <Container fluid className="pb-5">
      {isLoading ? (
        <div className="d-flex justify-content-center align-item-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
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
      )}
    </Container>
  );
};
export default HomepageGuests;
