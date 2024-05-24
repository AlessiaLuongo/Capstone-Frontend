import { useEffect, useState } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations, stopLoader } from "../redux/action";
import SingleLocation from "./SingleLocation";
import SearchBar from "./SearchBar";

const AllLocations = () => {
  const dispatch = useDispatch();
  const listaLocations = useSelector((state) => state.getAllLocations.content);
  const [inputValue, setInputValue] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    dispatch(fetchAllLocations());
    dispatch(stopLoader());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSearch = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredLocations(listaLocations);
    } else {
      const filteredList = listaLocations.filter((location) => {
        const outdoorString = location.outdoor ? "outdoor" : "indoor";

        return (
          location.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          location.description
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          location.locationType
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          outdoorString.includes(inputValue.toLowerCase())
        );
      });
      setFilteredLocations(filteredList);
    }
  }, [inputValue, listaLocations]);

  const isLoading = useSelector((state) => state.getAllActivities.isLoading);

  //----------------------------------------------------------------------------------------------//

  return (
    <Container fluid className="pb-5">
      <SearchBar
        onSearch={handleSearch}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {isLoading && (
        <div className="d-flex justify-content-center align-item-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <Row className="justify-content-center align-content-center gy-4 pt-3 mx-5">
        {filteredLocations && filteredLocations.length > 0 ? (
          filteredLocations.map((location) => {
            return <SingleLocation key={location.id} location={location} />;
          })
        ) : (
          <Alert variant="info" className="text-center">
            No Locations found
          </Alert>
        )}
      </Row>
    </Container>
  );
};
export default AllLocations;
