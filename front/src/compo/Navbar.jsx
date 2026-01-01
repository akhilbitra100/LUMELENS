import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { ShoppingBasket, Search, Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useSetCart, useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, role } = useAuth();
  const setCart = useSetCart();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  const handleLogout = () => {
    logout();
    setCart([]);
    setDropdownOpen(false);
    navigate("/");
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  // Helper function to safely get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    
    if (user.displayName) {
      return user.displayName;
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return "User"; // Fallback
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Auctions", path: "/auction" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        sticky ? "bg-indigo-100 shadow-md py-2" : "bg-indigo-50/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="mr-6 flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right Side - Search, Cart, User */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 w-40 lg:w-64 rounded-full bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm transition-all duration-200"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </form>
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 md:hidden flex items-center justify-center transition-colors duration-200"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <Search size={18} className="text-gray-700" />
              </button>
              {showSearch && (
                <div className="absolute top-12 right-0 md:hidden w-64 p-2 bg-white rounded-lg shadow-lg z-50">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        autoFocus
                      />
                      <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative flex items-center justify-center transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBasket size={18} className="text-gray-700" />
              {cart && cart.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cart.length > 9 ? '9+' : cart.length}
                </div>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors duration-200"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getUserDisplayName()}
                      </p>
                    </div>
                    
                    {/* Role-specific dashboard link */}
                    {role === "seller" && (
                      <Link
                        to="/seller-dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LayoutDashboard size={16} className="mr-2 text-gray-500" />
                        Seller Dashboard
                      </Link>
                    )}
                    
                    {role === "buyer" && (
                      <Link
                        to="/buyer-dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LayoutDashboard size={16} className="mr-2 text-gray-500" />
                        Buyer Dashboard
                      </Link>
                    )}
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2 text-gray-500" />
                      Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 rounded-md lg:hidden focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;