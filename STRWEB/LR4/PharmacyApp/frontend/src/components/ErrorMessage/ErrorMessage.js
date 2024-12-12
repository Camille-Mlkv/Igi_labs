import React from "react";
import "./ErrorMessage.css"; // Подключаем стили

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div className={`error-message error-${variant}`}>
      <strong>{children}</strong>
    </div>
  );
};

export default ErrorMessage;
