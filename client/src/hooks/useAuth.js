import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        setUser(response.data.user);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    const signup = async (username, password) => {
        await api.post('/auth/signup', { username, password });
    };

    return { user, loading, login, logout, signup };
};