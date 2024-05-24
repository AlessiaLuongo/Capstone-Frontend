import { Button, Card, CardText, Col, Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModaleModificaAttivita from "./ModaleModificaAttivita";
import {
  deleteSingleActivity,
  fetchAddFavouriteActivities,
  fetchAllActivities,
  fetchDeleteFavouriteActivity,
  startLoader,
  stopLoader,
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

  const listOfFavourites = useSelector(
    (state) => state.getFavouriteActivities.content
  );
  console.log(listOfFavourites);

  const handleFavourite = async () => {
    if (isFavourite) {
      console.warn("Activity is already a favourite");
      return;
    }
    try {
      dispatch(fetchAddFavouriteActivities(userLoggedIn, activity.id));
    } catch (error) {
      console.error("Error adding favourite Activity");
    }
    await setIsFavourite(!isFavourite);
  };

  const handleDeleteFavourite = async () => {
    try {
      dispatch(startLoader());
      await dispatch(fetchDeleteFavouriteActivity(userLoggedIn, activity.id));
    } catch (error) {
      console.error("Error deleting favourite Activity");
    } finally {
      dispatch(stopLoader());
    }
    await setIsFavourite(!isFavourite);
  };

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(
      listOfFavourites.some((favourite) => favourite.id === activity.id)
    );
  }, [listOfFavourites, activity.id]);

  const isLoading = useSelector((state) => state.deleteActivity.isLoading);

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

                    <i
                      className="bi bi-trash3"
                      onClick={() => {
                        handleDelete();
                      }}
                    ></i>

                    {isLoading && (
                      <div className="d-flex justify-content-center align-items-center w-100">
                        <Spinner animation="border" role="status"></Spinner>
                      </div>
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
              <Button onClick={() => setFrontSide(false)}>Più dettagli</Button>
              {userLoggedIn &&
                (isFavourite ? (
                  <i
                    className="bi bi-suit-heart-fill"
                    onClick={handleDeleteFavourite}
                  ></i>
                ) : (
                  <i className="bi bi-suit-heart" onClick={handleFavourite}></i>
                ))}
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

            <CardText>{activity.description}</CardText>
            <Card.Text>
              {activity.outdoor === true
                ? "Attività Outdoor"
                : "Attività Indoor"}

              {activity.price === 0 ? " e gratuita" : ` ${activity.price} €`}
            </Card.Text>
            <CardText>
              Dal{"  "}
              {dateFormatter(activity.startDate)}
              {"  "} al {dateFormatter(activity.endDate)}
            </CardText>
            <CardText> Tipo di attività: {activity.eventType}</CardText>

            <div className="d-flex align-items-end justify-content-between">
              <div>
                <Button onClick={() => setFrontSide(true)}>
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
