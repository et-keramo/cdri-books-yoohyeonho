import type { KakaoBook } from '@/shared/api';

/**
 * 책 고유 식별자를 생성
 * ISBN이 중복될 수 있으므로 title과 isbn을 조합
 */
export function getBookId(book: KakaoBook): string {
  return `${book.title}-${book.isbn}`;
}

/**
 * 도서 목록/상세 표시 데이터를 추출
 */
export function getBookDisplayData(book: KakaoBook) {
  return {
    thumbnail: book.thumbnail,
    title: book.title,
    authors: book.authors.join(', '),
    description: book.contents,
    price: book.price,
    salePrice: book.sale_price,
  };
}
