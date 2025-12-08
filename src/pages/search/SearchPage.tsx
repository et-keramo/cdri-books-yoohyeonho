import iconBook from '@/assets/icons/icon_book.png';
import { BookList } from '@/features/book-list';
import { SearchBox } from '@/features/book-search';
import { useBookSearchInfinite } from '@/entities/book';
import { EmptyStatus, ErrorStatus, LoadingStatus } from '@/shared/ui/common';
import { SearchCountText } from '@/shared/ui/text';
import { PageTitle } from '@/shared/ui/layout';
import { useInfiniteScroll } from '@/shared/hooks';
import { useSearchStore } from '@/shared/store';
import { SEARCH_PAGE_SIZE } from '@/shared/constants';

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
    size: SEARCH_PAGE_SIZE,
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
      <PageTitle>도서 검색</PageTitle>

      {/* 검색 영역 */}
      <SearchBox onSearch={handleSearch} initialValue={searchQuery} />

      {/* 검색 결과 건수 */}
      <SearchCountText title="도서 검색 결과" count={totalCount} />

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
