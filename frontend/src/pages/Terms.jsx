import { Container } from "react-bootstrap";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { TERMS } from "../utils/consts";

function Terms() {
  const renderTerms = () => {
    return (
      <>
        {TERMS.map((term, index) => (
          <div>
            <h3 className="text-purple">
              {index+1}. {term.title}
            </h3>
            {term.content.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </div>
        ))}
      </>
    );
  };

  return (
    <Container>
      <SEO
        title="Términos y condiciones"
        description="Lee los términos y condiciones de uso del sistema SemantiQ AI, incluyendo políticas de privacidad y licencias."
        endpoint="terms"
      ></SEO>
      <Header title="Términos y condiciones" />
      <div className="terms-container w-75 mx-auto py-5">
        {renderTerms()}
        <div className="terms-last-update text-purple">
          Última actualización: 8 de abril de 2025
        </div>
      </div>
    </Container>
  );
}

export default Terms;
