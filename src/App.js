import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Ajuste o caminho conforme necessário
import ResetPasswordPage from './components/ResetPasswordPage'; // Importa ResetPasswordPage
import AppNavbar from './components/Navbar';
import LeaderboardPage from './components/LeaderboardPage';
import PicksOverview from './components/PicksOverview';
import Picks from './components/Picks';
import LoginPage from './components/LoginPage'; // Atualizado para usar o LoginPage
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import SignUpPage from './components/SignUpPage';

function App() {

  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/picks" />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/picks-overview" element={<PicksOverview />} />
          <Route path="/picks" element={<Picks />} />
          <Route path="/login" element={<LoginPage />} /> {/* Atualizado para usar o LoginPage diretamente */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/reset_password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;






// npm start
// tree /f /a
