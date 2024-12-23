import { create } from 'zustand';
import {User} from './types/user'

interface SearchResultItem {
    id: number;
    name: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    media_type: string;
    release_date: string;
    profile_path: string;
}

interface Store {
    user: User | null;
    setUser: (user: User | null) => void;
    searchData: {
        page: number;
        results: SearchResultItem[];
    };
    setSearchData: (searchData: Store['searchData']) => void;
}

export const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    searchData: {
        page: 0,
        results: []
    },
    setSearchData: (searchData) => set({ searchData })
}));
