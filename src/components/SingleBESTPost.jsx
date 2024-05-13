import { Card, Col } from "react-bootstrap";

const SingleBESTPost = ({ bestPost }) => {
  const dateFormatter = (date) => {
    const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");
    return formattedDate;
  };

  const rateStar = () => {
    const star = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= bestPost.rate) {
        star.push(<i key={i} className="bi bi-star-fill"></i>);
      } else {
        star.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return star;
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
            {rateStar(bestPost.rate)}
          </Card.Subtitle>
          <Card.Text>{bestPost.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBESTPost;
