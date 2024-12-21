import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FilmCardProps } from "@/types/searchTypes";

const FilmCard: React.FC<FilmCardProps> = ({ title, description, type, date, poster, profile }) => {
    const currentImage = poster 
        ? `https://image.tmdb.org/t/p/w500/${poster}` 
        : profile 
        ? `https://image.tmdb.org/t/p/w500/${profile}` 
        : '/images/nophoto.jpg';
        
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
                {profile || profile === null ? <div></div> : <Button>Смотреть позже</Button>}
            </Card.Footer>
            </Box>
        </Card.Root>
    )
};

export default FilmCard;