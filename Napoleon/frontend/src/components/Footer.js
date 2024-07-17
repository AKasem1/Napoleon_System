import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.facebook.com/mahmoudabdelfatah11" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://api.whatsapp.com/send?phone=%2B201113152850&context=ARBhjb5EZE4zZOKFUJXQwDhwskLXiiPEdqCCsYU9Wuqb_4hdhG7oL8eiY0R_qdRZBqDIRMHRjlAfdocFA4fNVLKnOd_T8uJxzNV00bkQZm_urkNId-4_U2m7auzKmejLG5gBvk6J8dM6IOOEhi-DXUegqA&source=FB_Page&app=facebook&entry_point=page_cta" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
      <div className="footer-text">
        <p>Developed by Mahmoud & Abdelrahman</p>
        <p>Powered by Napoleon</p>
      </div>
    </footer>
  );
};

export default Footer;
