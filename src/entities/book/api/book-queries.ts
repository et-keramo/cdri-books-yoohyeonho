import { useQuery } from '@tanstack/react-query';
import { searchBooks, type KakaoBookSearchRequest } from '@/shared/api';

/**
 * 카카오 책 검색 Query Hook
 */
export function useBookSearch(params: KakaoBookSearchRequest) {
  return useQuery({
    queryKey: ['book', 'search', params],
    queryFn: () => searchBooks(params),
    enabled: !!params.query,
  });
}
