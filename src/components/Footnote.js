import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Certifique-se de que este arquivo exista e esteja importado corretamente

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <h6>Smash Picks</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="#who-we-are" className="footer-link">Quem Somos</ListGroup.Item>
                            <ListGroup.Item action href="#mission" className="footer-link">Missão</ListGroup.Item>
                            <ListGroup.Item action href="#participation-rules" className="footer-link">Regras de Participação</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={3}>
                        <h6>Termos e Políticas</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="#terms-of-use" className="footer-link">Termos de Uso</ListGroup.Item>
                            <ListGroup.Item action href="#privacy-policy" className="footer-link">Política de Privacidade</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={3}>
                        <h6>Faça uma Sugestão</h6>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUCTYAq77LgkPWkogTm8z_EP8aXqcTv2CNeTKd6uXpxgMbTQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="footer-link">
                            Formulário de Sugestões
                        </a>
                    </Col>
                    <Col xs={12} md={3} className="text-md-right">
                        <h6>Siga-nos</h6>
                        <a href="https://instagram.com/smashpicks" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center footer-copy">
                        © {currentYear} Smash Picks - Todos os direitos reservados.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
