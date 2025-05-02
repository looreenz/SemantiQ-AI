import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const HomeCard = ({ to, icon, title, text, colClasses = "col-12 col-md-6", ariaLabel }) => {
  return (
    <div className={colClasses}>
      <Link
        to={to}
        className="text-decoration-none"
        aria-label={ariaLabel || `Ir a la sección de ${title.toLowerCase()}`}
      >
        <Card className="rounded-4 border-gradient">
          <Card.Body>
            <Card.Title className="d-flex flex-row justify-content-between align-items-center">
              <div className="text-purple w-100 text-center text-md-start">
                <i className={`bi ${icon} pe-1 text-purple`} aria-hidden="true"></i>
                {title}
              </div>
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Card.Title>
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default HomeCard;
