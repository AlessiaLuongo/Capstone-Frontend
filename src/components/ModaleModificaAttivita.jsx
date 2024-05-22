import { Button, Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import {
  fetchAllActivities,
  startLoader,
  stopLoader,
  updateSingleActivity,
} from "../redux/action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModaleModificaAttivita = ({ show, handleClose, activity, token }) => {
  const formattedDateToSendBack = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  const [updatedActivity, setUpdatedActivity] = useState({
    title: activity.title,
    description: activity.description,
    outdoor: true,
    price: activity.price,
    startDate: activity.startDate,
    endDate: activity.endDate,
    eventType: activity.eventType,
    picture: activity.picture,
    rate: activity.rate,
  });

  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoader());
    await dispatch(updateSingleActivity(activity.id, updatedActivity, token));
    dispatch(fetchAllActivities());
    dispatch(stopLoader());
    handleClose();
  };

  const isLoading = useSelector((state) => state.updateActivity.isLoading);

  //----------------------------------------------------------------------------------------------//
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica la tua attività</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="text">
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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

          <Form.Group className="mb-3" controlId="number">
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
                      outdoor: e.target.value === "Indoor" ? false : true,
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
                      outdoor: e.target.value === "Outdoor" ? true : false,
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
              value={formattedDateToSendBack(updatedActivity.startDate)}
              onChange={(e) =>
                setUpdatedActivity({
                  ...updatedActivity,
                  startDate: e.target.value,
                })
              }
            />

            <Form.Label>Data di fine</Form.Label>
            <Form.Control
              type="date"
              name="datepic"
              placeholder="DateRange"
              value={formattedDateToSendBack(updatedActivity.endDate)}
              onChange={(e) =>
                setUpdatedActivity({
                  ...updatedActivity,
                  endDate: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Scegli il tipo di attività</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={updatedActivity.eventType}
              onChange={(e) => {
                setUpdatedActivity({
                  ...updatedActivity,
                  eventType: e.target.value,
                });
              }}
            >
              <option>...</option>
              <option value="0">Concerto</option>
              <option value="1">Sportivo</option>
              <option value="2">Business</option>
              <option value="3">Culturale</option>
              <option value="4">Workshop</option>
              <option value="5">Religiosa</option>
              <option value="6">Altro</option>
            </Form.Select>
          </FormGroup>
          <Modal.Footer>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            ) : (
              <Button variant="primary" type="submit">
                Salva
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModaleModificaAttivita;
