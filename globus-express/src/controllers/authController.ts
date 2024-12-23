import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../postgres.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        
        const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET);
        
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Ошибка при регистрации' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        
        if (result.rows.length === 0) {
            res.status(401).json({ message: 'Неверный email или пароль' });
            return;
        }
        
        const user = result.rows[0];
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Неверный email или пароль' });
            return;
        }
        
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        
        res.json({ 
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Ошибка при входе' });
    }
};