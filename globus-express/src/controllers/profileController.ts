import { Request, Response } from 'express';
import pool from '../../postgres.js';
import { AuthRequest } from '../middleware/auth.js';

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { username, email, bio, location } = req.body;

        const result = await pool.query(
            `UPDATE users 
             SET username = $1, email = $2, bio = $3, location = $4, updated_at = CURRENT_TIMESTAMP
             WHERE id = $5
             RETURNING id, username, email, bio, location, created_at, updated_at`,
            [username, email, bio, location, userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Ошибка при обновлении профиля' });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        
        const result = await pool.query(
            'SELECT id, username, email, bio, location, created_at, updated_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Ошибка при получении профиля' });
    }
};