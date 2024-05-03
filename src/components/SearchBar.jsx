import { Button, Col, Form, Row } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Row className="d-flex justify-content-center align-content-center m-3">
      <Col xs={12} md={8} lg={6}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca su HelloWorld"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-dark">Cerca</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchBar;
