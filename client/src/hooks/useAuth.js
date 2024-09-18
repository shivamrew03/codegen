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
        try {
            const response = await api.post('/auth/login', { username, password });
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    };

    const logout = async () => {
        const response = await api.post('/auth/logout');
        setUser(null);
        // return response.data;
    };

    const signup = async (username, password) => {
        try{
            const response = await api.post('/auth/signup', { username, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    };

    return { user, loading, login, logout, signup, checkAuth };
};