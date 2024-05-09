import { Card, Col } from "react-bootstrap";

const SingleBESTPost = ({ bestPost }) => {
  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= bestPost.rate) {
        hearts.push(<i key={i} className="bi bi-suit-heart-fill"></i>);
      } else {
        hearts.push(<i key={i} className="bi bi-suit-heart"></i>);
      }
    }
    return hearts;
  };

  return (
    <Col xs={12} md={6} lg={2}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {dateFormatter(bestPost.creationDate)}
          </Card.Subtitle>
          <Card.Title>{bestPost.title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(bestPost.rate)}
          </Card.Subtitle>
          <Card.Text>{bestPost.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBESTPost;
