import { create } from 'zustand';

interface SearchResultItem {
    id: number;
    name: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    media_type: string;
    release_date: string; //только фильмы
    profile_path: string; //люди
}

interface SearchResults {
    searchData: {
        page: number;
        results: SearchResultItem[];
    };
    setSearchData: (searchData: SearchResults['searchData']) => void;
}

export const useStore = create<SearchResults>((set) => ({
    searchData: {
        page: 0,
        results: []
    },
    setSearchData: (searchData) =>
        set(() => ({
            searchData: {
                page: searchData.page,
                results: searchData.results
            }
        }))
}));
