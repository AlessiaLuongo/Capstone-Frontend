import { Card, Col } from "react-bootstrap";

const SingleBESTActivity = ({ bestActivity }) => {
  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= bestActivity.rate) {
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
            {dateFormatter(bestActivity.creationDate)}
          </Card.Subtitle>
          <Card.Title>{bestActivity.title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(bestActivity.rate)}
          </Card.Subtitle>
          <Card.Text>{bestActivity.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBESTActivity;
