// footer.jsx
import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Guide to Iceland</h4>
          <ul>
            <li>About us</li>
            <li>Awards</li>
            <li>Terms & conditions</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Travel services</h4>
          <ul>
            <li>Tours & Packages</li>
            <li>Self-drive tours</li>
            <li>Travel info</li>
            <li>Car rentals</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Explore Iceland</h4>
          <ul>
            <li>VIP Club</li>
            <li>Map of Iceland</li>
            <li>Weather in Iceland</li>
            <li>Media production</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Special Requests</h4>
          <ul>
            <li>Travel Agents</li>
            <li>Corporate events</li>
            <li>Weddings & Honeymoons</li>
            <li>Join our team</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Guide to Iceland. All rights reserved.</p>
      </div>
    </footer>
  );
};
