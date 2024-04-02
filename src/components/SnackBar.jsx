import React, { useEffect } from 'react';

const Snackbar = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="snackbar">
      <span className="message">{message}</span>
    </div>
  );
};

export default Snackbar;
