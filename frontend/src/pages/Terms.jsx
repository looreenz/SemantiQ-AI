import React, { memo } from "react";
import { Container } from "react-bootstrap";

import Header from "../components/Header";
import SEO from "../components/SEO";

import { TERMS } from "../utils/consts";

function Terms() {
  return (
    <Container>
      {/* SEO metadata for better visibility */}
      {/* <SEO
        title="Términos y condiciones"
        description="Lee los términos y condiciones de uso de SemantiQ AI."
        endpoint="terms"
      /> */}

      {/* Page title header */}
      <Header title="Términos y condiciones" />

      {/* Main content area */}
      <div className="terms-container w-75 mx-auto py-5">
        {/* Iterate and render each section from TERMS constant */}
        {TERMS.map((term, idx) => (
          <section key={term.title || idx} className="mb-4">
            <h3 className="text-purple">
              {idx + 1}. {term.title}
            </h3>
            {term.content.map((paragraph, pidx) => (
              <p key={pidx}>{paragraph}</p>
            ))}
          </section>
        ))}

        {/* Footer note with last updated date */}
        <div className="terms-last-update text-purple">
          Última actualización: 8 de abril de 2025
        </div>
      </div>
    </Container>
  );
}

export default memo(Terms);
