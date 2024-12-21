export interface SearchResults {
    page: number;
    results: [];
}

export interface SearchResult {
    background: string;
    id: number;
    name: string;
    poster: string;
    type: string;
    genres: [];
    date:string;
}