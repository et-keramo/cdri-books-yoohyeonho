import { create } from 'zustand';

interface SearchState {
  query: string;
  target?: 'title' | 'person' | 'publisher';
  setSearch: (query: string, target?: 'title' | 'person' | 'publisher') => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  target: undefined,
  setSearch: (query, target) => set({ query, target }),
  clearSearch: () => set({ query: '', target: undefined }),
}));
