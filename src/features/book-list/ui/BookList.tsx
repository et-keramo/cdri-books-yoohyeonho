import { useState } from 'react';
import type { KakaoBook } from '@/shared/api';
import { getBookId } from '@/shared/lib/book-utils';
import BookListItem from './BookListItem';
import BookListItemDetail from './BookListItemDetail';

interface BookListProps {
  books: KakaoBook[];
}

export default function BookList({ books }: BookListProps) {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  return (
    <div>
      {books.map((book) => {
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
  );
}
