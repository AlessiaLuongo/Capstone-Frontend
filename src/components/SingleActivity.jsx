import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalFooter,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSingleActivity } from "../redux/action";

const SingleActivity = ({ activity }) => {
  const { title, description, creationDate, rate } = activity;

  const dateFormatter = () => {
    return new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  };

  const rateHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        hearts.push(<i key={i} className="bi bi-suit-heart-fill"></i>);
      } else {
        hearts.push(<i key={i} className="bi bi-suit-heart"></i>);
      }
    }
    return hearts;
  };

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [updatedActivity, setUpdatedActivity] = useState({
    title: "",
    description: "",
    outdoor: true,
    price: "",
    startDate: "",
    endDate: "",
    eventType: "",
  });

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={""} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-end">
            {dateFormatter(creationDate)}
          </Card.Subtitle>
          <Card.Title>{title}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted text-end">
            {rateHearts(rate)}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <Button variant="outline-dark">Più dettagli</Button>
            </div>

            <div>
              <i className="bi bi-vector-pen me-2" onClick={handleShow}></i>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modifica la tua attività</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(updateSingleActivity(activity, updatedActivity));
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Aggiorna il titolo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Titolo"
                        value={updatedActivity.title}
                        onChange={(e) => {
                          setUpdatedActivity({
                            ...updatedActivity,
                            title: e.target.value,
                          });
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Aggiorna la descrizione</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={updatedActivity.description}
                        onChange={(e) => {
                          setUpdatedActivity({
                            ...updatedActivity,
                            description: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Aggiorna il prezzo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Prezzo"
                        value={updatedActivity.price}
                        onChange={(e) => {
                          setUpdatedActivity({
                            ...updatedActivity,
                            price: e.target.value,
                          });
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <Form.Group>
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Attività Indoor"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            value="Indoor"
                            checked={!updatedActivity.outdoor}
                            onChange={(e) =>
                              setUpdatedActivity({
                                ...updatedActivity,
                                outdoor:
                                  e.target.value === "Indoor" ? false : true,
                              })
                            }
                          />
                          <Form.Check
                            inline
                            label="Attività Outdoor"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            value="Outdoor"
                            checked={updatedActivity.outdoor}
                            onChange={(e) =>
                              setUpdatedActivity({
                                ...updatedActivity,
                                outdoor:
                                  e.target.value === "Outdoor" ? true : false,
                              })
                            }
                          />
                        </div>
                      ))}
                    </Form.Group>

                    <FormGroup>
                      <Form.Label>Data di inizio</Form.Label>
                      <Form.Control
                        type="date"
                        name="datepic"
                        placeholder="DateRange"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />

                      <Form.Label>Data di fine</Form.Label>
                      <Form.Control
                        type="date"
                        name="datepic"
                        placeholder="DateRange"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Form.Label>Scegli il tipo di attività</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>...</option>
                        <option value="1">Concerto</option>
                        <option value="2">Sportivo</option>
                        <option value="3">Business</option>
                        <option value="4">Culturale</option>
                        <option value="5">Workshop</option>
                        <option value="6">Religiosa</option>
                        <option value="7">Altro</option>
                      </Form.Select>
                    </FormGroup>
                  </Form>
                </Modal.Body>
                <ModalFooter>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Salva
                  </Button>
                </ModalFooter>
              </Modal>
              <i className="bi bi-trash3"></i>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

SingleActivity.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default SingleActivity;
