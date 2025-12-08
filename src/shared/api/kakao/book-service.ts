import type { KakaoBookSearchRequest, KakaoBookSearchResponse } from './types';
import { kakaoApiClient } from '../api-client';

/**
 * 카카오 책 검색 API 호출
 */
export async function searchBooks(
  params: KakaoBookSearchRequest
): Promise<KakaoBookSearchResponse> {
  const response = await kakaoApiClient.get<KakaoBookSearchResponse>('/book', {
    params: {
      query: params.query,
      ...(params.sort && { sort: params.sort }),
      ...(params.page && { page: params.page }),
      ...(params.size && { size: params.size }),
      ...(params.target && { target: params.target }),
    },
  });

  return response.data;
}