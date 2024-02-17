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
<Navbar bg="light" expand="lg">
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
          <Nav.Link as={NavLink} to="/user" activeClassName="active">Usuário</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="ms-auto" style={{ flexWrap: 'wrap' }}> {/* Adiciona estilo para permitir a quebra de linha */}
        {authData && (
          <>
            <div className="nav-link">{`Hi, ${authData.username}`}</div> {/* Saudação ao usuário logado */}
            <button onClick={handleLogout} className="nav-link btn">Logout</button>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default AppNavbar;
