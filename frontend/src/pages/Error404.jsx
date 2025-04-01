import { Container } from "react-bootstrap";
function Error404() {
  return (
    <Container className="d-flex flex-column gap-3 h-100 justify-content-center align-items-center">
      <img className="img-fluid" src="/public/logoPrimary.svg" alt="Logo SemantiQ AI" />
      <div className="d-flex gap-3 fs-3">
        <span>404</span>
        <span>|</span>
        <span>NOT FOUND</span>
      </div>
    </Container>
  );
}

export default Error404;
