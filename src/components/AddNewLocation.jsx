import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateNewLocation, fetchTheBestPosts } from "../redux/action";

const AddNewLocation = ({ showLocation, handleCloseLocation }) => {
  const [newLocation, setNewLocation] = useState({
    title: "",
    description: "",
    outdoor: true,
    price: "",
    startDate: new Date(),
    endDate: new Date(),
    rate: 0,
    locationType: "",
    influxOfPeople: "",
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginUserReducer.accessToken);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchCreateNewLocation(newLocation, token));
    dispatch(fetchTheBestPosts());
    handleCloseLocation();
  };

  useEffect(() => {
    dispatch(fetchTheBestPosts());
  }, []);

  //----------------------------------------------------------------------------------------------//

  return (
    <Modal
      show={showLocation}
      onHide={handleCloseLocation}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Condividi un nuovo luogo!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titolo"
              value={newLocation.title}
              onChange={(e) => {
                setNewLocation({ ...newLocation, title: e.target.value });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newLocation.description}
              onChange={(e) => {
                setNewLocation({ ...newLocation, description: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="number">
            <Form.Label>Prezzo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prezzo"
              value={newLocation.price}
              onChange={(e) => {
                setNewLocation({ ...newLocation, price: e.target.value });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Location Indoor"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  checked={newLocation.indoor}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      outdoor: e.target.value === "Indoow" ? true : false,
                    })
                  }
                />
                <Form.Check
                  inline
                  label="Location Outdoor"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  checked={newLocation.outdoor}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      outdoor: e.target.value === "Outdoor" ? true : false,
                    })
                  }
                />
              </div>
            ))}
          </Form.Group>

          <FormGroup>
            <Form.Label>Scegli il tipo di luogo</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newLocation.location}
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  locationType: e.target.value,
                });
              }}
            >
              <option>...</option>
              <option value="0">Naturalistico</option>
              <option value="1">Culturale</option>
              <option value="2">Storico</option>
              <option value="3">Sportivo</option>
              <option value="4">Enogastronomico</option>
              <option value="5">Religioso</option>
              <option value="6">Altro</option>
            </Form.Select>
          </FormGroup>
          <FormGroup>
            <Form.Label>Quanto affluenza c&#39;è?</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newLocation.influxOfPeople}
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
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

          <FormGroup>
            <Form.Label>Quanto ti è piaciuto da 1 a 5?</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newLocation.rate}
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  rate: e.target.value,
                });
              }}
            >
              <option>...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </FormGroup>

          <Button variant="primary" type="submit">
            Salva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddNewLocation;
