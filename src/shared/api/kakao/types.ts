/**
 * Kakao 책 검색 API 타입
 */
export interface KakaoBookSearchRequest {
  /** 검색을 원하는 질의어 */
  query: string;
  /** 정렬 방식
   *  - accuracy(정확도순, 기본값)
   *  - latest(발간일순)
   */
  sort?: 'accuracy' | 'latest';
  /** 페이지 번호(1~50, 기본값 1) */
  page?: number;
  /** 한 페이지에 보여질 문서 수(1~50, 기본값 1) */
  size?: number;
  /** 검색 필드 제한 */
  target?: 'title' | 'isbn' | 'publisher' | 'person';
}

export interface KakaoBookSearchResponse {
  meta: KakaoBookMeta;
  documents: KakaoBook[];
}

export interface KakaoBookMeta {
  /** 검색된 문서 수 */
  total_count: number;
  /** 중복 문서를 제외하고, 처음부터 요청 페이지까지 노출 가능 문서 수 */
  pageable_count: number;
  /** 현재 페이지가 마지막 페이지인지 여부 */
  is_end: boolean;
}

export interface KakaoBook {
  /** 도서 제목 */
  title: string;
  /** 도서 소개 */
  contents: string;
  /** 도서 상세 URL */
  url: string;
  /** 국제 표준 도서번호, ISBN10 또는 ISBN13(두 값 모두 제공될 경우 공백으로 구분) */
  isbn: string;
  /** 도서 출판날짜(ISO 8601 형식) */
  datetime: string;
  /** 도서 저자 리스트 */
  authors: string[];
  /** 도서 출판사 */
  publisher: string;
  /** 도서 번역자 리스트 */
  translators: string[];
  /** 도서 정가 */
  price: number;
  /** 도서 판매가 */
  sale_price: number;
  /** 도서 표지 미리보기 URL */
  thumbnail: string;
  /** 도서 판매 상태 정보(정상, 품절, 절판 등) */
  status: string;
}
