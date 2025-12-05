import { useState } from 'react';
import iconSearch from '@/assets/icons/icon_search.png';
import iconBook from '@/assets/icons/icon_book.png';
import { BookListItem, BookListItemDetail } from '@/features/book-list';
import { useBookSearch } from '@/entities/book';

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const { data, isLoading, error } = useBookSearch({
    query: searchQuery,
    size: 10,
  });

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
      <div className="flex items-center gap-4 mb-6">
        {/* 검색어 입력 */}
        <div
          className="flex items-center w-[480px] h-[50px] px-[10px] py-[10px]
            bg-lightGray rounded-[100px]"
        >
          <img
            src={iconSearch}
            alt="검색"
            className="w-[30px] h-[30px] mr-[11px]"
          />

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent text-caption text-textSecondary
              placeholder:text-textSubtitle focus:outline-none"
          />
        </div>

        {/* 상세검색 버튼 */}
        <button
          className="w-[72px] h-[35px] px-[10px] py-[5px] text-body2 text-textSubtitle
            border border-textSubtitle rounded-[8px]
            hover:bg-gray/20 active:translate-y-0.5
            cursor-pointer transition-all ease-out duration-300"
        >
          상세검색
        </button>
      </div>

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
