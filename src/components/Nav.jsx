import { useState } from "react";
import "../App.css";
import solutionLogo from "/assets/solution.png";
import f from "/assets/fa.png";
import i from "/assets/in.png";
import x from "/assets/ti.png";
import s from "/assets/search.png";
import e from "/assets/email.png";
import ph from "/assets/phone.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log(`Searching for: ${searchTerm}`);
      alert(`Searching for: ${searchTerm}`);
    }
  };

  const handleQuoteRequest = () => {
    console.log("Quote requested");
    alert("Quote requested!");
  };

  const handleSocialLink = (platform) => {
    console.log(`Social link clicked: ${platform}`);
    alert(`Opening ${platform}`);

    const socialLinks = {
      facebook: "https://facebook.com/gutenberg",
      twitter: "https://twitter.com/gutenberg",
      x: "https://x.com/gutenberg",
    };

    if (socialLinks[platform]) {
      window.open(socialLinks[platform], "_blank");
    }
  };

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-top-bar">
          <div className="navbar-contact-info">
            <img src={ph} className="navbar-icon" alt="phone" />
            <h5>+966 11 4002 03</h5>
          </div>

          <div className="navbar-contact-social">
            <img src={e} alt="email" className="navbar-icon" />
            <a href="mailto:info@gutenberg.com" className="navbar-email-link">
              info@gutenberg.com
            </a>

            <div className="navbar-social-links">
              <button
                onClick={() => handleSocialLink("facebook")}
                className="navbar-social-btn"
              >
                <img src={f} alt="Facebook" className="navbar-social-icon" />
              </button>
              <button
                onClick={() => handleSocialLink("twitter")}
                className="navbar-social-btn"
              >
                <img src={i} alt="Twitter" className="navbar-social-icon" />
              </button>
              <button
                onClick={() => handleSocialLink("x")}
                className="navbar-social-btn"
              >
                <img src={x} alt="X" className="navbar-social-icon" />
              </button>
            </div>
          </div>
        </div>

        <nav className="navbar-main">
          <div className="navbar-logo">
            <img src={solutionLogo} alt="Logo" className="navbar-logo-img" />
            <div className="navbar-company-name">
              شركة جوتينبيرغ
              <br />
              <span className="navbar-company-english">Gutenberg Co.</span>
            </div>
          </div>

          <div className="navbar-divider"></div>

          <ul className="navbar-menu">
            <li className="navbar-menu-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/services">Services</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/solutions">Solutions</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="#contact">Contact</Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/careers">Careers</Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <form onSubmit={handleSearch} className="navbar-search">
              <input
                type="text"
                placeholder="Search..."
                className="navbar-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="navbar-search-btn">
                <img src={s} alt="search" className="navbar-search-icon" />
              </button>
            </form>
            <button className="navbar-quote-btn" onClick={handleQuoteRequest}>
              Get a quote now
            </button>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </nav>

        {sidebarOpen && (
          <aside className="navbar-mobile-sidebar">
            <ul className="navbar-mobile-menu">
              <li className="navbar-mobile-item">
                <Link to="/">Home</Link>
              </li>
              <li className="navbar-mobile-item">
                <Link to="/services">Services</Link>
              </li>
              <li className="navbar-mobile-item">
                <Link to="/solutions">Solutions</Link>
              </li>
              <li className="navbar-mobile-item">
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <form onSubmit={handleSearch} className="navbar-mobile-search">
              <input
                type="text"
                placeholder="Search..."
                className="navbar-mobile-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="navbar-mobile-search-btn">
                <img
                  src={s}
                  alt="search"
                  className="navbar-mobile-search-icon"
                />
              </button>
            </form>
            <button
              className="navbar-mobile-quote-btn"
              onClick={() => {
                handleQuoteRequest();
                setSidebarOpen(false);
              }}
            >
              Get a quote now
            </button>
          </aside>
        )}
      </header>
    </>
  );
}

export default Navbar;
