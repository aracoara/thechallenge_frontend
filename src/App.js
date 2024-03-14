import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import AppNavbar from './components/Navbar';
import LeaderboardPage from './components/LeaderboardPage';
import PicksOverview from './components/PicksOverview';
import PicksPage from './components/PicksPage';
import LoginPage from './components/LoginPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import SignUpPage from './components/SignUpPage';
import TournamentPage from './components/TournamentPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Footer from './components/Footnote'; 
import { TournamentProvider, useTournament } from './components/TournamentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './components/UserPage';

function App() {
  return (
    <AuthProvider>
      <TournamentProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <AppNavbar />
            <div style={{ paddingTop: '90px' }}>
              <TournamentRoutes />
            </div>
            <Footer />
            </div>
        </Router>
      </TournamentProvider>
    </AuthProvider>
  );
}

const TournamentRoutes = () => {
  const { tournament } = useTournament(); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/tournament" />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/user" element={<UserPage />} />
        {tournament.status === "Open" && (
          <Route path="/picks" element={<PicksPage />} />
        )}
        {tournament.status === "On Progress" && (
          <>
            <Route path="/picks-overview" element={<PicksOverview />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </>
        )}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        <Route path="/reset_password/:token" element={<ResetPasswordPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;

// vercel --prod
// comandos para subir alterações no git
// git status
// git add .
// git commit -m "Descrever o que foi feito"
// git branch
// git checkout -b feature/html
// git push --set-upstream origin novo_frontend

// npm start
// tree /f /a




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './components/AuthContext'; // Ajuste o caminho conforme necessário
// import ResetPasswordPage from './components/ResetPasswordPage'; // Importa ResetPasswordPage
// import AppNavbar from './components/Navbar';
// import LeaderboardPage from './components/LeaderboardPage';
// import PicksOverview from './components/PicksOverview';
// import PicksPage from './components/PicksPage';
// import LoginPage from './components/LoginPage'; // Atualizado para usar o LoginPage
// import PasswordRecoveryPage from './components/PasswordRecoveryPage';
// import SignUpPage from './components/SignUpPage';
// import TournamentPage from './components/TournamentPage';
// import { TournamentProvider } from './components/TournamentContext'; 

// function App() {

//   return (
//     <AuthProvider>
//       <TournamentProvider>
//         <Router>
//           <AppNavbar />
//           <Routes>
//             <Route path="/" element={<Navigate replace to="/picks" />} />
//             <Route path="/tournament" element={<TournamentPage />} />
//             <Route path="/leaderboard" element={<LeaderboardPage />} />
//             <Route path="/picks-overview" element={<PicksOverview />} />
//             <Route path="/picks" element={<PicksPage />} />
//             <Route path="/login" element={<LoginPage />} /> {/* Atualizado para usar o LoginPage diretamente */}
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
//             <Route path="/reset_password/:token" element={<ResetPasswordPage />} />
//           </Routes>
//         </Router>
//       </TournamentProvider>

//     </AuthProvider>
//   );
// }

// export default App;



