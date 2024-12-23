import GlobusAppBar from "@/components/GlobusAppBar";
import SearchBar from "@/components/SearchBar";
import { useStore } from "@/useStore";
import FilmCard from "@/components/FilmCard";
import { Flex } from "antd";

const SearchPage = () => {
    const { searchData } = useStore();

    return (
        <GlobusAppBar>
            <SearchBar />
            <Flex
                wrap="wrap"
                gap={16}
                style={{marginTop: 16}}
            >
                {searchData.results.map((item) => (
                    <FilmCard
                        key={item.id}
                        id={item.id}
                        title={item.name || item.title}
                        description={item.overview}
                        type={item.media_type}
                        date={item.release_date}
                        poster={item.poster_path}
                        profile={item.profile_path}
                    />
                ))}
            </Flex>
        </GlobusAppBar>
    );
};

export default SearchPage;
