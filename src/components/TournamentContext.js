import React, { createContext, useState, useContext } from 'react';

const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    // Inicialização do estado a partir do localStorage
    const getInitialTournament = () => {
        const savedTournament = localStorage.getItem('selectedTournament');
        return savedTournament ? JSON.parse(savedTournament) : {
            id: null,
            short_name: '',
            year: null,
            name: '',
            status: '',
            pdfPath: '' // Incluir o caminho do PDF aqui
        };
    };

    const [tournament, setTournament] = useState(getInitialTournament);

    // Função para selecionar um torneio com validação
    const selectTournament = (newTournament) => {
        // Validação básica para verificar se os campos essenciais estão presentes
        if (!newTournament || !newTournament.id || !newTournament.name || !newTournament.pdfPath) {
            console.error('Dados do torneio inválidos:', newTournament);
            return; // Não atualiza o estado ou localStorage se os dados são inválidos
        }

        // Atualização do estado e do localStorage
        setTournament(newTournament);
        localStorage.setItem('selectedTournament', JSON.stringify(newTournament));
    };

    return (
        <TournamentContext.Provider value={{ tournament, selectTournament }}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournament = () => useContext(TournamentContext);

// import React, { createContext, useState, useContext, useEffect } from 'react';

// const TournamentContext = createContext({
//     tournament: { short_name: '', year: null },
//     selectTournament: () => {}
// });

// export const TournamentProvider = ({ children }) => {
//     const getInitialTournament = () => {
//         const savedTournament = localStorage.getItem('selectedTournament');
//         return savedTournament ? JSON.parse(savedTournament) : { 
//             id: null, 
//             short_name: '', 
//             year: null, 
//             name: '', 
//             status: '',
//             pdfPath: '' // Incluir o caminho do PDF aqui 
//         };
//     };

//     const [tournament, setTournament] = useState(getInitialTournament);

//     const selectTournament = (tournament) => {
//         setTournament(tournament);
//         localStorage.setItem('selectedTournament', JSON.stringify(tournament));
//     };
    

//     // Opcionalmente, você pode também garantir que o torneio é carregado do localStorage quando o componente é montado
//     // Isso pode ser útil se você planeja alterar o estado do torneio em diferentes partes da aplicação e quer garantir que o estado inicial seja consistente
//     useEffect(() => {
//         const savedTournament = localStorage.getItem('selectedTournament');
//         if (savedTournament) {
//           const tournamentData = JSON.parse(savedTournament);
//           console.log("Carregando torneio do localStorage:", tournamentData);
//           setTournament(tournamentData);
//         }
//       }, []);

//     // Dentro do TournamentProvider
//     useEffect(() => {
//         localStorage.setItem('selectedTournament', JSON.stringify(tournament));
//     }, [tournament]); // Atualiza o localStorage sempre que o estado do torneio mudar
  

//     return (
//         <TournamentContext.Provider value={{ tournament, selectTournament }}>
//             {children}
//         </TournamentContext.Provider>
//     );
// };

// export const useTournament = () => useContext(TournamentContext);

