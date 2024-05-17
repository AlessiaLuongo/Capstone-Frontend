import { Col, Form, Row } from "react-bootstrap";

const SearchBar = ({ onSearch, inputValue, setInputValue }) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <Row className="justify-content-center align-content-center p-4">
      <Col xs={12} md={8} lg={6}>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Cerca su HelloWorld"
            className="me-2"
            aria-label="Search"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form>
      </Col>
    </Row>
  );
};

export default SearchBar;
