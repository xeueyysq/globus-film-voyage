import { Request, Response } from 'express';
import Film from '../models/film.js';
import { AuthRequest } from '../middleware/auth.js';

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const filmData = req.body;

        const film = new Film({
            userId,
            tmdbId: filmData.id,
            title: filmData.title,
            poster_path: filmData.poster_path,
            overview: filmData.overview,
            media_type: filmData.media_type,
            release_date: filmData.release_date
        });

        await film.save();
        res.status(201).json({ message: 'Фильм добавлен в список просмотра' });
    } catch (error: any) {
        console.error('Add to watchlist error:', error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'Фильм уже в списке просмотра' });
        } else {
            res.status(500).json({ 
                message: 'Ошибка при добавлении фильма',
                error: error.message 
            });
        }
    }
};

export const getWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const films = await Film.find({ userId });
        res.json(films);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка просмотра' });
    }
};

export const removeFromWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { tmdbId } = req.params;
        
        await Film.findOneAndDelete({ userId, tmdbId: Number(tmdbId) });
        res.json({ message: 'Фильм удален из списка просмотра' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении фильма' });
    }
};
