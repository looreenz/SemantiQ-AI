import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// HomeCard: A reusable card component used on the homepage
const HomeCard = ({
  to, // Destination path
  icon, // Icon class (Bootstrap Icons)
  title, // Card title text
  text, // Description text
  colClasses = "col-12 col-md-6", // Bootstrap grid classes
  ariaLabel, // Optional ARIA label for accessibility
}) => {
  return (
    <div className={colClasses}>
      {/* Wrap card with a link */}
      <Link
        to={to}
        className="text-decoration-none"
        aria-label={ariaLabel || `Ir a la sección de ${title.toLowerCase()}`}
      >
        <Card className="rounded-4 border-gradient">
          <Card.Body>
            {/* Title with icon and right arrow */}
            <Card.Title className="d-flex flex-row justify-content-between align-items-center">
              <div className="text-purple w-100 text-center text-md-start">
                <i
                  className={`bi ${icon} pe-1 text-purple`}
                  aria-hidden="true"
                ></i>
                {title}
              </div>
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Card.Title>

            {/* Optional description text */}
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default HomeCard;
