import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTournament } from './TournamentContext';


function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { selectTournament } = useTournament();

    const onLogin = async ({ email, password }) => {
        try {
            const loginResponse = await axios.post('https://thechallenge-solino.pythonanywhere.com/api/login', { email, password });
            // const loginResponse = await axios.post('http://localhost:5000/api/login', { email, password });

            if (loginResponse.status === 200) {
                login({
                    ...loginResponse.data,
                    email,
                    isAuthenticated: true
                });
                await navigateTournament(); // Supondo que essa lógica esteja correta e necessária.
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Altera a mensagem de erro para incluir um link direto para a redefinição de senha
                setError('Invalid credentials. Please try again or ');
                // Opção para redefinir a senha é mostrada aqui
                setTimeout(() => navigate('/password-recovery'), 3000); // Redireciona após 3 segundos
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error("Login error:", error);
        }
    };

    // Função separada para lidar com a lógica de redirecionamento do torneio
    const navigateTournament = async () => {
        try {
            const { data: tournaments } = await axios.get('https://thechallenge-solino.pythonanywhere.com/tournaments');
            // const { data: tournaments } = await axios.get('http://localhost:5000/tournaments');
            const openTournament = tournaments.find(t => t.status === "Open");

            if (openTournament) {
                selectTournament(openTournament);
                navigate('/picks');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error loading tournaments:', error);
            setError('Failed to load tournaments. Please try again.');
        }
    };

    return (
        <div className="login-page">
            {error && 
                <div className="alert alert-danger" role="alert">
                    {error} 
                    <a href="/password-recovery" className="alert-link">Forgot password?</a>
                </div>
            }
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;