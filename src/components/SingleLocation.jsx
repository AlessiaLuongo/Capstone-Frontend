import { Button, Card, CardText, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModaleModificaLocation from "./ModaleModificaLocation";
import { deleteSingleLocation, fetchAllLocations } from "../redux/action";

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

  return (
    <Col xs={12} md={6} lg={4}>
      {frontSide ? (
        <Card>
          <Card.Img variant="top" src={location.picture} />
          <Card.Body>
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
              <div>
                <Button
                  variant="outline-dark"
                  onClick={() => setFrontSide(false)}
                >
                  Più dettagli
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Img variant="top" src={""} />
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
                <Button
                  variant="outline-dark"
                  onClick={() => setFrontSide(true)}
                >
                  Torna indietro
                </Button>
              </div>

              {userLoggedIn && currentUser.id === location.user.id && (
                <>
                  <i className="bi bi-vector-pen me-2" onClick={handleShow}></i>
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
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};
export default SingleLocation;
