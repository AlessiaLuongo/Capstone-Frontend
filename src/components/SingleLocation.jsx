import { Button, Card, CardText, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModaleModificaLocation from "./ModaleModificaLocation";
import {
  deleteSingleLocation,
  fetchAddFavouriteLocations,
  fetchAllLocations,
  fetchDeleteFavouriteLocation,
  startLoader,
  stopLoader,
} from "../redux/action";

const SingleLocation = ({ location }) => {
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
      if (i <= location.rate) {
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
      await dispatch(deleteSingleLocation(location.id, userLoggedIn));
      dispatch(fetchAllLocations());
    } catch (error) {
      console.error("Error deleting location");
    }
  };

  const [frontSide, setFrontSide] = useState(true);

  const [showButtons, setShowButtons] = useState(false);

  const listOfFavourites = useSelector(
    (state) => state.getFavouriteLocations.content
  );
  console.log(listOfFavourites);

  const handleFavourite = async () => {
    if (isFavourite) {
      console.warn("Location is already a favourite");
      return;
    }
    try {
      dispatch(fetchAddFavouriteLocations(userLoggedIn, location.id));
    } catch (error) {
      console.error("Error adding favourite Location");
    }
    await setIsFavourite(!isFavourite);
  };
  const handleDeleteFavourite = async () => {
    try {
      dispatch(startLoader());
      await dispatch(fetchDeleteFavouriteLocation(userLoggedIn, location.id));
      dispatch(stopLoader());
    } catch (error) {
      console.error("Error deleting favourite Location");
    } finally {
      dispatch(stopLoader());
    }
    await setIsFavourite(!isFavourite);
  };

  const isLoading = useSelector((state) => state.deleteLocation.isLoading);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(
      listOfFavourites.some((favourite) => favourite.id === location.id)
    );
  }, [listOfFavourites, location.id]);

  return (
    <Col xs={12} md={6} lg={4}>
      {frontSide ? (
        <Card>
          <Card.Img variant="top" src={location.picture} />
          <Card.Body className="d-flex flex-column justify-content-between">
            {userLoggedIn && currentUser.id === location.user.id && (
              <CardText className="d-flex">
                <i
                  className="bi bi-list me-3"
                  onClick={() => setShowButtons(!showButtons)}
                ></i>
                {showButtons && (
                  <span>
                    {currentUser.id === location.user.id && (
                      <>
                        <i
                          className="bi bi-vector-pen me-2"
                          onClick={handleShow}
                        ></i>
                        <ModaleModificaLocation
                          location={location}
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
                      </>
                    )}
                  </span>
                )}
              </CardText>
            )}

            <Card.Subtitle className="mb-2 text-muted text-end">
              {dateFormatter(location.creationDate)}
            </Card.Subtitle>
            <Card.Title>{location.title}</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted text-end">
              {rateStar(location.rate)}
            </Card.Subtitle>
            <Card.Text>{location.description}</Card.Text>

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
          <Card.Img variant="top" src={location.picture} />
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted text-end">
              {dateFormatter(location.creationDate)}
            </Card.Subtitle>
            <Card.Title>{location.title}</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted text-end">
              {rateStar(location.rate)}
            </Card.Subtitle>
            <Card.Text>{location.description}</Card.Text>
            <Card.Text>{location.outdoor}</Card.Text>

            <Card.Text>{location.price} €</Card.Text>

            <Card.Text>{location.locationType}</Card.Text>
            <Card.Text>{location.influxOfPeople}</Card.Text>

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
export default SingleLocation;
