import { Button, Card, Col } from "react-bootstrap";

const SingleActivity = ({ activity }) => {
  const { title, description, creationDate, rate } = activity;

  return (
    <Col xs={12} md={7} lg={5}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {creationDate}
            <hr />
            {rate}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleActivity;
