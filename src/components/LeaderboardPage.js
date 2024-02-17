import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RankingTable from './RankingTable';
import RankingGraphs from './RankingGraphs';

const LeaderboardPage = () => {
  const [selectedRound, setSelectedRound] = useState('QF');

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  return (
    <>
      {/* <AppNavbar /> */}
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <h1 className="text-center my-4">Leaderboard</h1>
            <div className="text-center mb-4">
              <label htmlFor="roundSelector" className="mx-2">Escolha a rodada:</label>
              <select id="roundSelector" value={selectedRound} onChange={handleRoundChange}>
                <option value="R2">R2</option>
                <option value="R3">R3</option>
                <option value="R4">R4</option>
                <option value="QF">Quartas de Final</option>
                <option value="SF">Semifinal</option>
                <option value="F">Final</option>
                <option value="Champion">Campeão</option>
                {/* Adicione outras rodadas conforme necessário */}
              </select>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={6}>
            <RankingTable rodada={selectedRound} />
          </Col>
          <Col lg={6}>
            <RankingGraphs rodada={selectedRound} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LeaderboardPage;
