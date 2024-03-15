import React, { useState } from 'react';
import SignUpForm from './SignUpForm'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Importe useAuth em vez de AuthContext

function SignUpPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { csrfToken } = useAuth(); // Use o hook useAuth para acessar o csrfToken

  const onSignUp = async (userData) => {
    try {
      // Inclua o csrfToken nas headers da solicitação
      const response = await fetch('https://thechallenge-solino.pythonanywhere.com/api/signup', {
      // const response = await fetch('http://localhost:5000/api/signup', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-Token': csrfToken, // Adicione o token CSRF aqui
        },
        // credentials: 'include', // Necessário para incluir cookies com a solicitação
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso:', data);
        navigate('/login'); // Redireciona para a página de login
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
