import { Flex } from "antd";
import FilmCard from "./FilmCard";
import { FilmCardProps } from "@/types/searchTypes";

interface FilmsListProps {
    films: FilmCardProps[];
    onRemove?: (id: number) => void;
}

const FilmsList = ({ films, onRemove }: FilmsListProps) => {
    return (
        <Flex
            wrap="wrap"
            gap={16}
            style={{ marginTop: 16 }}
        >
            {films.map((item) => (
                <FilmCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    type={item.type}
                    date={item.date}
                    poster={item.poster}
                    profile={item.profile}
                    onRemove={onRemove}
                />
            ))}
        </Flex>
    );
};

export default FilmsList;
