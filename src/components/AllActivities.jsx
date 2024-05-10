import { useDispatch, useSelector } from "react-redux";
import SingleActivity from "./SingleActivity";
import { useEffect } from "react";
import { fetchAllActivities } from "../redux/action";
import { Alert, Container, Row } from "react-bootstrap";

const AllActivities = () => {
  const dispatch = useDispatch();
  const listaActivities = useSelector(
    (state) => state.getAllActivities.content
  );

  useEffect(() => {
    dispatch(fetchAllActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //----------------------------------------------------------------------------------------------//

  return (
    <Container>
      <Row className="justify-content-center align-content-center g-4 mt-3">
        {listaActivities && listaActivities.length > 0 ? (
          listaActivities.map((activity) => (
            <SingleActivity key={activity.id} activity={activity} />
          ))
        ) : (
          <Alert variant="info">No Activities found</Alert>
        )}
      </Row>
    </Container>
  );
};
export default AllActivities;
