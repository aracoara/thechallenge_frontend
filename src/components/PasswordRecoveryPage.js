import React, { useState } from 'react';
import PasswordRecoveryForm from './PasswordRecoveryForm'; // Certifique-se de que o caminho está correto

function PasswordRecoveryPage() {
  // const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecover = async (email) => {
    try {
      const response = await fetch('https://thechallenge-solino.pythonanywhere.com/api/reset_password', {
      // const response = await fetch('http://localhost:5000/api/reset_password', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError(''); // Limpa erros anteriores
      } else {
        setError(data.message || 'An error occurred. Please try again.');
        setMessage(''); // Limpa mensagens anteriores
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      setMessage(''); // Limpa mensagens anteriores
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Password Recovery</h2>
          {message && <div className="alert alert-success" role="alert">{message}</div>}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <PasswordRecoveryForm onRecover={handleRecover} />
        </div>
      </div>
    </div>
  );
}

export default PasswordRecoveryPage;
