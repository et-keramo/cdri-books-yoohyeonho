import { useState, useEffect, useRef } from 'react';
import iconBook from '@/assets/icons/icon_book.png';
import { EmptyStatus, LoadingStatus } from '@/shared/ui/common';
import { BookListItem, BookListItemDetail } from '@/features/book-list';
import { useFavoriteBooks } from '@/features/book-favorite/model';
import { getBookId } from '@/shared/lib/book-utils';

const ITEMS_PER_PAGE = 10;

export default function FavoritesPage() {
  const { favoriteBooks } = useFavoriteBooks();
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < favoriteBooks.length) {
          setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayCount, favoriteBooks.length]);

  const displayedBooks = favoriteBooks.slice(0, displayCount);

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <p className="flex items-center gap-4 mb-9 text-left text-[16px] leading-[24px] font-medium text-textPrimary">
        <span>찜한 책</span>
        <span>
          총 <span className="font-bold text-primary">{favoriteBooks.length}</span>건
        </span>
      </p>

      {favoriteBooks.length > 0 ? (
        <>
          <div>
            {displayedBooks.map((book) => {
              const bookId = getBookId(book);
              return expandedBookId === bookId ? (
                <BookListItemDetail
                  key={bookId}
                  book={book}
                  onClose={() => setExpandedBookId(null)}
                />
              ) : (
                <BookListItem
                  key={bookId}
                  book={book}
                  onViewDetail={() => setExpandedBookId(bookId)}
                />
              );
            })}
          </div>

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
