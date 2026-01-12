import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaShopify, FaPaperPlane } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // You could add a success message here
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Links Section */}
          <div className="footer-section">
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              <li><a href="#publishers">Publishers</a></li>
              <li><a href="#bestsellers">Bestsellers</a></li>
              <li><a href="#interviews">Interviews</a></li>
              <li><a href="#authors">Authors Story</a></li>
              <li><a href="#bookfairs">Book Fairs</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#help">Help (FAQ)</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section newsletter-section">
            <h3 className="footer-title">News & Updates</h3>
            <p className="newsletter-text">
              We'd love it if you subscribed to our newsletter! You'll love it too.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>

          {/* Social Media Section */}
          <div className="footer-section">
            <h3 className="footer-title">Social Media</h3>
            <p className="social-text">
              Stay in touch with everything LinearSix Book Library, follow us on social media and learn about new promotions.
            </p>
            <div className="social-links">
              <a href="#facebook" className="social-link facebook">
                <FaFacebookF />
              </a>
              {/* <a href="#twitter" className="social-link twitter">
                <FaTwitter />
              </a> */}
              <a href="#instagram" className="social-link instagram">
                <FaInstagram />
              </a>
              <a href="#linkedin" className="social-link linkedin">
                <FaLinkedinIn />
              </a>
              <a href="#shopify" className="social-link shopify">
                <FaShopify />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} LinearSix Book Library. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;