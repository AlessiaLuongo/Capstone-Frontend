import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <Row className="flex-column text-center">
        <Col>
          MADE WITH <i className="bi bi-suit-heart-fill"></i>
        </Col>
        <Col>Alessia Luongo</Col>
      </Row>
    </Container>
  );
};
export default Footer;
