import type { KakaoBook } from '@/shared/api';
import { useState, useEffect } from 'react';
import { getBookId } from '@/shared/lib/book-utils';

const FAVORITE_BOOKS_KEY = 'favorite-books';
const FAVORITE_BOOKS_CHANGE_EVENT = 'favorite-books-change';

/**
 * 찜한 책 목록 관리 Hook
 */
export function useFavoriteBooks() {
  const [favoriteBooks, setFavoriteBooks] = useState<KakaoBook[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITE_BOOKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 다른 컴포넌트에서 변경사항이 있을 때 동기화
  useEffect(() => {
    const handleFavoritesChange = () => {
      try {
        const saved = localStorage.getItem(FAVORITE_BOOKS_KEY);
        setFavoriteBooks(saved ? JSON.parse(saved) : []);
      } catch {
        setFavoriteBooks([]);
      }
    };

    window.addEventListener(FAVORITE_BOOKS_CHANGE_EVENT, handleFavoritesChange);
    return () => {
      window.removeEventListener(FAVORITE_BOOKS_CHANGE_EVENT, handleFavoritesChange);
    };
  }, []);

  // 찜한 책 추가
  const addToFavorite = (book: KakaoBook) => {
    try {
      const saved = localStorage.getItem(FAVORITE_BOOKS_KEY);
      const current = saved ? JSON.parse(saved) : [];
      const bookId = getBookId(book);

      if (current.some((item: KakaoBook) => getBookId(item) === bookId)) {
        return;
      }

      const newFavoriteBooks = [book, ...current];
      localStorage.setItem(FAVORITE_BOOKS_KEY, JSON.stringify(newFavoriteBooks));
      setFavoriteBooks(newFavoriteBooks);

      // 다른 컴포넌트에 변경사항 알림
      window.dispatchEvent(new Event(FAVORITE_BOOKS_CHANGE_EVENT));
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  // 찜한 책 삭제
  const removeFromFavorite = (book: KakaoBook) => {
    try {
      const saved = localStorage.getItem(FAVORITE_BOOKS_KEY);
      const current = saved ? JSON.parse(saved) : [];
      const bookId = getBookId(book);
      const newFavoriteBooks = current.filter((item: KakaoBook) => getBookId(item) !== bookId);

      localStorage.setItem(FAVORITE_BOOKS_KEY, JSON.stringify(newFavoriteBooks));
      setFavoriteBooks(newFavoriteBooks);

      // 다른 컴포넌트에 변경사항 알림
      window.dispatchEvent(new Event(FAVORITE_BOOKS_CHANGE_EVENT));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  // 찜 여부 확인
  const isFavorite = (book: KakaoBook) => {
    const bookId = getBookId(book);
    return favoriteBooks.some((item) => getBookId(item) === bookId);
  };

  return {
    favoriteBooks,
    addToFavorite,
    removeFromFavorite,
    isFavorite,
  };
}
