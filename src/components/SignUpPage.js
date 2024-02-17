// Este código deve ser adicionado em um componente que chama SignUpForm, como SignUpPage.js

import React, { useState } from 'react';
import SignUpForm from './SignUpForm'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Adiciona o hook useNavigate para navegação

  const onSignUp = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso:', data);
        navigate('/login'); // Redireciona para a página de login
        // Aqui você pode redirecionar para a página de login ou fazer outra ação
      } else {
        console.error('Falha no cadastro:', data.error);
        setError(data.error); // Exibe a mensagem de erro no seu componente
      }
    } catch (error) {
      console.error('Erro ao enviar dados para cadastro:', error);
      setError('Erro ao conectar com o servidor. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <SignUpForm onSignUp={onSignUp} />
    </div>
  );
}

export default SignUpPage;
