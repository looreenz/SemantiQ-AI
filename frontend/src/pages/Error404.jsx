import { Container } from "react-bootstrap";
import SEO from "../components/SEO";

function Error404() {
  return (
    <Container
      className="d-flex flex-column gap-3 h-100 justify-content-center align-items-center"
      role="main"
    >
      <SEO
        title="Página no encontrada"
        description="La página que buscas no existe."
        noIndex={true}
      ></SEO>
      <img
        className="img-fluid"
        src="/logoPrimary.svg"
        alt="Logo SemantiQ AI"
        aria-hidden="true"
      />

      <div className="d-flex gap-3 fs-3" role="alert">
        <h1 className="text-center">404</h1>
        <p className="text-center">NOT FOUND</p>
      </div>
    </Container>
  );
}

export default Error404;
