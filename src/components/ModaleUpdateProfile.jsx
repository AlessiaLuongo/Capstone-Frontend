import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUserInfos, fetchUploadImage } from "../redux/action";
import { useState } from "react";

const ModaleUpdateProfile = ({ handleClose, show, onSave }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const accessToken = useSelector(
    (state) => state.loginUserReducer.accessToken
  );
  const user = useSelector((state) => state.loginUserReducer.user);

  const [updatedInfos, setUpdatedInfos] = useState({
    username: user.username,
    name: user.name,
    surname: user.surname,
  });

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSaveInfos = async (e) => {
    e.preventDefault();
    console.log("fa la funzione");
    if (avatar) {
      await dispatch(fetchUploadImage(accessToken, avatar));
    }
    await dispatch(fetchUpdateUserInfos(accessToken, updatedInfos));
    onSave();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSaveInfos}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Foto profilo</Form.Label>
            <Form.Control type="file" onChange={handleAvatar} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              value={updatedInfos.username}
              onChange={(e) => {
                setUpdatedInfos({
                  ...updatedInfos,
                  username: e.target.value,
                });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              value={updatedInfos.name}
              onChange={(e) => {
                setUpdatedInfos({
                  ...updatedInfos,
                  name: e.target.value,
                });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="surname"
              value={updatedInfos.surname}
              onChange={(e) => {
                setUpdatedInfos({
                  ...updatedInfos,
                  surname: e.target.value,
                });
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Salva</Button>{" "}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModaleUpdateProfile;
