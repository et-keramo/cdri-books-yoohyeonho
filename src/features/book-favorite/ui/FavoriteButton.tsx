import type { KakaoBook } from '@/shared/api';
import iconLikeLine from '@/assets/icons/icon_like_line.png';
import iconLikeFill from '@/assets/icons/icon_like_fill.png';
import { useFavoriteBooks } from '@/features/book-favorite/model';

interface FavoriteButtonProps {
  book: KakaoBook;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteButton({
  book,
  size = 'sm',
  className = ''
}: FavoriteButtonProps) {
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavoriteBooks();
  const favorited = isFavorite(book);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorite(book);
    } else {
      addToFavorite(book);
    }
  };

  const sizeClass =
    size === 'sm' ? 'w-4 h-4' :
    size === 'md' ? 'w-6 h-6' :
    'w-8 h-8';

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClass} cursor-pointer ${className}`}
    >
      <img
        src={favorited ? iconLikeFill : iconLikeLine}
        alt={favorited ? '찜 취소' : '찜하기'}
        className="w-full h-full"
      />
    </button>
  );
}
