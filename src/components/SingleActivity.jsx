import { Button, Card, Col } from "react-bootstrap";

import { useState } from "react";
import { useSelector } from "react-redux";

import ModaleModificaAttivita from "./ModaleModificaAttivita";

const SingleActivity = ({ activity }) => {
  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= activity.rate) {
        hearts.push(<i key={i} className="bi bi-suit-heart-fill"></i>);
      } else {
        hearts.push(<i key={i} className="bi bi-suit-heart"></i>);
      }
    }
    return hearts;
  };

  const userLoggedIn = useSelector(
    (state) => state.loginUserReducer.accessToken
  );
  const currentUser = useSelector((state) => state.loginUserReducer.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {dateFormatter(activity.creationDate)}
          </Card.Subtitle>
          <Card.Title>{activity.title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(activity.rate)}
          </Card.Subtitle>
          <Card.Text>{activity.description}</Card.Text>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <Button variant="outline-dark">Più dettagli</Button>
            </div>

            {userLoggedIn ? (
              <div>
                {currentUser.id === activity.user.id ? (
                  <i className="bi bi-vector-pen me-2" onClick={handleShow}></i>
                ) : (
                  ""
                )}
                <ModaleModificaAttivita
                  activity={activity}
                  handleClose={handleClose}
                  show={show}
                />
                {currentUser.id === activity.user.id ? (
                  <i className="bi bi-trash3"></i>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleActivity;
