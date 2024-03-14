import React, { useState, useEffect } from 'react';
import { useTournament } from './TournamentContext';
import { useAuth } from './AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './UserPage.css';

const UserPage = () => {
  const { authData } = useAuth();
  const { tournament } = useTournament();
  const [userPicks, setUserPicks] = useState(null);
  const [UserClassifiedPlayers, setUserClassifiedPicks] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authData || !authData.username) {
      console.log("User not authenticated or username is missing.");
      setUserPicks(null);
      setUserClassifiedPicks(null); // Ajustado para também limpar os jogadores classificados
      setIsLoading(false);
      return;
    }

    const fetchUserPicks = async () => {
      setIsLoading(true);
      try {
        // const response = await axios.get(`https://solino.pythonanywhere.com/PicksOverview/${tournament.short_name}/${tournament.year}`);
        const response = await axios.get(`http://127.0.0.1:5000/PicksOverview/${tournament.short_name}/${tournament.year}`);
        const userPick = response.data.find(pick => pick.User === authData.username);

        setUserPicks(userPick || null); // Usando || null para garantir um valor nulo explícito caso não encontre o palpite
      } catch (error) {
        console.error('Error fetching user picks:', error);
        if (error.code === 'ERR_NETWORK') {
          setErrorMessage('Erro de rede. Verifique sua conexão com a internet e tente novamente.');
        } else {
          setErrorMessage('Falha ao carregar palpites');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchClassifiedPlayers = async () => {
      try {
        // const response = await axios.get(`https://solino.pythonanywhere.com/classified-players/${tournament.short_name}/${tournament.year}`);
        const response = await axios.get(`http://127.0.0.1:5000/classified-players/${tournament.short_name}/${tournament.year}`);
        setUserClassifiedPicks(response.data || null); // Preparado para lidar com valores nulos ou indefinidos
      } catch (error) {
        console.error('Erro ao buscar jogadores classificados:', error);
        // Não atualizar errorMessage para não sobrescrever erros de fetchUserPicks potencialmente mais críticos
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPicks();
    fetchClassifiedPlayers(); // Chamando de forma independente para garantir que ambos os fetches ocorram
  }, [authData, tournament]);
  
  // A renderização continua igual.

  function determineClass(userPick, classifiedPlayer) {
    console.log(`User Pick: ${userPick}, Classified Player: ${classifiedPlayer}`);
  
    // Tratando null e undefined de forma semelhante para não aplicar formatação
    if (classifiedPlayer === null || classifiedPlayer === undefined) {
      console.log('No classified players or status is undefined, no class applied.');
      return '';
    } else if (userPick === classifiedPlayer) {
      console.log('Success class applied.');
      return 'text-success';
    } else if (userPick !== null && userPick !== undefined) {
      console.log('Failure class applied because user pick is different from classified player.');
      return 'text-danger';
    } else {
      console.log('Unexpected case, no class applied.');
      return '';
    }
  }
  
  
  
  return (
    <Container fluid="lg" className="my-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : userPicks ? (
        <>
        <h1 className="text-center">{authData?.username ?? 'User'}'s picks for {tournament.name} {tournament.year}</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Quarterfinals</h2>
              <div className="game-pair">
                <div className="game">
                <div className={determineClass(userPicks?.QF1, UserClassifiedPlayers?.QF1)}>
                  {userPicks?.QF1 ?? "Not selected"}
                </div>
                </div>
                <div className="connector"></div>
                <div className="game">
                <div className={determineClass(userPicks?.QF2, UserClassifiedPlayers?.QF2)}>
                  {userPicks?.QF2 ?? "Not selected"}
                </div>
                </div>
              </div>

              <div className="game-pair">
                <div className="game">
                <div className={determineClass(userPicks?.QF3, UserClassifiedPlayers?.QF3)}>
                  {userPicks?.QF3 ?? "Not selected"}
                </div>
                </div>
                <div className="connector"></div>
                <div className="game">
                <div className={determineClass(userPicks?.QF4, UserClassifiedPlayers?.QF4)}>
                  {userPicks?.QF4 ?? "Not selected"}
                </div>
                </div>
              </div>
              <div className="game-pair">
                <div className="game">
                <div className={determineClass(userPicks?.QF5, UserClassifiedPlayers?.QF5)}>
                  {userPicks?.QF5 ?? "Not selected"}
                </div>
                </div>
                <div className="connector"></div>
                <div className="game">
                <div className={determineClass(userPicks?.QF6, UserClassifiedPlayers?.QF6)}>
                  {userPicks?.QF6 ?? "Not selected"}
                </div>
                </div>
              </div>
              <div className="game-pair">
                <div className="game">
                <div className={determineClass(userPicks?.QF7, UserClassifiedPlayers?.QF7)}>
                  {userPicks?.QF7 ?? "Not selected"}
                </div>
                </div>
                <div className="connector"></div>
                <div className="game">
                <div className={determineClass(userPicks?.QF8, UserClassifiedPlayers?.QF8)}>
                  {userPicks?.QF8 ?? "Not selected"}
                </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Semifinal</h2>
              <div className="game-pair-SF">
                <div className="game">
                <div className={determineClass(userPicks?.SF1, UserClassifiedPlayers?.SF1)}>
                  {userPicks?.SF1 ?? "Not selected"}
                </div>
                </div>
                <div className="game">
                <div className={determineClass(userPicks?.SF2, UserClassifiedPlayers?.SF2)}>
                  {userPicks?.SF2 ?? "Not selected"}
                </div>
                </div>
              </div>
              <div className="game-pair-SF">
                <div className="game">
                <div className={determineClass(userPicks?.SF3, UserClassifiedPlayers?.SF3)}>
                  {userPicks?.SF3 ?? "Not selected"}
                </div>
                </div>
                <div className="game">
                <div className={determineClass(userPicks?.SF4, UserClassifiedPlayers?.SF4)}>
                  {userPicks?.SF4 ?? "Not selected"}
                </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Final</h2>
              <div className="game-pair-F">
                <div className="game">
                <div className={determineClass(userPicks?.F1, UserClassifiedPlayers?.F1)}>
                  {userPicks?.F1 ?? "Not selected"}
                </div>
                </div>
                <div className="game">
                <div className={determineClass(userPicks?.F2, UserClassifiedPlayers?.F2)}>
                  {userPicks?.F2 ?? "Not selected"}
                </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Champion</h2>
              <div className="game-champion">
              <div className={determineClass(userPicks?.Champion, UserClassifiedPlayers?.Champion)}>
                  {userPicks?.Champion ?? "Not selected"}
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <div>No user picks found.</div>
      )}
    </Container>
  );
  

  
};

export default UserPage;
