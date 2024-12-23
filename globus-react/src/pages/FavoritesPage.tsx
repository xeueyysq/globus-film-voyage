import { useEffect, useState } from "react";
import GlobusAppBar from "@/components/GlobusAppBar";
import FilmsList from "@/components/FilmsList";
import instance from "@/axios";
import { message } from "antd";
import { FilmCardProps } from "@/types/searchTypes";

const FavoritesPage = () => {
    const [films, setFilms] = useState<FilmCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWatchlist = async () => {
        try {
            const response = await instance.get('/watchlist');
            const watchlistFilms = response.data.map((film: any) => ({
                id: film.tmdbId,
                title: film.title,
                description: film.overview,
                type: film.media_type,
                date: film.release_date,
                poster: film.poster_path,
                profile: null
            }));
            setFilms(watchlistFilms);
        } catch (error) {
            message.error('Ошибка при загрузке списка избранного');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const handleRemove = (id: number) => {
        setFilms(films.filter(film => film.id !== id));
    };

    return (
        <GlobusAppBar>
            <h1 style={{fontSize: 30}}>Избранное</h1>
            {loading ? (
                <div>Загрузка...</div>
            ) : films.length > 0 ? (
                <FilmsList films={films} onRemove={handleRemove} />
            ) : (
                <div>Список избранного пуст</div>
            )}
        </GlobusAppBar>
    );
};

export default FavoritesPage;