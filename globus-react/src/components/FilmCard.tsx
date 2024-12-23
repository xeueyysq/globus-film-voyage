import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FilmCardProps } from "@/types/searchTypes";
import { useState, useEffect } from 'react';
import instance from '../axios';
import { useStore } from '../useStore';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';

interface ExtendedFilmCardProps extends FilmCardProps {
    id: number;
    onRemove?: (id: number) => void;
}

const FilmCard: React.FC<ExtendedFilmCardProps> = ({ 
    id,
    title, 
    description, 
    type, 
    date, 
    poster, 
    profile,
    onRemove 
}) => {
    const { user } = useStore();
    const [loading, setLoading] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);
    const location = useLocation();
    const isInFavorites = location.pathname === '/favorites';

    const currentImage = poster 
        ? `https://image.tmdb.org/t/p/w500/${poster}` 
        : profile 
        ? `https://image.tmdb.org/t/p/w500/${profile}` 
        : '/images/nophoto.jpg';

    const handleAddToWatchlist = async () => {
        if (!user) {
            message.warning('Войдите, чтобы добавить в список просмотра');
            return;
        }

        try {
            setLoading(true);
            await instance.post('/watchlist', {
                id,
                title,
                poster_path: poster,
                overview: description,
                media_type: type,
                release_date: date
            });
            setInWatchlist(true);
            message.success('Добавлено в список просмотра');
        } catch (error: any) {
            if (error.response?.status === 400) {
                message.info('Уже в списке просмотра');
            } else {
                console.error('Error details:', error.response?.data);
                message.error('Ошибка при добавлении в список');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async () => {
        try {
            setLoading(true);
            await instance.delete(`/watchlist/${id}`);
            message.success('Удалено из списка просмотра');
            if (onRemove) {
                onRemove(id);
            }
        } catch (error) {
            console.error('Error details:', error);
            message.error('Ошибка при удалении из списка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card.Root flexDirection="row" overflow="hidden" width='45%' height={280}>
            <Image
                objectFit="contain"
                maxW="200px"
                src={currentImage}
            />
            <Box>
                <Card.Body height='75%'>
                    <Card.Title mb="2">{title}</Card.Title>
                    <Card.Description maxHeight='60%' overflow='hidden'>
                        {description}
                    </Card.Description>
                    <HStack mt={15}>
                        <Badge>{date}</Badge>
                        <Badge>{type}</Badge>
                    </HStack>
                </Card.Body>
                <Card.Footer>
                    {!profile && (
                        <Button 
                            disabled={loading}
                            onClick={isInFavorites ? handleRemoveFromWatchlist : handleAddToWatchlist}
                        >
                            {isInFavorites ? 'Удалить из списка' : (inWatchlist ? 'В списке' : 'Смотреть позже')}
                        </Button>
                    )}
                </Card.Footer>
            </Box>
        </Card.Root>
    );
};

export default FilmCard;