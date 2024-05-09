import { useEffect } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations } from "../redux/action";
import SingleLocation from "./SingleLocation";

const AllLocations = () => {
  const dispatch = useDispatch();
  const listaLocations = useSelector((state) => state.getAllLocations.content);

  useEffect(() => {
    dispatch(fetchAllLocations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //----------------------------------------------------------------------------------------------//

  return (
    <Container>
      <Row className="justify-content-center align-content-center g-4 mt-3">
        {listaLocations.length > 0 ? (
          listaLocations.map((location) => {
            return <SingleLocation key={location.id} location={location} />;
          })
        ) : (
          <Alert variant="info">No Locations found</Alert>
        )}
      </Row>
    </Container>
  );
};
export default AllLocations;
