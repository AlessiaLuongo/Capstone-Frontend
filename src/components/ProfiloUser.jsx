import { Col, Container, Image, Row } from "react-bootstrap";

const ProfiloUser = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4} lg={3}>
          <Image src="https://placedog.net/300" roundedCircle />
        </Col>
        <Col xs={6} md={8} lg={9}></Col>
      </Row>
    </Container>
  );
};
export default ProfiloUser;
