import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Carousel1_pics/logo.jpg';
import cart2 from './Cart2.png';


const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (clear cookies, JWT, etc.)
    // For demonstration, we'll just update the state and navigate to the home page.
    setIsAuthenticated(false);
    // Clear any authentication tokens or cookies
    // Redirect the user to the home page or login page
    navigate.push('/');
  };

  // Example: You can check the authentication status from your server.
  // In a real application, this would involve making an API request.
  const checkAuthenticationStatus = async () => {
    try {
      // Example API endpoint for checking authentication status
      const response = await fetch('/authController/checkAuthenticationStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any authentication token if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(data.isAuthenticated);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  // Call the authentication check on component mount
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  return (
    <Navbar className="Navbar" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link to="/">
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto hover">
            <Link className='nav-link' to="/">Home</Link>
            <Link className='nav-link' to="/storefront">Storefront</Link>
            <Link className='nav-link' to="/about">About</Link>
            <Link className='nav-link' to="/contact">Contact Us</Link>
            <Link className='nav-link' to="/petform">Pet Form</Link>
            <Link className='nav-link' to="/donation">Donate</Link>
            {isAuthenticated ? (
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
            ) : (
              <>
                <Link className='nav-link' to="/login">Login</Link>
                <Link to="/cart" className="nav-link">
                  <img src={cart2} style={{ width: '30px', height: '24px', marginRight: '5px' }} alt="Cart" />
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
