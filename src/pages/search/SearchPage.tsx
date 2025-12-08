import iconBook from '@/assets/icons/icon_book.png';
import { BookList } from '@/features/book-list';
import { SearchBox } from '@/features/book-search';
import { useBookSearchInfinite } from '@/entities/book';
import { EmptyStatus, ErrorStatus, LoadingStatus } from '@/shared/ui/common';
import { useInfiniteScroll } from '@/shared/hooks';
import { useSearchStore } from '@/shared/store';

export default function SearchPage() {
  const { query: searchQuery, target: searchTarget, setSearch } = useSearchStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useBookSearchInfinite({
    query: searchQuery,
    size: 10,
    ...(searchTarget && { target: searchTarget }),
  });

  const handleSearch = (query: string, target?: 'title' | 'person' | 'publisher') => {
    setSearch(query, target);
  };

  const observerTarget = useInfiniteScroll(
    () => fetchNextPage(),
    { enabled: hasNextPage && !isFetchingNextPage }
  );

  const allBooks = data?.pages.flatMap((page) => page.documents) || [];
  const totalCount = data?.pages[0]?.meta.total_count || 0;

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* 타이틀 */}
      <h2 className="mb-6 text-left text-title2 text-textTitle">
        도서 검색
      </h2>

      {/* 검색 영역 */}
      <SearchBox onSearch={handleSearch} initialValue={searchQuery} />

      {/* 검색 결과 건수 */}
      <p className="flex items-center gap-4 mb-9 text-left text-[16px] leading-[24px] font-medium text-textPrimary">
        <span>도서 검색 결과</span>
        <span>
          총 <span className="font-bold text-primary">{totalCount}</span>건
        </span>
      </p>

      {/* 검색 결과 목록 */}
      {isLoading ? (
        <LoadingStatus text="검색 중..." />
      ) : error ? (
        <ErrorStatus text="오류가 발생했습니다" />
      ) : allBooks.length > 0 ? (
        <>
          <BookList books={allBooks} />

          {hasNextPage && (
            <div ref={observerTarget}>
              {isFetchingNextPage && <LoadingStatus text="로딩 중..." />}
            </div>
          )}
        </>
      ) : (
        <EmptyStatus icon={iconBook} text="검색된 결과가 없습니다." />
      )}
    </div>
  );
}
