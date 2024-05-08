import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfiloUser = () => {
  const currentUser = useSelector((state) => state.loginUserReducer.user);
  console.log(currentUser);

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
