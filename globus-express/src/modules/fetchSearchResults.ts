import axios from 'axios';
// import { API_KEY } from '../constants/key.js';
import { baseSearchURL } from '../constants/urls.js';
import { Request, Response } from 'express';
const API_KEY = '0c59ae1fcadbc4b30f93cb9d24881c9f';

export const fetchSearchResults = async (req: Request, res: Response) => {
    try {
        const { value, type } = req.query;
        console.dir(value);

        let searchURL = '';
        
        switch (type) {
            case 'movie':
                searchURL = `${baseSearchURL}/movie`
                break
            case 'tv':
                searchURL = `${baseSearchURL}/tv`
                break
            case 'person':
                searchURL = `${baseSearchURL}/person`
                break
            case 'multi':
            default:
                searchURL = `${baseSearchURL}/multi`
                break;
        }
        console.log(searchURL)

        const { data } = await axios.get(searchURL, {
            params: {
                api_key: API_KEY,
                query: value,
            }
        }); 

        console.dir(data);
        res.status(200).json(data);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Ошибка поиска книг:', e.response?.data || e.message);
        } else {
            console.error('Неизвестная ошибка:', e);
        }
        res.status(500).send('Ошибка сервера');
    }
}