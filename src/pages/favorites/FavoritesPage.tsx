import { useState } from 'react';
import iconBook from '@/assets/icons/icon_book.png';
import { EmptyStatus, LoadingStatus } from '@/shared/ui/common';
import { SearchCountText } from '@/shared/ui/text';
import { PageTitle } from '@/shared/ui/layout';
import { BookList } from '@/features/book-list';
import { useFavoriteBooks } from '@/features/book-favorite/model';
import { useInfiniteScroll } from '@/shared/hooks';

const ITEMS_PER_PAGE = 10;

export default function FavoritesPage() {
  const { favoriteBooks } = useFavoriteBooks();
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const observerTarget = useInfiniteScroll(
    () => setDisplayCount((prev) => prev + ITEMS_PER_PAGE),
    { enabled: displayCount < favoriteBooks.length }
  );

  const displayedBooks = favoriteBooks.slice(0, displayCount);

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <PageTitle>내가 찜한 책</PageTitle>
      <SearchCountText title="찜한 책" count={favoriteBooks.length} />

      {favoriteBooks.length > 0 ? (
        <>
          <BookList books={displayedBooks} />

          {/* 무한 스크롤 트리거 */}
          {displayCount < favoriteBooks.length && (
            <div ref={observerTarget}>
              <LoadingStatus text="로딩 중..." />
            </div>
          )}
        </>
      ) : (
        <EmptyStatus icon={iconBook} text="찜한 책이 없습니다." />
      )}
    </div>
  );
}
