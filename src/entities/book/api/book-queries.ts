import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
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

/**
 * 카카오 책 검색 Infinite Query Hook (무한 스크롤용)
 */
export function useBookSearchInfinite(
  params: Omit<KakaoBookSearchRequest, 'page'>
) {
  return useInfiniteQuery({
    queryKey: ['book', 'search', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!params.query,
    initialPageParam: 1,
  });
}
