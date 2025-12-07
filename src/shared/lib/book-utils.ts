import type { KakaoBook } from '@/shared/api';

/**
 * 책 고유 식별자를 생성
 * ISBN이 중복될 수 있으므로 title과 isbn을 조합
 */
export function getBookId(book: KakaoBook): string {
  return `${book.title}-${book.isbn}`;
}
