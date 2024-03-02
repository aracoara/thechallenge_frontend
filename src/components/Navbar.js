import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/smash_picks_logo_64px.png'; // Verifique o caminho do logo
import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário

const AppNavbar = () => {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redireciona para a página de login usando useNavigate
  };

  return (
    // <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1020 }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/leaderboard" activeClassName="active">Leaderboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/picks-overview" activeClassName="active">Picks Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/picks" activeClassName="active">Picks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/tournament" activeClassName="active">Tournament</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            {authData && (
              <>
                <div className="nav-link">{`Hi, ${authData.username}`}</div> {/* Saudação ao usuário logado */}
                {/* <button onClick={handleLogout} className="nav-link btn btn-outline-light">Logout</button> */}
                <button 
                  onClick={handleLogout} 
                  className="nav-link" 
                  variant="outline-light"
                  onMouseOver={(e) => e.target.style.color = 'yellow'} // Muda a cor do texto para preto ao passar o mouse
                  onMouseOut={(e) => e.target.style.color = ''} // Retorna à cor original ao retirar o mouse
                >
                  Logout
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
};

export default AppNavbar;
