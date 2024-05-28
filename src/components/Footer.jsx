import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <Row className="flex-column text-center p-2 justify-items-evenly">
        <Col>
          <p className="m-0">
            MADE WITH <i className="bi bi-suit-heart-fill"></i>
          </p>
          <p> Alessia Luongo</p>
        </Col>
        <Row className="align-items-center">
          <Col>
            <a>
              <i className="bi bi-envelope "></i>
              <span> alessialuongoworkspace@gmail.com</span>
            </a>
          </Col>

          <Col>
            <a
              href="https://github.com/AlessiaLuongo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="bi bi-github"></i> <span>GitHub</span>
            </a>
          </Col>
          <Col>
            <a
              href="https://www.linkedin.com/in/alessia-luongo-b61832305/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="bi bi-linkedin"></i> <span>Linkedin</span>
            </a>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};
export default Footer;
