import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('Сервак');
// });

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});