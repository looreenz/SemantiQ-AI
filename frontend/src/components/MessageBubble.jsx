import React from "react";

const MessageBubble = React.memo(({ message, isAgent, avatar }) => {
  const alignment = isAgent ? "start" : "end";
  const bubbleClass = isAgent ? "message-agent" : "message-user";

  return (
    <div className={`d-flex justify-content-${alignment} mb-3`}>
      <div
        className={`d-flex flex-column p-3 rounded-4 ${bubbleClass}`}
        aria-label={isAgent ? "Mensaje de Semantiq" : "Mensaje tuyo"}
      >
        <div className={`d-flex justify-content-${alignment}`}>
          <img
            src={isAgent ? "/logoPrimary.svg" : avatar}
            alt=""
            className={isAgent ? "img-fluid" : "img-fluid rounded-circle mb-2"}
            style={{ width: 30 }}
          />
        </div>
        <span>{message.message}</span>
      </div>
    </div>
  );
});

export default MessageBubble;
