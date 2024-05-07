import { Col, Container, Row } from "react-bootstrap";

const WelcomePage = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={7} lg={5}>
          HOMEPAGE con i preferiti delle persone che segui
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
