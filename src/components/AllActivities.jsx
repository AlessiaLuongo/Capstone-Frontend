import { useDispatch, useSelector } from "react-redux";
import SingleActivity from "./SingleActivity";
import { useEffect, useState } from "react";
import { fetchAllActivities } from "../redux/action";
import { Alert, Container, Row } from "react-bootstrap";
import SearchBar from "./SearchBar";

const AllActivities = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const listaActivities = useSelector(
    (state) => state.getAllActivities.content
  );

  const handleSearch = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredActivities(listaActivities);
    } else {
      const filteredList = listaActivities.filter(
        (activity) =>
          activity.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          activity.description.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredActivities(filteredList);
    }
  }, [inputValue, listaActivities]);

  return (
    <Container fluid className="pb-5">
      <SearchBar
        onSearch={handleSearch}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Row className="justify-content-center align-content-center gy-4 pt-3 mx-5">
        {filteredActivities && filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <SingleActivity key={activity.id} activity={activity} />
          ))
        ) : (
          <Alert variant="info" className="text-center">
            No Activities found
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default AllActivities;
