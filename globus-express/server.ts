import express from 'express';
import cors from 'cors';
import router from './src/routes/routes.js';
import connectMongo from './mongodb.js';
import pool from './postgres.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const startServer = async () => {
    try {
        await connectMongo(); // Подключаем MongoDB
        await pool.connect();  // Подключаем PostgreSQL
        console.log('Connected to databases');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();