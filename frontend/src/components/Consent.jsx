import { useState, useEffect } from "react";

function Consent() {
  // Local state to control visibility and acceptance status
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // On mount, check localStorage for previous consent decision
  useEffect(() => {
    const hasSeenBanner = localStorage.getItem("cookies_seen");
    const hasAccepted = localStorage.getItem("cookies_accepted") === "true";

    console.log("hasSeenBanner:", hasSeenBanner);
    console.log("hasAccepted:", hasAccepted);

    setAccepted(hasAccepted);
    if (!hasSeenBanner) {
      setVisible(true); // Show banner if user hasn't seen it
    }
  }, []);

  // Handle acceptance
  const acceptCookies = () => {
    localStorage.setItem("cookies_seen", "true");
    localStorage.setItem("cookies_accepted", "true");
    setAccepted(true);
    setVisible(false);
  };

  // Handle rejection
  const rejectCookies = () => {
    localStorage.setItem("cookies_seen", "true");
    localStorage.setItem("cookies_accepted", "false");
    setAccepted(false);
    setVisible(false);
  };

  // Don't render banner if not visible
  if (!visible) return null;

  return (
    <div
      className="position-fixed w-25 rounded-4 bottom-0 start-0 end-0 bg-message text-white p-3 m-3 shadow"
      style={{ zIndex: 1050 }}
    >
      {/* Cookie consent message */}
      <div className="container d-flex text-center flex-column justify-content-between align-items-center gap-3">
        <span>
          Usamos cookies para mejorar tu experiencia. ¿Aceptas su uso?
        </span>
        <div className="d-flex gap-2">
          <button onClick={acceptCookies} className="btn btn-success">
            Aceptar
          </button>
          <button onClick={rejectCookies} className="btn btn-danger">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consent;
