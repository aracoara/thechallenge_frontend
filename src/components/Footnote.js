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
                            <ListGroup.Item action href="#who-we-are" className="footer-link">About Us</ListGroup.Item>
                            <ListGroup.Item action href="#mission" className="footer-link">Mission</ListGroup.Item>
                            <ListGroup.Item action href="#participation-rules" className="footer-link">Contest Rules</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={3}>
                        <h6>Terms and Policies</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="#terms-of-use" className="footer-link">Terms of Use</ListGroup.Item>
                            <ListGroup.Item action href="#privacy-policy" className="footer-link">Privacy Policy</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={3}>
                        <h6>Make a Suggestion</h6>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUCTYAq77LgkPWkogTm8z_EP8aXqcTv2CNeTKd6uXpxgMbTQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="footer-link">
                        Suggestion Form
                        </a>
                    </Col>
                    <Col xs={12} md={3} className="text-md-right">
                        <h6>Follow Us</h6>
                        <a href="https://instagram.com/smashpicks" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center footer-copy">
                        © {currentYear} Smash Picks - All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
