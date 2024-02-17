import React, { useState, useEffect  } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Picks.css';
import { useAuth } from './AuthContext'; // Ajuste o caminho de importação conforme necessário


const Tournament = () => {
    const [players, setPlayers] = useState({});
    const [selections, setSelections] = useState({
        QF1: '', QF2: '', QF3: '', QF4: '',
        QF5: '', QF6: '', QF7: '', QF8: '',
        SF1: '', SF2: '', SF3: '', SF4: '',
        F1: '', F2: '',
        Champ: ''
      });
    
      // Função para buscar e processar dados dos jogadores
    useEffect(() => {
    fetch('http://127.0.0.1:5000/players')
        .then(response => response.json())
        .then(data => {
        const formattedData = data.reduce((acc, player) => {
            acc[player.id] = player;
            return acc;
        }, {});
        setPlayers(formattedData);
        })
        .catch(error => {
        console.error('Erro ao buscar jogadores:', error);
        });
    }, []);

  const handleInputChangeQF = (event) => {
    const { name, value } = event.target;
    // console.log(`Seleção QF atualizada: ${name} = ${value}`); 
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
        // console.log(`Seleção SF atualizada: ${name} = ${value}`); 
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
        // console.log(`Seleção Final atualizada: ${name} = ${value}`); 
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
        // console.log(`Seleção do Campeão atualizada: ${name} = ${value}`); 
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
  
  // Chama generatePicksData passando as seleções como argumento
  const { authData } = useAuth();

function generatePicksData(selections) {
  const picksData = {
    quartasFinal: {},
    semiFinal: {},
    final: {},
    campeao: selections['Champion'],
    user_id: authData ? authData.user_id : null // Adiciona user_id somente se authData não for null
  };

  // Preencher dados para Quartas de Final, Semifinal e Final
  for (let i = 1; i <= 8; i++) {
    picksData.quartasFinal[`QF${i}`] = selections[`QF${i}`];
  }
  for (let i = 1; i <= 4; i++) {
    picksData.semiFinal[`SF${i}`] = selections[`SF${i}`];
  }
  for (let i = 1; i <= 2; i++) {
    picksData.final[`F${i}`] = selections[`F${i}`];
  }

  return picksData;
}

let picksData = generatePicksData(selections);

// Variável para verificar se todas as seleções foram feitas.
let selectionsComplete = allSelectionsMade(picksData);

console.log("Seleções completas:", selectionsComplete);
console.log("Picks Final:", picksData);

function allSelectionsMade(picksData) {
  // Verifica se a seleção para 'campeao' foi feita
  if (!picksData.campeao) {
    return false;
  }

  // Verifica se as seleções para as 'quartasFinal' foram feitas
  for (let i = 1; i <= 8; i++) {
    if (!picksData.quartasFinal[`QF${i}`]) {
      return false;
    }
  }

  // Verifica se as seleções para as 'semiFinal' foram feitas
  for (let i = 1; i <= 4; i++) {
    if (!picksData.semiFinal[`SF${i}`]) {
      return false;
    }
  }

  // Verifica se as seleções para a 'final' foram feitas
  for (let i = 1; i <= 2; i++) {
    if (!picksData.final[`F${i}`]) {
      return false;
    }
  }

  // Se todas as verificações passaram, todas as seleções foram feitas
  return true;
}


async function sendPicksToServer(picksData) {
  // Verifica se o usuário está autenticado e se o picksData foi gerado corretamente
  if (authData?.user_id && picksData) {
    try {
      const response = await fetch('http://localhost:5000/submit_picks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(picksData),
      });

      if (response.ok) {
        // Se a resposta do servidor for bem-sucedida, processa a resposta
        const responseData = await response.json();
        console.log("Picks enviados com sucesso:", responseData);
        // Aqui você pode implementar a lógica após o envio bem-sucedido, como redirecionar o usuário ou mostrar uma mensagem de confirmação
      } else {
        // Se houver algum problema com a resposta do servidor, exibe um erro
        const errorData = await response.json();
        console.error("Erro ao enviar picks:", errorData);
      }
    } catch (error) {
      // Se houver algum problema na requisição, exibe um erro no console
      console.error("Falha na requisição:", error);
    }
  } else {
    // Se o usuário não estiver autenticado ou os dados de picks estiverem incompletos, exibe um erro no console
    console.error("Usuário não autenticado ou dados de picks incompletos.");
  }
}

// Verifica se todas as seleções foram feitas antes de enviar os dados
if (allSelectionsMade(picksData)) {
  // Envia os dados para o servidor
  sendPicksToServer(picksData);
} else {
  console.error("Por favor, complete todas as seleções antes de enviar.");
}

  return (
    <Container fluid="lg" className="my-4">
      <Form >
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
              <div className="connector"></div> {/* Linha de conexão para SF */}
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
                <div className="submit-container text-center mt-3"><button onClick={sendPicksToServer}>Submit Picks</button></div>
                <div className="full-draw-container text-center mt-3"><a href="./AO24_v2.pdf" className="full-draw-link">FULL DRAW</a></div>
          </Col>  
        </Row>
      </Form>
    </Container>
  );
};


export default Tournament;
