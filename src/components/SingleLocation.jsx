import { Button, Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const SingleLocation = ({ location }) => {
  const { title, description, creationDate, rate } = location;

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {creationDate}
          </Card.Subtitle>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rate}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="outline-dark">Più dettagli</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

SingleLocation.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default SingleLocation;
