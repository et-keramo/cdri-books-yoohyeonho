import { useState } from 'react';
import iconBook from '@/assets/icons/icon_book.png';
import { EmptyStatus } from '@/shared/ui/common';
import { BookListItem, BookListItemDetail } from '@/features/book-list';
import { useFavoriteBooks } from '@/features/book-favorite/model';

export default function FavoritesPage() {
  const { favoriteBooks } = useFavoriteBooks();
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <p className="flex items-center gap-4 mb-9 text-left text-[16px] leading-[24px] font-medium text-textPrimary">
        <span>찜한 책</span>
        <span>
          총 <span className="font-bold text-primary">{favoriteBooks.length}</span>건
        </span>
      </p>

      {favoriteBooks.length > 0 ? (
        <div>
          {favoriteBooks.map((book) => (
            expandedBookId === book.isbn ? (
              <BookListItemDetail
                key={book.isbn}
                book={book}
                onPurchase={() => console.log('구매:', book.title)}
                onClose={() => setExpandedBookId(null)}
              />
            ) : (
              <BookListItem
                key={book.isbn}
                book={book}
                onViewDetail={() => setExpandedBookId(book.isbn)}
                onPurchase={() => console.log('구매:', book.title)}
              />
            )
          ))}
        </div>
      ) : (
        <EmptyStatus icon={iconBook} text="찜한 책이 없습니다." />
      )}
    </div>
  );
}
