import React, { useState, useEffect  } from 'react';
import { useTournament } from './TournamentContext'; // Certifique-se de que o caminho está correto
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext'; 
import './Picks.css';
import axios from 'axios';

const Picks = () => {
  const { authData } = useAuth();
  // console.log("ID do Participante: ", authData.user_id);
  const [players, setPlayers] = useState({});
  const [selections, setSelections] = useState({
      QF1: '', QF2: '', QF3: '', QF4: '',
      QF5: '', QF6: '', QF7: '', QF8: '',
      SF1: '', SF2: '', SF3: '', SF4: '',
      F1: '', F2: '',
      Champion: ''
    });

  const {  tournament } = useTournament();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Para armazenar a mensagem de erro
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Para controlar a visibilidade da mensagem de erro


  // Pegar os jogadores do torneio
  useEffect(() => {
    // Verifica se temos informações válidas do torneio para fazer a chamada à API
    if (tournament.short_name && tournament.year) {
      // axios.get(`https://solino.pythonanywhere.com/players/${tournament.short_name}/${tournament.year}`)
      axios.get(`http://127.0.0.1:5000/players/${tournament.short_name}/${tournament.year}`)

        .then(response => {
          // Assumindo que queremos formatar os dados dos jogadores de uma forma específica
          const formattedData = response.data.reduce((acc, player) => {
            acc[player.id] = player;
            return acc;
          }, {});
          setPlayers(formattedData);
        })
        .catch(error => {
          console.error(`Error fetching players for ${tournament.short_name} ${tournament.year}:`, error);
        });
    } else {
      console.log("Tournament information not available to fetch players.");
    }
  }, [tournament]);
    
  const handleInputChangeQF = (event) => {
    const { name, value } = event.target;
    console.log(`QF Selection updated. ${name} = ${value}`); 
    setSelections(prev => ({ ...prev, [name]: value }));
  };

  const renderSelectorOptionsQF = (qfNumber) => {
      const qfNum = parseInt(qfNumber);
      const filteredPlayers = Object.values(players).filter(player => player.qf_number === qfNum);

      return (
          <>
              {/* <option value="">Selecione um Jogador</option> */}
              {filteredPlayers.map(player => {
                  // Formata a string do jogador com seed, country e name, quando disponíveis
                  const playerString = `${player.seed ? player.seed + ' ' : ''}${player.country ? `[${player.country}] ` : ''}${player.name}`;
                  return (
                      <option key={player.id} value={player.id}>{playerString}</option>
                  );
              })}
          </>
      );
  };
        
    // Função para lidar com mudanças nas seleções de SF
  const handleInputChangeSF = (event) => {
      const { name, value } = event.target;
      console.log(`SF Selection updated. ${name} = ${value}`); 
      setSelections(prev => ({ ...prev, [name]: value }));
    };

            // Função para renderizar opções de seleção para QF

  const renderSelectorOptionsSF = (sfPosition) => {
      // Mapeamento dos QFs para os SFs
      const qfToSfMapping = {
          'SF1': ['QF1', 'QF2'],
          'SF2': ['QF3', 'QF4'],
          'SF3': ['QF5', 'QF6'],
          'SF4': ['QF7', 'QF8']
      };
  
      // Obtenha os IDs dos jogadores selecionados para as QFs relacionadas
      const eligiblePlayerIds = qfToSfMapping[sfPosition]
          .map(qf => selections[qf]) // Pode ser undefined se selections não estiver inicializado corretamente
          .filter(id => id); // Filtra IDs vazios ou nulos
  
      // Considerando que players é um objeto, transforme-o em array antes de filtrar
      const playersArray = Object.values(players);
  
      // Filtra os jogadores da lista de jogadores usando os IDs elegíveis
      const filteredPlayers = playersArray.filter(player => eligiblePlayerIds.includes(player.id.toString()));
  
      // Retorna as opções de jogadores filtrados para serem exibidos no seletor de SF
      return (
          <>
              {/* <option value="">Selecione um Jogador</option> */}
              {filteredPlayers.map(player => {
                  // Formata a string do jogador com seed, country e name, quando disponíveis
                  const playerString = `${player.seed ? player.seed + ' ' : ''}${player.country ? `[${player.country}] ` : ''}${player.name}`;
                  return (
                      <option key={player.id} value={player.id}>{playerString}</option>
                  );
              })}
          </>
      );
  };
    
  const handleInputChangeF = (event) => {
    const { name, value } = event.target;
    console.log(`Final Selection updated. ${name} = ${value}`); 
    setSelections(prev => ({ ...prev, [name]: value }));
  };

  const renderSelectorOptionsF = (fPosition) => {
      // Mapeamento dos SFs para os Fs
      const sfToFMapping = {
          'F1': ['SF1', 'SF2'],
          'F2': ['SF3', 'SF4'],
      };
  
      // Obtenha os IDs dos jogadores selecionados para os SFs relacionados
      const eligiblePlayerIds = sfToFMapping[fPosition]
          .map(sf => selections[sf]) // Pode ser undefined se não houver seleção
          .filter(id => id); // Filtra IDs vazios ou nulos
  
      // Utiliza o objeto 'players' diretamente para encontrar os jogadores selecionados
      const options = eligiblePlayerIds.map(id => players[id]);
  
      return (
          <>
              {/* <option value="">Selecione o Jogador</option> */}
              {options.map(option => 
                  option && <option key={option.id} value={option.id}>
                      {`${option.seed ? option.seed + ' ' : ''}${option.country ? `[${option.country}] ` : ''}${option.name}`}
                  </option>
              )}
          </>
      );
  };
    
  const handleInputChangeChampion = (event) => {
    const { name, value } = event.target;
    console.log(`Champion selection updated. ${name} = ${value}`); 
    setSelections(prev => ({ ...prev, [name]: value }));
  };

  const renderSelectorOptionsChampion = () => {
      // Os jogadores elegíveis para campeão são os vencedores de F1 e F2
      const playerArray = Object.values(players); // Transforma o objeto 'players' em um array
  
      const options = ['F1', 'F2'].map(f => selections[f]) // Obtém os IDs dos vencedores das finais
          .filter(id => id !== '') // Filtra IDs não vazios
          .map(id => playerArray.find(player => player.id === parseInt(id))); // Encontra os jogadores selecionados
  
      return (
          <>
              {/* <option value="">Selecione o Campeão</option> */}
              {options.map(option => option && (
                  <option key={option.id} value={option.id}>
                      {`${option.seed ? option.seed + ' ' : ''}${option.country ? `[${option.country}] ` : ''}${option.name}`}
                  </option>
              ))}
          </>
      );
  };
  
  const generateOutputData = (selections, userData, tournamentData) => {
    // Certifique-se de que userData e tournamentData não são nulos
    if (!userData || !tournamentData) {
      console.error('User or tournament data is missing.');
      return null;
    }
  
    return {
      quartasFinal: {
        QF1: selections.QF1, QF2: selections.QF2, QF3: selections.QF3, QF4: selections.QF4,
        QF5: selections.QF5, QF6: selections.QF6, QF7: selections.QF7, QF8: selections.QF8
      },
      semiFinal: {
        SF1: selections.SF1, SF2: selections.SF2, SF3: selections.SF3, SF4: selections.SF4
      },
      final: {
        F1: selections.F1, F2: selections.F2
      },
      campeao: selections.Champion,
      user_id: userData.user_id, // Apenas use userData.user_id aqui
      tournament_id: tournamentData.id
    };
  };
  
  const outputData = generateOutputData(selections, authData, tournament);
  console.log("Expected Output:", outputData);
  

  const allSelectionsMade = (outputData) => {
    // Verifica se todas as seleções foram feitas, incluindo o campeão
    return (
      Object.values(outputData.quartasFinal).every(selection => selection) &&
      Object.values(outputData.semiFinal).every(selection => selection) &&
      Object.values(outputData.final).every(selection => selection) &&
      outputData.campeao
    );
  };  


  const sendPicksToServer = async (outputData) => {
    try {
      // const response = await fetch(`https://solino.pythonanywhere.com/submit_picks_tournaments/${tournament.short_name}/${tournament.year}`, {
      const response = await fetch(`http://localhost:5000/submit_picks_tournaments/${tournament.short_name}/${tournament.year}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outputData)
        // body: JSON.stringify({
        //   quartasFinal: { QF1: "2", QF2: "18", QF3: "33", QF4: "49", QF5: "65", QF6: "79", QF7: "104", QF8: "119" },
        //   semiFinal: { SF1: "2", SF2: "49", SF3: "79", SF4: "104" },
        //   final: { F1: "2", F2: "79" },
        //   campeao: "79",
        //   user_id: 36,
        //   tournament_id: 1  })            
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Picks submitted successfully.", responseData);
        
        // Atualiza o estado para indicar o sucesso do envio
        setIsSubmitSuccessful(true);
        
        // Reset selections
        setSelections({
          QF1: '', QF2: '', QF3: '', QF4: '',
          QF5: '', QF6: '', QF7: '', QF8: '',
          SF1: '', SF2: '', SF3: '', SF4: '',
          F1: '', F2: '',
          Champion: ''
        });
  
        // Opcionalmente, esconde a mensagem de sucesso após X segundos
        setTimeout(() => {
          setIsSubmitSuccessful(false);
        }, 5000); // Ajuste o tempo conforme necessário
  
      } else {
        const errorData = await response.json();
        console.error("Error sending picks:", errorData);
        setIsSubmitSuccessful(false);
      }
      } catch (error) {
        console.error("Request failed:", error);
        setIsSubmitSuccessful(false);
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevenir o comportamento padrão de submit de formulário
      if (!authData) {
        console.error('User not authenticated.');
        setErrorMessage('You need to be authenticated to submit your picks.'); // Define a mensagem de erro
        setShowErrorMessage(true); // Mostra a mensagem de erro
        return;
      }
      const outputData = generateOutputData(selections, authData, tournament);
      if (!outputData) {
        setErrorMessage('Error generating data for submission. Please try again.'); // Define a mensagem de erro
        setShowErrorMessage(true); // Mostra a mensagem de erro
        return;
      }
      if (allSelectionsMade(outputData)) {
        await sendPicksToServer(outputData);
        setShowErrorMessage(false); // Esconde a mensagem de erro após o envio bem-sucedido
      } else {
        setErrorMessage('Please complete all selections before submitting.'); // Define a mensagem de erro para seleções incompletas
        setShowErrorMessage(true); // Mostra a mensagem de erro
      }
    };
    
  
  // Se não houver dados de autenticação, podemos escolher não renderizar o componente ou renderizar um estado alternativo.
  if (!authData) {
    console.log("User not authenticated.");
    // Retorna null ou um componente de "não autenticado"
    return null; // Ou return <ComponenteNaoAutenticado />;
  }

  console.log("Participant ID:", authData.user_id);  

  return (
    <Container fluid="lg" className="my-4">
      <Form >
        <h1 className="text-center">{tournament.name} {tournament.year}</h1>
          <Row className="justify-content-center">
          <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Quarterfinals</h2>
              <div className="game-pair">
                <div className="game">
                  <Form.Control as="select" name="QF1" value={selections.QF1} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('1')}
                  </Form.Control>
                </div>
                <div className="connector"></div> 
                <div className="game">
                  <Form.Control as="select" name="QF2" value={selections.QF2} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('2')}
                  </Form.Control>
                </div>
              </div>
              <div className="game-pair">
                <div className="game">
                  <Form.Control as="select" name="QF3" value={selections.QF3} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('3')}
                  </Form.Control>
                </div>
                <div className="connector"></div> {/* Linha de conexão para SF */}
                <div className="game">
                  <Form.Control as="select" name="QF4" value={selections.QF4} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('4')}
                  </Form.Control>
                </div>
              </div>
              <div className="game-pair">
                <div className="game">
                  <Form.Control as="select" name="QF5" value={selections.QF5} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('5')}
                  </Form.Control>
                </div>
                <div className="connector"></div> {/* Linha de conexão para SF */}
                <div className="game">
                  <Form.Control as="select" name="QF6" value={selections.QF6} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('6')}
                  </Form.Control>
                </div>
              </div>
              <div className="game-pair">
                <div className="game">
                  <Form.Control as="select" name="QF7" value={selections.QF7} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('7')}
                  </Form.Control>
                </div>
                <div className="connector"></div> {/* Linha de conexão para SF */}
                <div className="game">
                  <Form.Control as="select" name="QF8" value={selections.QF8} onChange={handleInputChangeQF}>
                    <option value="">Select Player</option>
                    {renderSelectorOptionsQF('8')}
                  </Form.Control>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Semifinal</h2>
                <div className="game-pair-SF">
                  <div className="game">
                  <Form.Control as="select"  name="SF1" value={selections.SF1} onChange={handleInputChangeSF}><option value="">Select Player</option>
                      {renderSelectorOptionsSF('SF1')}</Form.Control></div>
                  <div className="game">
                  <Form.Control as="select"  name="SF2" value={selections.SF2} onChange={handleInputChangeSF}><option value="">Select Player</option>
                      {renderSelectorOptionsSF('SF2')}</Form.Control></div>
                </div>
                  <div className="connector"></div> {/* Linha de conexão para SF */}
                  <div className="game-pair">
                      <div className="game">
                      <Form.Control as="select"  name="SF3" value={selections.SF3} onChange={handleInputChangeSF}><option value="">Select Player</option>
                          {renderSelectorOptionsSF('SF3')}</Form.Control></div>
                      <div className="game">
                      <Form.Control as="select"  name="SF4" value={selections.SF4} onChange={handleInputChangeSF}><option value="">Select Player</option>
                          {renderSelectorOptionsSF('SF4')}</Form.Control></div>
                  </div>
            </Col>

            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Final</h2>
              <div className="game-pair-F">
                  <div className="game">
                  <Form.Control as="select" name="F1" value={selections.F1} onChange={handleInputChangeF}><option value="">Select Player</option>
                      {renderSelectorOptionsF('F1')}</Form.Control></div>
                      <div className="game">
                  <Form.Control as="select" name="F2" value={selections.F2} onChange={handleInputChangeF}><option value="">Select Player</option>
                      {renderSelectorOptionsF('F2')}</Form.Control></div>
              </div>
            </Col>

            <Col xs={12} md={3} className="tournament-column mb-4">
              <h2 className="text-center">Champion</h2>
                  <div className="game-champion">
                  <Form.Control as="select" name="Champion" value={selections.Champion} onChange={handleInputChangeChampion}><option value="">Select Player</option>
                      {renderSelectorOptionsChampion()}</Form.Control></div>
                  <div className="submit-container text-center mt-3"><button type="submit" onClick={handleSubmit}>Submit Picks!</button></div>
                  
                  {/* <div className="full-draw-container text-center mt-3"><a href="./AO24_v2.pdf" className="full-draw-link">FULL DRAW</a></div>
                   */}
                  {isSubmitSuccessful && (
                    <div className="alert alert-success" role="alert">
                      Picks submitted successfully!
                    </div>
                  )}
                  {showErrorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="full-draw-container text-center mt-3">
                    {tournament.pdfPath && (
                      <a href={tournament.pdfPath} target="_blank" rel="noopener noreferrer" className="full-draw-link">FULL DRAW</a>
                    )}
                  </div> 
            </Col>  
          </Row>
      </Form>
    </Container>
  );
};


export default Picks;

  // const generateOutputData = (selections, userData, tournamentData) => {
  //   // Verifica se todas as seleções foram feitas, incluindo o campeão
  //   if (!allSelectionsMade(selections)) {
  //     console.error("Por favor, complete todas as seleções antes de enviar.");
  //     return null; // Retorna null para indicar que as seleções não estão completas
  //   }
  //   // Retorna um objeto com as seleções e os IDs do usuário e do torneio
  //   return {
  //     quartasFinal: {
  //       QF1: selections.QF1, QF2: selections.QF2, QF3: selections.QF3, QF4: selections.QF4,
  //       QF5: selections.QF5, QF6: selections.QF6, QF7: selections.QF7, QF8: selections.QF8
  //     },
  //     semiFinal: {
  //       SF1: selections.SF1, SF2: selections.SF2, SF3: selections.SF3, SF4: selections.SF4
  //     },
  //     final: {
  //       F1: selections.F1, F2: selections.F2
  //     },
  //     campeao: selections.Champion,
  //     user_id: userData.user_id,
  //     tournament_id: tournamentData ? tournamentData.id : null
  //   };
  // };

  // const outputData = generateOutputData(selections, authData, tournament);
  // console.log("OutputEsperado:", outputData);  

  // useEffect(() => {
  //   const savedTournament = localStorage.getItem('selectedTournament');
  //   if (savedTournament) {
  //       const tournamentData = JSON.parse(savedTournament);
  //       console.log("Carregando torneio do localStorage em Picks:", tournamentData);
  //       // Você pode usar tournamentData.id onde você precisar do ID do torneio
  //   }
  // }, []);

  // // Substitua o fluxo de envio por esta função integrada
  // const sendPicksToServer = async () => {
  //   const selectionsComplete = Object.values(selections).every(selection => selection);
    
  //   if (!selectionsComplete || !authData?.user_id) {
  //     console.error("Por favor, complete todas as seleções antes de enviar.");
  //     return;
  //   }

  //   const picksData = {
  //     quartasFinal: {},
  //     semiFinal: {},
  //     final: {},
  //     campeao: selections['Champion'],
  //     user_id: authData.user_id
  //   };

  //   // Preenchimento dos dados de picksData
  //   Object.keys(selections).forEach(key => {
  //     if (key.startsWith("QF")) picksData.quartasFinal[key] = selections[key];
  //     else if (key.startsWith("SF")) picksData.semiFinal[key] = selections[key];
  //     else if (key.startsWith("F")) picksData.final[key] = selections[key];
  //     // Champ já está atribuído
  //   });

  //   // Envio de picksData para o servidor
  //   try {
  //     const response = await fetch('http://localhost:5000/submit_picks_tournaments/AO/2024', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       // body: JSON.stringify(picksData)
  //       body: JSON.stringify({
  //         quartasFinal: { QF1: "2", QF2: "18", QF3: "33", QF4: "49", QF5: "65", QF6: "79", QF7: "104", QF8: "119" },
  //         semiFinal: { SF1: "2", SF2: "49", SF3: "79", SF4: "104" },
  //         final: { F1: "2", F2: "104" },
  //         campeao: "2",
  //         user_id: 36,
  //         tournament_id: 1  })    
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Picks enviados com sucesso:", responseData);
  //     } else {
  //       console.error("Erro ao enviar picks.");
  //     }
  //   } catch (error) {
  //     console.error("Falha na requisição:", error);
  //   }
  // };

    // const handleButtonClick = () => {
  //   const outputData = generateOutputData(selections, authData, tournament);
  //   if (outputData) {
  //     sendPicksToServer(outputData);
  //   }
  // };
  
  // useEffect(() => {
  //   if (authData) { // Garante que authData não é null antes de proceder
  //     const outputData = generateOutputData(selections, authData, tournament);
  //     if (outputData && allSelectionsMade(outputData)) {
  //       sendPicksToServer(outputData);
  //     }
  //   }
  // }, [selections, authData, tournament]);