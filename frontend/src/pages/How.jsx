import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function How() {
  return (
    <Container>
      <Header title="Como?" />
      <div className="row vh-100">
        <div className="col-12 col-xl-6">
          <div className="py-5 h-75">
            <div className="d-flex flex-column align-items-start justify-content-center h-100">
              <h2 className="fs-3 lh-lg">
                SemantiQ combina generación de texto con Retrieval-Augmented
                Generation (RAG) para ofrecerte respuestas precisas basadas en
                tus archivos.
              </h2>
              <Link to="/documents" className="text-decoration-none">
                <Button className="d-flex gap-2 align-items-center mb-3 bg-purple">
                  Sube tu primer fichero
                  <i class="bi bi-arrow-right"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-none d-xl-block">
          <div className="d-flex justify-content-center align-items-center h-75">
            <img
              src="/logoPrimary.svg"
              alt="Logo SemantiQ AI"
              className="img-fluid w-50"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default How;
