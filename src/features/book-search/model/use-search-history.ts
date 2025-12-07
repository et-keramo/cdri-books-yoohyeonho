import { useState } from 'react';

const STORAGE_KEY = 'search-history';
const MAX_HISTORY = 8;

/**
 * 검색 기록 관리 Hook
 */
export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 기록 추가
  const addToHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) {
      return;
    }

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      const newHistory = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 기록 삭제
  const removeFromHistory = (term: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item !== term);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 모든 기록 삭제
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
