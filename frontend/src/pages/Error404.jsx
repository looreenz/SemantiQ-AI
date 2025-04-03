import { Container } from "react-bootstrap";
function Error404() {
  return (
    <Container
      className="d-flex flex-column gap-3 h-100 justify-content-center align-items-center"
      role="main"
    >
      <img
        className="img-fluid"
        src="/public/logoPrimary.svg"
        alt="Logo SemantiQ AI"
        aria-hidden="true"
      />

      <div className="d-flex gap-3 fs-3" role="alert">
        <h1 className="text-center">404</h1>
        <p className="text-center">NOT FOUND</p>
      </div>

      <div className="mt-3">
        <a
          href="/"
          className="btn btn-primary"
          aria-label="Volver a la página principal"
        >
          Regresar al inicio
        </a>
      </div>
    </Container>
  );
}

export default Error404;
