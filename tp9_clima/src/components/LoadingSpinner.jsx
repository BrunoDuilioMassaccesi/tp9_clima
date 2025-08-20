import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner" />
      <p>Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;
