import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await onLogin({ email, password });

    if (status === 200) {
      setErrorMessage('');
      // Adicione navegação para a dashboard ou página inicial aqui, se necessário
    } else {
      // Verifique se a mensagem de erro precisa ser tratada aqui com base no status
      if (status === 401) {
        // Opção para navegar para a página de redefinição de senha
        navigate('/password-recovery');
      } else {
        const errorMsg = getErrorMessageByStatusCode(status);
        setErrorMessage(errorMsg);
      }
    }
  };

  // Essa função deve ser ajustada para manipular os status de erro corretamente
  const getErrorMessageByStatusCode = (status) => {
    switch (status) {
      case 400:
        return 'Invalid request. Please check your data.';
      case 401:
        // Mensagem de erro atualizada para incluir um convite para redefinição de senha
        return 'Invalid credentials. Please try again.';
      case 403:
        return 'Access denied. You do not have permission to perform this action.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              {errorMessage && (
                <div className="alert alert-danger" role="alert">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate(); // Hook para navegação

//   const getErrorMessageByStatusCode = (status) => {
//     switch (status) {
//       case 400:
//         return 'Invalid request. Please check your data.';
//       case 401:
//         // Atualizado para incluir um convite para redefinição de senha diretamente na mensagem
//         return 'Invalid credentials. Please try again or click "Forgot password?" to reset your password.';
//       case 403:
//         return 'Access denied. You do not have permission to perform this action.';
//       case 500:
//         return 'Server error. Please try again later.';
//       default:
//         return 'An unknown error occurred. Please try again.';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const status = await onLogin({ email, password });

//     if (status === 200) {
//       setErrorMessage('');
//     } else {
//       const errorMsg = getErrorMessageByStatusCode(status);
//       setErrorMessage(errorMsg);
//     }
//   };

//   // Função adicional para navegar para a página de recuperação de senha
//   const handlePasswordRecovery = () => {
//     navigate('/password-recovery');
//   };

//   const handleSignUpClick = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <h5 className="card-header">Login</h5>
//             <div className="card-body">
//               {errorMessage && (
//                 <div className="alert alert-danger" role="alert">
//                   {errorMessage}
//                   {errorMessage.includes('Forgot password?') && (
//                     // Adicionando um botão dentro da mensagem de erro para maior clareza e funcionalidade
//                     <button onClick={handlePasswordRecovery} className="btn btn-link p-0 m-0 align-baseline">Forgot password?</button>
//                   )}
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email:</label>
//                   <input
//                     id="email"
//                     type="email"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">Password:</label>
//                   <input
//                     id="password"
//                     type="password"
//                     className="form-control"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//                 <button type="button" onClick={handleSignUpClick} className="btn btn-link">Sign Up</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;



  // // Esta função será chamada quando o formulário for submetido
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("handleSubmit chamado");
  
  //   const status = await onLogin({ email, password });
  //   console.log("Status da resposta de login:", status);
  
  //   if (status === 200) {
  //     // Limpa a mensagem de erro se o login for bem-sucedido
  //     setErrorMessage('');
  //   } else {
  //     // Define a mensagem de erro com base no status da resposta
  //     const errorMsg = getErrorMessageByStatusCode(status);
  //     console.log("Mensagem de erro definida para:", errorMsg);
  //     setErrorMessage(errorMsg || 'An unknown error occurred. Please try again.');
  //   }
  // };
  
  // Função para redirecionar para a página de cadastro

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   console.log('Submitting login form...');
  
  //   try {
  //     const response = await fetch('http://localhost:5000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  
  //     // Log do status da resposta e URL para facilitar o debug
  //     console.log(`Response status from ${response.url}:`, response.status); 
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Log dos dados de login para confirmação de sucesso
  //       console.log('Login successful:', data); 
  //       onLogin(data); // Atualiza o estado do usuário no componente pai.
  //     } else {
  //       // Tratamento de resposta não-OK (ex: erros 4xx, 5xx)
  //       const errorData = await response.json();
  //       console.error('Login failed:', errorData.message || 'Unknown error'); // Log do erro específico
  //       const errorMessage = getErrorMessageByStatusCode(response.status, errorData.message);
  //       setErrorMessage(errorMessage); // Exibe mensagem de erro ao usuário
  //     }
  //   } catch (error) {
  //     // Captura erros de rede ou outros erros não relacionados à resposta HTTP
  //     console.error('Network or unexpected error:', error); // Log detalhado do erro
  //     setErrorMessage('Network error. Please check your connection and try again.');
  //   }
  // };

    // return (
  //   <div className="container mt-5">
  //     <div className="row justify-content-center">
  //       <div className="col-md-6">
  //         <div className="card">
  //           <h5 className="card-header">Login</h5>
  //           <div className="card-body">
  //             {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
  //             <form onSubmit={handleSubmit}>
  //               <div className="mb-3">
  //                 <label htmlFor="email" className="form-label">Email:</label>
  //                 <input
  //                   id="email"
  //                   type="email"
  //                   className="form-control"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                   required
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="password" className="form-label">Password:</label>
  //                 <input
  //                   id="password"
  //                   type="password"
  //                   className="form-control"
  //                   value={password}
  //                   onChange={(e) => setPassword(e.target.value)}
  //                   required
  //                 />
  //               </div>
  //               <button type="submit" className="btn btn-primary">Login</button>
  //               <button type="button" onClick={handleSignUpClick} className="btn btn-link">Sign Up</button> {/* Botão de cadastro */}
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );