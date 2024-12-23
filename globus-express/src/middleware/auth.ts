import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
): void => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Требуется авторизация' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};