import React, { memo } from "react";
import { Container } from "react-bootstrap";

import SEO from "../components/SEO";

function Error404() {
  return (
    <Container
      className="d-flex flex-column gap-3 h-100 justify-content-center align-items-center"
      role="main"
    >
      {/* SEO meta tag configuration to prevent indexing */}
      {/* <SEO
        title="Página no encontrada"
        description="La página que buscas no existe."
        noIndex
      /> */}

      {/* Project logo */}
      <img src="/logoPrimary.svg" alt="Logo SemantiQ AI" aria-hidden />

      {/* Error message block */}
      <div className="d-flex align-items-center gap-3 fs-3" role="alert">
        <h1 className="m-0">404</h1>
        <p className="m-0">NOT FOUND</p>
      </div>
    </Container>
  );
}

export default memo(Error404);
