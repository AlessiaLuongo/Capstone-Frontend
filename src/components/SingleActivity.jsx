import { Button, Card, CardText, Col } from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModaleModificaAttivita from "./ModaleModificaAttivita";
import {
  deleteSingleActivity,
  fetchAddFavouriteActivities,
  fetchAllActivities,
} from "../redux/action";

const SingleActivity = ({ activity }) => {
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
      if (i <= activity.rate) {
        star.push(<i key={i} className="bi bi-star-fill"></i>);
      } else {
        star.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return star;
  };

  const userLoggedIn = useSelector(
    (state) => state.loginUserReducer.accessToken
  );
  const currentUser = useSelector((state) => state.loginUserReducer.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSingleActivity(activity.id, userLoggedIn));
      dispatch(fetchAllActivities());
    } catch (error) {
      console.error("Error deleting activity");
    }
  };

  const [frontSide, setFrontSide] = useState(true);

  const [showButtons, setShowButtons] = useState(false);

  const handleFavourite = () => {
    try {
      dispatch(fetchAddFavouriteActivities(userLoggedIn, activity));
    } catch (error) {
      console.error("Error by adding favourite Activity");
    }
  };

  return (
    <Col xs={12} md={6} lg={4}>
      {frontSide === true ? (
        <Card>
          <Card.Img variant="top" src={activity.picture} />
          <Card.Body className="d-flex flex-column justify-content-between">
            {userLoggedIn && currentUser.id === activity.user.id ? (
              <CardText className="d-flex">
                <i
                  className="bi bi-list me-3"
                  onClick={() => setShowButtons(!showButtons)}
                ></i>

                {showButtons === true ? (
                  <span>
                    {currentUser.id === activity.user.id ? (
                      <i
                        className="bi bi-vector-pen me-2"
                        onClick={handleShow}
                      ></i>
                    ) : (
                      ""
                    )}
                    <ModaleModificaAttivita
                      activity={activity}
                      handleClose={handleClose}
                      show={show}
                      token={userLoggedIn}
                    />
                    {currentUser.id === activity.user.id ? (
                      <i
                        className="bi bi-trash3"
                        onClick={() => {
                          handleDelete();
                        }}
                      ></i>
                    ) : (
                      ""
                    )}
                  </span>
                ) : (
                  ""
                )}
              </CardText>
            ) : (
              ""
            )}
            <Card.Subtitle className="mb-2 text-muted text-end">
              {dateFormatter(activity.creationDate)}
            </Card.Subtitle>
            <Card.Title>{activity.title}</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted text-end">
              {rateStar(activity.rate)}
            </Card.Subtitle>
            <Card.Text>{activity.description}</Card.Text>

            <div className="d-flex align-items-end justify-content-between">
              <Button
                variant="outline-dark"
                onClick={() => setFrontSide(false)}
              >
                Più dettagli
              </Button>
              <i className="bi bi-suit-heart" onClick={handleFavourite}></i>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Img variant="top" src={activity.picture} />
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted text-end">
              {dateFormatter(activity.creationDate)}
            </Card.Subtitle>
            <Card.Title>{activity.title}</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted text-end">
              {rateStar(activity.rate)}
            </Card.Subtitle>
            <Card.Text>{activity.outdoor}</Card.Text>
            <CardText>{activity.description}</CardText>
            <CardText>{activity.price} €</CardText>
            <CardText>
              Dal{"  "}
              {dateFormatter(activity.startDate)}
              {"  "} al {dateFormatter(activity.endDate)}
            </CardText>
            <CardText> {activity.eventType}</CardText>

            <div className="d-flex align-items-end justify-content-between">
              <div>
                <Button
                  variant="outline-dark"
                  onClick={() => setFrontSide(true)}
                >
                  Torna indietro
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};

export default SingleActivity;
