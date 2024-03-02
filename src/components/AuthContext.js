import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Função para obter o CSRF token do backend
const fetchCsrfToken = async () => {
    const response = await fetch('/csrf_token', { credentials: 'include' }); // Garante que os cookies sejam enviados
    const data = await response.json();
    return data.csrf_token;
};

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        // Tenta recuperar os dados de autenticação do localStorage quando o app carrega
        const storedData = localStorage.getItem('authData');
        return storedData ? JSON.parse(storedData) : null;
    });

    const [csrfToken, setCsrfToken] = useState('');

    // Efeito para persistir os dados de autenticação no localStorage
    useEffect(() => {
        if (authData) {
            localStorage.setItem('authData', JSON.stringify(authData));
        } else {
            localStorage.removeItem('authData');
        }
    }, [authData]);

    // Efeito para obter o CSRF token quando o componente é montado
    useEffect(() => {
        fetchCsrfToken().then(token => {
            setCsrfToken(token);
        });
    }, []);

    // Função para realizar login
    const login = (data) => {
        setAuthData(data);
    };

    // Função para realizar logout
    const logout = () => {
        setAuthData(null);
    };

    // Valor disponibilizado por AuthProvider
    const value = {
        authData,
        csrfToken,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Criação do contexto de autenticação
// const AuthContext = createContext();

// // Provider do contexto de autenticação
// export const AuthProvider = ({ children }) => {
//     const [authData, setAuthData] = useState(() => {
//         // Tenta recuperar os dados de autenticação do localStorage quando o app carrega
//         const storedData = localStorage.getItem('authData');
//         return storedData ? JSON.parse(storedData) : null;
//     });

//     // Efeito para persistir os dados de autenticação no localStorage
//     useEffect(() => {
//         if (authData) {
//             localStorage.setItem('authData', JSON.stringify(authData));
//         } else {
//             localStorage.removeItem('authData');
//         }
//     }, [authData]);

//     // Função para realizar login
//     const login = (data) => {
//         setAuthData(data);
//     };

//     // Função para realizar logout
//     const logout = () => {
//         setAuthData(null);
//     };

//     // Valor disponibilizado por AuthProvider
//     const value = {
//         authData,
//         login,
//         logout
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Hook personalizado para acessar o contexto de autenticação
// export const useAuth = () => useContext(AuthContext);
