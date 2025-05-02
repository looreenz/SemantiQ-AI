import React from "react";

// MessageBubble displays an individual chat message
const MessageBubble = React.memo(({ message, isAgent, avatar }) => {
  // Alignment and style based on sender type
  const alignment = isAgent ? "start" : "end"; // Left for agent, right for user
  const bubbleClass = isAgent ? "message-agent" : "message-user"; // Different bubble style

  return (
    <div className={`d-flex justify-content-${alignment} mb-3`}>
      <div
        className={`d-flex flex-column p-3 rounded-4 ${bubbleClass}`}
        aria-label={isAgent ? "Mensaje de Semantiq" : "Mensaje tuyo"}
      >
        {/* Message avatar */}
        <div className={`d-flex justify-content-${alignment}`}>
          <img
            src={isAgent ? "/logoPrimary.svg" : avatar}
            alt=""
            className={isAgent ? "img-fluid" : "img-fluid rounded-circle mb-2"}
            style={{ width: 30 }}
          />
        </div>

        {/* Message text */}
        <span>{message.message}</span>
      </div>
    </div>
  );
});

export default MessageBubble;
