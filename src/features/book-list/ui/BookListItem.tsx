import type { KakaoBook } from '@/shared/api';
import iconArrowDown from '@/assets/icons/icon_arrow_down.png';
import { FavoriteButton } from '@/features/book-favorite';

interface BookListItemProps {
  book: KakaoBook;
  onViewDetail: () => void;
}

export default function BookListItem({
  book,
  onViewDetail,
}: BookListItemProps) {
  const handlePurchase = () => {
    window.open(book.url, '_blank', 'noopener,noreferrer');
  };

  const thumbnail = book.thumbnail;
  const title = book.title;
  const author = book.authors.join(', ');
  const price = book.sale_price;
  return (
    <div className="flex items-center w-[960px] h-[100px] pl-12 pr-4 border-b border-gray">
      {/* 썸네일 */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-12 h-[68px] object-cover rounded"
        />
        <FavoriteButton
          book={book}
          size="sm"
          className="absolute top-0 right-0"
        />
      </div>

      {/* 제목/저자 */}
      <div className="w-[408px] flex items-center gap-4 ml-12 text-left">
        <h3 className="text-title3 text-textPrimary">{title}</h3>
        <p className="text-body2 text-textSecondary">{author}</p>
      </div>

      {/* 가격 */}
      <div className="flex-1 text-title3 text-textPrimary">
        {price.toLocaleString()}원
      </div>

      {/* 구매하기/상세보기 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={handlePurchase}
          className="w-[115px] h-12 px-5 py-[13px] text-caption text-white
            bg-primary rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
        >
          구매하기
        </button>
        <button
          onClick={onViewDetail}
          className="flex items-center justify-center w-[115px] h-12
            px-5 py-[13px] text-caption text-textSecondary bg-lightGray
            rounded-lg cursor-pointer hover:bg-gray/20 transition-colors"
        >
          <span className="mr-[5px]">상세보기</span>
          <img
            src={iconArrowDown}
            alt="상세보기"
            className="w-3.5 h-2"
          />
        </button>
      </div>
    </div>
  );
}
