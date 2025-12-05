import type { KakaoBookSearchRequest, KakaoBookSearchResponse } from './types';

const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v3/search';
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

/**
 * 카카오 책 검색 API 호출
 */
export async function searchBooks(
  params: KakaoBookSearchRequest
): Promise<KakaoBookSearchResponse> {
  const searchParams = new URLSearchParams({
    query: params.query,
    ...(params.sort && { sort: params.sort }),
    ...(params.page && { page: String(params.page) }),
    ...(params.size && { size: String(params.size) }),
    ...(params.target && { target: params.target }),
  });

  const response = await fetch(`${KAKAO_API_BASE_URL}/book?${searchParams}`, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `카카오 API 오류: ${response.status} ${response.statusText}`,
      { cause: errorData }
    );
  }

  return response.json();
}
