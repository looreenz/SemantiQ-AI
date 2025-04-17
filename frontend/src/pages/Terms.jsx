import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { TERMS } from "../utils/consts";

function Terms() {
  return (
    <Container>
      <SEO
        title="Términos y condiciones"
        description="Lee los términos y condiciones de uso de SemantiQ AI."
        endpoint="terms"
      />
      <Header title="Términos y condiciones" />
      <div className="terms-container w-75 mx-auto py-5">
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
        <div className="terms-last-update text-purple">
          Última actualización: 8 de abril de 2025
        </div>
      </div>
    </Container>
  );
}

export default React.memo(Terms);