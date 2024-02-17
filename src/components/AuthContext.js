import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        // Tenta recuperar os dados de autenticação do localStorage quando o app carrega
        const storedData = localStorage.getItem('authData');
        return storedData ? JSON.parse(storedData) : null;
    });

    // Efeito para persistir os dados de autenticação no localStorage
    useEffect(() => {
        if (authData) {
            localStorage.setItem('authData', JSON.stringify(authData));
        } else {
            localStorage.removeItem('authData');
        }
    }, [authData]);

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
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
