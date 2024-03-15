import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Captura o token do URL
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Log para diagnosticar o fluxo
    console.log("Iniciando a tentativa de redefinição de senha com o token:", token);

    if (password !== confirmPassword) {
      console.error("As senhas não coincidem.");
      setError('Passwords do not match.');
      return;
    }

    console.log("Enviando solicitação de redefinição de senha para o servidor...");

    try {
      const response = await fetch(`https://thechallenge-solino.pythonanywhere.com/api/reset_password/${token}`, {
      // const response = await fetch(`http://127.0.0.1:5000/api/reset_password/${token}`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      console.log("Resposta recebida do servidor:", response.status);

      const data = await response.json();
      console.log("Dados da resposta:", data);

      if (response.ok) {
        console.log("Redefinição de senha bem-sucedida:", data.message);
        setMessage(data.message);
        navigate('/login'); // Redireciona para a página de login após a redefinição
      } else {
        console.error("Erro na redefinição de senha:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Erro de rede ou no servidor ao tentar redefinir a senha:", error);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Reset Your Password</h5>
            <div className="card-body">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              {message && <div className="alert alert-success" role="alert">{message}</div>}
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <h2>Reset Your Password</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {message && <div className="alert alert-success">{message}</div>}
//       <form onSubmit={handleResetPassword}>
//         <div className="form-group">
//           <label htmlFor="password">New Password:</label>
//           <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm New Password:</label>
//           <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">Reset Password</button>
//       </form>
//     </div>
//   );
// }

export default ResetPasswordPage;

