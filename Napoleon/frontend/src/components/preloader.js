import React from 'react';
import './preloader.css'; 

const Preloader = ({ logo }) => {
  return (
    <div className="preloader">
      <img src={logo} alt="Loading..." className="preloader-logo" />
    </div>
  );
};

export default Preloader;