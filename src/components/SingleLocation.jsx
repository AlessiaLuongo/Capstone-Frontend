import { Button, Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const SingleLocation = ({ location }) => {
  const { title, description, creationDate, rate } = location;

  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        hearts.push(<i key={i} className="bi bi-suit-heart-fill"></i>);
      } else {
        hearts.push(<i key={i} className="bi bi-suit-heart"></i>);
      }
    }
    return hearts;
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {dateFormatter(creationDate)}
          </Card.Subtitle>
          <Card.Title>{title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(rate)}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <Button variant="outline-dark">Più dettagli</Button>
            </div>

            <div>
              <i className="bi bi-vector-pen me-2"></i>
              <i className="bi bi-trash3"></i>
            </div>
          </div>
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
