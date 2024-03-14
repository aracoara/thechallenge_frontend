import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useAuth } from './AuthContext'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate(); // Usa o hook useNavigate para navegação
    const [error] = useState(""); // Estado para armazenar mensagens de erro

// Implementação da função onLogin
const onLogin = async ({ email, password }) => {
    // console.log("onLogin chamado com:", { email, password });
    try {
      // const response = await fetch('https://solino.pythonanywhere.com/api/login', {
      const response = await fetch('http://localhost:5000/api/login', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      // console.log("O Buscar terminou de carregar:", response.url); 
  
      const data = await response.json();
      if (response.ok) {
          // console.log("Login bem-sucedido:", data);
          // Atualiza o estado global de autenticação com todos os dados recebidos
          login({
              ...data, 
              email, 
              isAuthenticated: true // Adiciona um flag para verificar se o usuário está autenticado
          });
          navigate('/tournament');
        return response.status; // Retorna o status da resposta
      } else {
        // A requisição falhou
        // console.log("Login falhou com status:", response.status, "e dados:", data);
        return response.status; // Retorna o status da resposta para tratamento de erro
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      return undefined; // Retorna undefined para indicar um erro na requisição
    }
  };
  

  return (
    <div className="login-page">
      {error && <p className="error">{error}</p>} {/* Exibe mensagens de erro, se houver */}
      <LoginForm onLogin={onLogin} /> {/* Passa a função onLogin para LoginForm */}
    </div>
  );
}

export default LoginPage;
