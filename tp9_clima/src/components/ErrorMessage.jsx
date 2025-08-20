import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <FaExclamationTriangle />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
