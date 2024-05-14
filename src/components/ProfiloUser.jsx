import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { fetchUploadImage, getCurrentUser } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ProfiloUser = () => {
  const currentUser = useSelector((state) => state.loginUserReducer.user);
  const accessToken = useSelector(
    (state) => state.loginUserReducer.accessToken
  );
  console.log("current user", currentUser);
  console.log("access token", accessToken);

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const handleAvatar = (e) => {
    console.log(e.target.files);
    setAvatar(e.target.files[0]);
    dispatch(getCurrentUser(accessToken));
  };
  const handleSaveImage = async () => {
    if (avatar) {
      await dispatch(fetchUploadImage(accessToken, avatar));
      dispatch(getCurrentUser(accessToken));
    } else {
      console.error("Avatar is null");
    }
  };

  return (
    <Container>
      <Row className="my-5 g-3 align-items-center">
        <Col xs={12} md={5} lg={4}>
          <Image
            src={currentUser.avatar}
            roundedCircle
            width={"130vh"}
            height={"130vh"}
          />
          <Form onSubmit={handleAvatar}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={handleAvatar} />
            </Form.Group>
            <Button onClick={handleSaveImage}>Salva</Button>{" "}
          </Form>
        </Col>
        <Col xs={12} md={7} lg={8}>
          <Card border="secondary">
            <Card.Header>{currentUser.username}</Card.Header>
            <Card.Body>
              <Card.Text>
                {currentUser.name} {""}
                {currentUser.surname}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
