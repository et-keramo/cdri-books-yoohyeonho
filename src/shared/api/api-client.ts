import axios from 'axios';

const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v3/search';
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

/**
 * 카카오 API용 axios 인스턴스
 */
export const kakaoApiClient = axios.create({
  baseURL: KAKAO_API_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
});

/**
 * 응답 인터셉터 - 에러 처리
 */
kakaoApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(
        `카카오 API 오류: ${error.response.status} ${error.response.statusText}`,
        { cause: error.response.data }
      );
    } else if (error.request) {
      throw new Error('네트워크 오류: 응답을 받을 수 없습니다.');
    } else {
      throw new Error(`요청 오류: ${error.message}`);
    }
  }
);