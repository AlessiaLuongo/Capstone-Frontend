import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateNewActivity,
  fetchTheBestPosts,
  startLoader,
  stopLoader,
  uploadActivityPicture,
} from "../redux/action";

const AddNewActivity = ({ showActivity, handleCloseActivity }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTheBestPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accessToken = useSelector(
    (state) => state.loginUserReducer.accessToken
  );

  const newActivityId = useSelector((state) => state.createNewActivity.id);

  useEffect(() => {
    console.log("Id aggiornato", newActivityId);
  }, [newActivityId]);

  const [picture, setPicture] = useState(null);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    outdoor: true,
    price: "",
    startDate: null,
    endDate: null,
    eventType: "",
    rate: 0,
    picture: null,
  });

  const formattedDateToSendBack = (date) => {
    return date ? new Date(date).toISOString().slice(0, 10) : "";
  };

  const [showDates, setShowDates] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoader());
    try {
      const result = await dispatch(
        fetchCreateNewActivity(newActivity, accessToken)
      );

      const newActivityId = result.payload.id;

      if (newActivityId) {
        await dispatch(
          uploadActivityPicture(accessToken, picture, newActivityId)
        );
      }

      await dispatch(fetchTheBestPosts());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      dispatch(stopLoader());
      handleCloseActivity();
    }
  };

  const handlePicture = (e) => {
    setPicture(e.target.files[0]);
  };

  const isLoading = useSelector((state) => state.createNewActivity.isLoading);

  //----------------------------------------------------------------------------------------------//

  return (
    <Modal
      show={showActivity}
      onHide={handleCloseActivity}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Condividi una nuova attività!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Aggiungi una foto</Form.Label>
            <Form.Control type="file" onChange={handlePicture} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titolo"
              value={newActivity.title}
              onChange={(e) => {
                setNewActivity({ ...newActivity, title: e.target.value });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descrizione</Form.Label>

            <Form.Control
              as="textarea"
              rows={2}
              value={newActivity.description}
              onChange={(e) => {
                setNewActivity({ ...newActivity, description: e.target.value });
              }}
            />
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
                  checked={newActivity.indoor}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      outdoor: e.target.value === "Indoow" ? true : false,
                    })
                  }
                />
                <Form.Check
                  inline
                  label="Attività Outdoor"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  checked={newActivity.outdoor}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      outdoor: e.target.value === "Outdoor" ? true : false,
                    })
                  }
                />
              </div>
            ))}
          </Form.Group>
          <FormGroup>
            <Form.Label>Scegli il tipo di attività</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newActivity.eventType}
              onChange={(e) => {
                setNewActivity({ ...newActivity, eventType: e.target.value });
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
          <FormGroup>
            <Form.Label>Quanto ti è piaciuto da 1 a 5?</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newActivity.rate}
              onChange={(e) => {
                setNewActivity({ ...newActivity, rate: e.target.value });
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
          <hr />
          <Button onClick={() => setShowDates(!showDates)}>
            Aggiungi eventuali date e prezzi
          </Button>
          <hr />

          {showDates === true ? (
            <>
              <Form.Group className="mb-3" controlId="number">
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Prezzo"
                  value={newActivity.price}
                  onChange={(e) => {
                    setNewActivity({ ...newActivity, price: e.target.value });
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <FormGroup>
                <Form.Label>Data di inizio</Form.Label>
                <Form.Control
                  type="date"
                  name="datepic"
                  placeholder="DateRange"
                  value={formattedDateToSendBack(newActivity.startDate)}
                  onChange={(e) => {
                    setNewActivity({
                      ...newActivity,
                      startDate: e.target.value,
                    });
                  }}
                />

                <Form.Label>Data di fine</Form.Label>
                <Form.Control
                  type="date"
                  name="datepic"
                  placeholder="DateRange"
                  value={formattedDateToSendBack(newActivity.endDate)}
                  onChange={(e) => {
                    setNewActivity({ ...newActivity, endDate: e.target.value });
                  }}
                />
              </FormGroup>
            </>
          ) : (
            ""
          )}

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
export default AddNewActivity;
