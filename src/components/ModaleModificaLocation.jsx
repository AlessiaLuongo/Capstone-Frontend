import { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAllLocations, updateSingleLocation } from "../redux/action";

const ModaleModificaLocation = ({ show, handleClose, location, token }) => {
  const [updatedLocation, setUpdatedLocation] = useState({
    title: location.title,
    description: location.description,
    outdoor: true,
    price: location.price,
    locationType: location.locationType,
    influxOfPeople: location.influxOfPeople,
    picture: location.picture,
    rate: location.rate,
  });

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateSingleLocation(location.id, updatedLocation, token));
    dispatch(fetchAllLocations());
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica il tuo luogo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Aggiorna il titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titolo"
              value={updatedLocation.title}
              onChange={(e) => {
                setUpdatedLocation({
                  ...updatedLocation,
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
              value={updatedLocation.description}
              onChange={(e) => {
                setUpdatedLocation({
                  ...updatedLocation,
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
              value={updatedLocation.price}
              onChange={(e) => {
                setUpdatedLocation({
                  ...updatedLocation,
                  price: e.target.value,
                });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Check
              inline
              label="Luogo Indoor"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              value="Indoor"
              checked={!updatedLocation.outdoor}
              onChange={(e) =>
                setUpdatedLocation({
                  ...updatedLocation,
                  outdoor: e.target.value === "Indoor" ? false : true,
                })
              }
            />
            <Form.Check
              inline
              label="Luogo Outdoor"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              value="Outdoor"
              checked={updatedLocation.outdoor}
              onChange={(e) =>
                setUpdatedLocation({
                  ...updatedLocation,
                  outdoor: e.target.value === "Outdoor" ? true : false,
                })
              }
            />
          </Form.Group>

          <FormGroup>
            <Form.Label>Scegli il tipo di luogo</Form.Label>
            <Form.Select
              aria-label="Select location type"
              value={updatedLocation.locationType}
              onChange={(e) => {
                setUpdatedLocation({
                  ...updatedLocation,
                  locationType: e.target.value,
                });
              }}
            >
              <option value="">...</option>
              <option value="1">Naturalistico</option>
              <option value="2">Culturale</option>
              <option value="3">Storico</option>
              <option value="4">Sportivo</option>
              <option value="5">Enogastronomico</option>
              <option value="6">Religioso</option>
              <option value="7">Altro</option>
            </Form.Select>
          </FormGroup>

          <FormGroup>
            <Form.Label>Quanta affluenza ha questo luogo?</Form.Label>
            <Form.Select
              aria-label="Select influx of people"
              value={updatedLocation.influxOfPeople}
              onChange={(e) => {
                setUpdatedLocation({
                  ...updatedLocation,
                  influxOfPeople: e.target.value,
                });
              }}
            >
              <option>...</option>
              <option value="0">Bassa</option>
              <option value="1">Media</option>
              <option value="2">Alta</option>
            </Form.Select>
          </FormGroup>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModaleModificaLocation;
