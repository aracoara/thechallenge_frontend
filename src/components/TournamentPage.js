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
            // const response = await axios.get('https://solino.pythonanywhere.com/tournaments');
            const response = await axios.get('http://localhost:5000/tournaments');

            setTournaments(response.data);
            console.log('Tournaments loaded:', response.data);
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
      // switch (selectedTournament.status) {
      //   case "Open":
      //     message = "Picks submission is open.";
      //     links.push({ text: "Make your predictions on the Picks Page", href: "/picks" });
      //     break;
      //   case "On Progress":
      //     message = "The tournament is in progress.";
      //     links.push({ text: "Compare your guess with the other members", href: "/picks-overview" });
      //     links.push({ text: "Follow your performance on the Leaderboard Page", href: "/leaderboard" });
      //     break;
      //   case "Closed":
      //     message = "Tournament closed.";
      //     break;
      //   default:
      //     message = "Status unknown.";
      //     break;
      // }

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
      // return (
      //   <Container className="text-center mt-3">
      //     <Row>
      //       <Col>
      //         <Alert variant="info">{message}</Alert>
      //         {links.map((link, index) => (
      //           <Button key={index} variant="primary" href={link.href} className="m-2" target="_blank">
      //             {link.text}
      //           </Button>
      //         ))}
      //         {selectedTournament.status !== "Closed" && selectedTournament.whatsapp_paths && (
      //           <>
      //             <p>Hi, {authData.username}, enter the tournament's exclusive WhatsApp group!</p>
      //             <Button href={selectedTournament.whatsapp_paths} variant="success" target="_blank">
      //               Access WhatsApp Group {selectedTournament.short_name} {selectedTournament.year}
      //             </Button>
      //           </>
      //         )}
      //       </Col>
      //     </Row>
      //   </Container>
      // );
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


    // const renderStatusMessageAndLinks = () => {
    //     if (!selectedTournament) return null;

    //     let message;
    //     let links = [];
    //     switch (selectedTournament.status) {
    //         case "Open":
    //             message = "Picks submission is open.";
    //             links.push({ text: "Faça os seus palpites na Página Picks", href: "/picks" });
    //             break;
    //         case "On Progress":
    //             message = "The tournament is in progress.";
    //             links.push({ text: "Compare o seu palpite com os demais participantes", href: "/picks-overview" });
    //             links.push({ text: "Acompanhe o seu desempenho na Página Leaderboard", href: "/leaderboard" });
    //             break;
    //         case "Closed":
    //             message = "Tournament closed.";
    //             break;
    //         default:
    //             message = "Status unknown.";
    //             break;
    //     }

    //     return (
    //         <>
    //             <div className="alert alert-info mt-3" role="alert">
    //                 {message}
    //             </div>
    //             {links.map((link, index) => (
    //                 <div key={index} className="mt-3 text-center">
    //                     <a href={link.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
    //                         {link.text}
    //                     </a>
    //                 </div>
    //             ))}
    //             {selectedTournament.status !== "Closed" && selectedTournament.whatsapp_paths && (
    //                 <div className="mt-3 text-center">
    //                     <p>Hi, {authData.username}, enter the tournament's exclusive WhatsApp group!</p>
    //                     <a href={selectedTournament.whatsapp_paths} className="btn btn-success" target="_blank" rel="noopener noreferrer">
    //                         Access WhatsApp Group {selectedTournament.short_name} {selectedTournament.year}
    //                     </a>
    //                 </div>
    //             )}
    //         </>
    //     );
    // };


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
// import { useTournament } from './TournamentContext'; // Ajuste o caminho conforme necessário

// const TournamentPage = () => {
//     const { authData } = useAuth();
//     const { selectTournament } = useTournament();
//     const [tournaments, setTournaments] = useState([]);
//     const [selectedTournament, setSelectedTournament] = useState(null);

//     const fetchTournaments = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/tournaments');
//             setTournaments(response.data);
//             console.log('Tournaments loaded:', response.data);
//         } catch (error) {
//             console.error('Error loading tournaments:', error);
//         }
//     };

//     const handleSelectTournament = (e) => {
//         try {
//             const selectedTournament = JSON.parse(e.target.value);
//             console.log('Tournament selected:', selectedTournament);
//             setSelectedTournament(selectedTournament);
//             selectTournament(selectedTournament);
//         } catch (error) {
//             console.error('Error selecting tournament:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTournaments();
//     }, []);

//     if (!authData) {
//         return <div>You need to be logged in to access this page.</div>;
//     }

//     const renderStatusMessageAndWhatsAppLink = () => {
//         if (!selectedTournament) return null;

//         let message;
//         switch (selectedTournament.status) {
//             case "Open":
//                 message = "Picks submission is open.";
//                 break;
//             case "On Progress":
//                 message = "The tournament is in progress.";
//                 break;
//             case "Closed":
//                 message = "Tournament closed.";
//                 break;
//             default:
//                 message = "";
//         }

//         return (
//             <>
//                 <div className="alert alert-info mt-3" role="alert">
//                     {message}
//                 </div>
//                 {selectedTournament.status !== "Closed" && selectedTournament.whatsapp_paths && (
//                     <div className="mt-3 text-center">
//                         <p>Join the tournament's exclusive WhatsApp group!</p>
//                         <a href={selectedTournament.whatsapp_paths} className="btn btn-success" target="_blank" rel="noopener noreferrer">
//                             Access WhatsApp Group {selectedTournament.short_name} {selectedTournament.year}
//                         </a>
//                     </div>
//                 )}
//             </>
//         );
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <h5 className="card-header">Select a Tournament</h5>
//                         <div className="card-body">
//                             {tournaments.length ? (
//                                 <form>
//                                     <div className="mb-3">
//                                         <label htmlFor="tournamentSelect" className="form-label">Tournament:</label>
//                                         <select
//                                             id="tournamentSelect"
//                                             className="form-select"
//                                             onChange={handleSelectTournament}
//                                         >
//                                             <option>Select a tournament</option>
//                                             {tournaments.map((tournament) => (
//                                                 <option key={tournament.id} value={JSON.stringify(tournament)}>
//                                                     {tournament.name} - {tournament.year}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     {renderStatusMessageAndWhatsAppLink()}
//                                 </form>
//                             ) : (
//                                 <p>No tournaments available.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TournamentPage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
// import { useTournament } from './TournamentContext'; // Ajuste o caminho conforme necessário

// const UserPage = () => {
//     const { authData } = useAuth();
//     const { selectTournament } = useTournament();
//     const [tournaments, setTournaments] = useState([]);
//     const [selectedTournament, setSelectedTournament] = useState(null); // Estado adicional para armazenar o torneio selecionado

//     const fetchTournaments = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/tournaments');
//             setTournaments(response.data);
//             console.log('Torneios carregados:', response.data); // Log para verificar os torneios carregados
//         } catch (error) {
//             console.error('Erro ao carregar torneios:', error);
//         }
//     };

//     const handleSelectTournament = (e) => {
//         try {
//             const selectedTournament = JSON.parse(e.target.value);
//             console.log('Torneio selecionado:', selectedTournament); // Log para verificar o torneio selecionado
//             setSelectedTournament(selectedTournament); // Atualiza o estado com o torneio selecionado
//             selectTournament({
//                 ...selectedTournament,
//                 whatsapp: selectedTournament.whatsapp_paths, // Corrige a propriedade para usar whatsapp_paths
//             });
//         } catch (error) {
//             console.error('Erro ao selecionar torneio:', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchTournaments();
//     }, []);

//     if (!authData) {
//         return <div>Você precisa estar logado para acessar esta página.</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <h5 className="card-header">Selecione um Torneio</h5>
//                         <div className="card-body">
//                             {tournaments.length ? (
//                                 <form>
//                                     <div className="mb-3">
//                                         <label htmlFor="tournamentSelect" className="form-label">Torneio:</label>
//                                         <select
//                                             id="tournamentSelect"
//                                             className="form-select"
//                                             onChange={handleSelectTournament}
//                                             aria-label="Selecione um torneio"
//                                         >
//                                             <option>Selecione um torneio</option>
//                                             {tournaments.map((tournament) => (
//                                                 <option key={tournament.id} value={JSON.stringify(tournament)}>
//                                                     {tournament.name} - {tournament.year}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     {selectedTournament && selectedTournament.whatsapp_paths && (
//                                       <div className="mt-3 text-center">
//                                           <p>Entre no grupo de Whatsapp exclusivo do torneio!</p>
//                                           <div className="d-flex justify-content-center">
//                                             <a href={selectedTournament.whatsapp_paths} className="btn btn-success" target="_blank" rel="noopener noreferrer">
//                                             Acessar Grupo do WhatsApp {selectedTournament.short_name} {selectedTournament.year}
//                                           </a>
//                                       </div>
//                                       </div>
//                                     )}
//                                 </form>
//                             ) : (
//                                 <p>Nenhum torneio disponível.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
// import { useTournament } from './TournamentContext'; // Ajuste o caminho conforme necessário

// const UserPage = () => {
//     const { authData } = useAuth();
//     const { selectTournament } = useTournament();
//     const [tournaments, setTournaments] = useState([]);
//     // const [players, setPlayers] = useState([]);
//     // const [selectedPlayer, setSelectedPlayer] = useState(null); // Novo estado para o jogador selecionado

//     const fetchTournaments = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/tournaments');
//             setTournaments(response.data);
//             console.log('Carregar dados dos torneios na Página do Participante',response.data);
//         } catch (error) {
//             console.error('Erro ao carregar torneios:', error);
//         }
//     };

//     const handleSelectTournament = (e) => {
//         try {
//             const selectedTournament = JSON.parse(e.target.value);
//             console.log('Torneio selecionado:', selectedTournament); // Verifique se o 'id' está presente aqui
//             selectTournament({
//                 id: selectedTournament.id,
//                 name: selectedTournament.name,
//                 short_name: selectedTournament.short_name,
//                 year: selectedTournament.year,
//                 status: selectedTournament.status,
//                 pdfPath: selectedTournament.pdfPath,
//                 whatsapp: selectedTournament.whatsapp,
//             });
//         } catch (error) {
//             console.error('Erro ao selecionar torneio:', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchTournaments();
//     }, []);

//   // Verifica se o usuário está autenticado
//     if (!authData) {
//         return <div>Você precisa estar logado para acessar esta página.</div>;
//     }

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <h5 className="card-header">Selecione um Torneio</h5>
//             <div className="card-body">
//               {tournaments.length ? (
//                 <form>
//                   <div className="mb-3">
//                     <label htmlFor="tournamentSelect" className="form-label">Torneio:</label>
//                     <select
//                       id="tournamentSelect"
//                       className="form-select"
//                       onChange={handleSelectTournament}
//                       aria-label="Selecione um torneio"
//                     >
//                       <option>Selecione um torneio</option>
//                       {tournaments.map((tournament) => (
//                         <option key={tournament.id} value={JSON.stringify(tournament)}>
//                             {tournament.name} - {tournament.year}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </form>
//               ) : (
//                 <p>Nenhum torneio disponível.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default UserPage;