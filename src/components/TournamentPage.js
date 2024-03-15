import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useTournament } from './TournamentContext';
import { Alert, Button, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Importação adicional

const TournamentPage = () => {
  const { authData } = useAuth();
  const { selectTournament } = useTournament();
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const fetchTournaments = async () => {
    try {
        const response = await axios.get('https://thechallenge-solino.pythonanywhere.com/tournaments');
        // const response = await axios.get('http://localhost:5000/tournaments');

        setTournaments(response.data);
        console.log('Tournaments loaded:', response.data);

        // Novo: Encontrar o primeiro torneio com status 'Open' e definir como selecionado.
        const openTournament = response.data.find(tournament => tournament.status === "Open");
        if (openTournament) {
            setSelectedTournament(openTournament);
            selectTournament(openTournament); // Atualiza no contexto global, se necessário.
        }
    } catch (error) {
        console.error('Error loading tournaments:', error);
    }
};


    const handleSelectTournament = (e) => {
        try {
            const selectedTournament = JSON.parse(e.target.value);
            console.log('Tournament selected:', selectedTournament);
            setSelectedTournament(selectedTournament);
            selectTournament(selectedTournament);
        } catch (error) {
            console.error('Error selecting tournament:', error);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    if (!authData) {
        return <div>You need to be logged in to access this page.</div>;
    }

    const renderStatusMessageAndLinks = () => {
      if (!selectedTournament) return null;
    
      let message;
      let linksComponents = []; // Ajuste no nome da variável para refletir seu uso
      // let links = [];
      switch (selectedTournament.status) {
        case "Open":
          message = "Picks submission is open.";
          linksComponents.push(
            <LinkContainer to="/picks">
              <Button variant="primary" className="m-2">Make your predictions on the Picks Page</Button>
            </LinkContainer>
          );
          break;
        case "On Progress":
          message = "The tournament is in progress.";
          linksComponents.push(
            <LinkContainer to="/picks-overview">
              <Button variant="primary" className="m-2">Compare your guess with the other members</Button>
            </LinkContainer>
          );
          linksComponents.push(
            <LinkContainer to="/leaderboard">
              <Button variant="primary" className="m-2">Follow your performance on the Leaderboard Page</Button>
            </LinkContainer>
          );
          break;
        case "Closed":
          message = "Tournament closed.";
          break;
        default:
          message = "Status unknown.";
          break;
      }

  return (
    <Container className="text-center mt-3">
      <Row>
        <Col>
          <Alert variant="info">{message}</Alert>
          {linksComponents}
          {selectedTournament.status !== "Closed" && selectedTournament.whatsapp_paths && (
            <>
              <p>Hi, {authData.username}, enter the tournament's exclusive WhatsApp group!</p>
              <Button href={selectedTournament.whatsapp_paths} variant="success" target="_blank">
                Access WhatsApp Group {selectedTournament.short_name} {selectedTournament.year}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );      
  
};

  return (
      <div className="container mt-5">
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <div className="card">
                      <h5 className="card-header">Select a Tournament</h5>
                      <div className="card-body">
                          {tournaments.length ? (
                              <form>
                                  <div className="mb-3">
                                      <label htmlFor="tournamentSelect" className="form-label">Tournament:</label>
                                      <select
                                          id="tournamentSelect"
                                          className="form-select"
                                          onChange={handleSelectTournament}
                                      >
                                          <option>Select a tournament</option>
                                          {tournaments.map((tournament) => (
                                              <option key={tournament.id} value={JSON.stringify(tournament)}>
                                                  {tournament.name} - {tournament.year}
                                              </option>
                                          ))}
                                      </select>
                                  </div>
                                  {renderStatusMessageAndLinks()}
                              </form>
                          ) : (
                              <p>No tournaments available.</p>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default TournamentPage;