import { Button, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModaleModificaLocation from "./ModaleModificaLocation";
import { deleteSingleLocation, fetchAllLocations } from "../redux/action";

const SingleLocation = ({ location }) => {
  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= location.rate) {
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

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSingleLocation(location.id, userLoggedIn));
      dispatch(fetchAllLocations());
    } catch (error) {
      console.error("Error deleting location");
    }
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {dateFormatter(location.creationDate)}
          </Card.Subtitle>
          <Card.Title>{location.title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(location.rate)}
          </Card.Subtitle>
          <Card.Text>{location.description}</Card.Text>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <Button variant="outline-dark">Più dettagli</Button>
            </div>

            {userLoggedIn ? (
              <div>
                {currentUser.id === location.user.id ? (
                  <i className="bi bi-vector-pen me-2" onClick={handleShow}></i>
                ) : (
                  " "
                )}
                <ModaleModificaLocation
                  location={location}
                  handleClose={handleClose}
                  show={show}
                  token={userLoggedIn}
                />
                {currentUser.id === location.user.id ? (
                  <i
                    className="bi bi-trash3"
                    onClick={() => {
                      handleDelete();
                    }}
                  ></i>
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

export default SingleLocation;
