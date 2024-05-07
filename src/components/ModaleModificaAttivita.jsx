import { Button, Form, FormGroup, Modal, ModalFooter } from "react-bootstrap";
import { updateSingleActivity } from "../redux/action";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ModaleModificaAttivita = ({ show, handleClose, activity }) => {
  const formattedDateToSendBack = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

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

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica la tua attività</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(updateSingleActivity(activity.id, updatedActivity));
          }}
        >
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Aggiorna il titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titolo"
              value={activity.title}
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
              value={activity.description}
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
              value={activity.price}
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
                  checked={!activity.outdoor}
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
                  checked={activity.outdoor}
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
              value={formattedDateToSendBack(activity.startDate)}
              onChange={(e) => setDate(e.target.value)}
            />

            <Form.Label>Data di fine</Form.Label>
            <Form.Control
              type="date"
              name="datepic"
              placeholder="DateRange"
              value={formattedDateToSendBack(activity.endDate)}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Scegli il tipo di attività</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={activity.eventType}
              onChange={(e) => {
                setUpdatedActivity({
                  ...updatedActivity,
                  eventType: e.target.value,
                });
              }}
            >
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
  );
};
export default ModaleModificaAttivita;
