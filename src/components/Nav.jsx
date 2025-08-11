import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import solutionLogo from "/assets/solution.png";
import f from "/assets/fa.png";
import i from "/assets/in.png";
import x from "/assets/ti.png";
import s from "/assets/search.png";
import e from "/assets/email.png";
import ph from "/assets/phone.png";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://gutenberg-server-production.up.railway.app/api/Services"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle mouse enter for dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  // Handle service click
  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
    setIsServicesDropdownOpen(false);
    setSidebarOpen(false);
  };

  // Handle services menu click (mobile)
  const handleServicesClick = () => {
    if (window.innerWidth < 768) {
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      <header className="relative z-20 overflow-visible">
        {/* Top Bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img src={ph} className="w-4 h-4" alt="phone" />
                <h5 className="text-sm font-medium text-gray-700">
                  +966 11 4002 03
                </h5>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img src={e} alt="email" className="w-4 h-4" />
                <a
                  href="mailto:info@gutenberg.com"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  info@gutenberg.com
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSocialLink("facebook")}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <img src={f} alt="Facebook" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSocialLink("twitter")}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <img src={i} alt="Twitter" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSocialLink("x")}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <img src={x} alt="X" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <img src={solutionLogo} alt="Logo" className="h-12 w-auto" />
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    شركة جوتينبيرغ
                  </div>
                  <div className="text-sm text-gray-600">Gutenberg Co.</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-gray-300 mx-8"></div>

              {/* Desktop Menu */}
              <ul className="hidden md:flex items-center space-x-8">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={handleServicesClick}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    <span>Services</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          Loading services...
                        </div>
                      ) : services.length > 0 ? (
                        services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() =>
                              handleServiceClick(service.serviceId)
                            }
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <div className="font-medium">{service.title}</div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No services available
                        </div>
                      )}
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    to="/solutions"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-blue-700 text-white p-2 rounded-2xl"
                  >
                    log in
                  </button>
                </li>
              </ul>

              {/* Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                    >
                      <img src={s} alt="search" className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <aside className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 md:hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div>
                    <button
                      onClick={handleServicesClick}
                      className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      <span>Services</span>
                      <span
                        className={`transform transition-transform duration-200 ${
                          isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {isServicesDropdownOpen && (
                      <div className="bg-gray-50 mt-2 rounded-lg">
                        {loading ? (
                          <div className="px-6 py-3 text-sm text-black">
                            Loading services...
                          </div>
                        ) : services.length > 0 ? (
                          services.map((service) => (
                            <li
                              key={service.serviceId}
                              onClick={() =>
                                handleServiceClick(service.serviceId)
                              }
                              className="block w-full text-left px-6 py-2 text-sm text-black hover:text-blue-600 transition-colors"
                            >
                              {service.title}
                            </li>
                          ))
                        ) : (
                          <div className="px-6 py-3 text-sm text-black">
                            No services available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <Link
                    to="/solutions"
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-blue-700 text-white p-2 rounded-2xl"
                  >
                    log in
                  </button>
                </li>
              </ul>

              <form onSubmit={handleSearch} className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  >
                    <img src={s} alt="search" className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <button
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => {
                  handleQuoteRequest();
                  setSidebarOpen(false);
                }}
              >
                Get a quote now
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </header>
    </>
  );
}

export default Navbar;
