import { useState } from 'react';
import iconBook from '@/assets/icons/icon_book.png';
import { BookListItem, BookListItemDetail } from '@/features/book-list';
import { SearchBox } from '@/features/book-search';
import { useBookSearch } from '@/entities/book';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<'title' | 'person' | 'publisher' | undefined>();
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const { data, isLoading, error } = useBookSearch({
    query: searchQuery,
    size: 10,
    ...(searchTarget && { target: searchTarget }),
  });

  const handleSearch = (query: string, target?: 'title' | 'person' | 'publisher') => {
    setSearchQuery(query);
    setSearchTarget(target);
  };

  const books = data?.documents || [];
  const totalCount = data?.meta.total_count || 0;

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* 타이틀 */}
      <h2 className="mb-6 text-left text-title2 text-textTitle">
        도서 검색
      </h2>

      {/* 검색 영역 */}
      <SearchBox onSearch={handleSearch} />

      {/* 검색 결과 건수 */}
      <p className="flex items-center gap-4 mb-9 text-left text-[16px] leading-[24px] font-medium text-textPrimary">
        <span>도서 검색 결과</span>
        <span>
          총 <span className="font-bold text-primary">{totalCount}</span>건
        </span>
      </p>

      {/* 검색 결과 목록 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-caption text-textSecondary">검색 중...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-caption text-red-500">
            오류가 발생했습니다
          </p>
        </div>
      ) : books.length > 0 ? (
        <div>
          {books.map((book) => (
            expandedBookId === book.isbn ? (
              <BookListItemDetail
                key={book.isbn}
                id={book.isbn}
                thumbnail={book.thumbnail}
                title={book.title}
                author={book.authors.join(', ')}
                description={book.contents}
                originalPrice={book.price}
                salePrice={book.sale_price}
                onPurchase={() => console.log('구매:', book.title)}
                onClose={() => setExpandedBookId(null)}
              />
            ) : (
              <BookListItem
                key={book.isbn}
                id={book.isbn}
                thumbnail={book.thumbnail}
                title={book.title}
                author={book.authors.join(', ')}
                price={book.sale_price}
                onViewDetail={() => setExpandedBookId(book.isbn)}
                onPurchase={() => console.log('구매:', book.title)}
              />
            )
          ))}
        </div>
      ) : (
        /* 빈 상태 */
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src={iconBook}
            alt="책 아이콘"
            className="w-20 h-20 mb-4"
          />
          <p className="text-caption text-textSecondary">
            검색된 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
