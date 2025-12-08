import type { KakaoBook } from '@/shared/api';
import iconArrowUp from '@/assets/icons/icon_arrow_up.png';
import { FavoriteButton } from '@/features/book-favorite';

interface BookListItemDetailProps {
  book: KakaoBook;
  onClose: () => void;
}

export default function BookListItemDetail({
  book,
  onClose,
}: BookListItemDetailProps) {
  const handlePurchase = () => {
    window.open(book.url, '_blank', 'noopener,noreferrer');
  };

  const thumbnail = book.thumbnail;
  const title = book.title;
  const author = book.authors.join(', ');
  const description = book.contents;
  const originalPrice = book.price;
  const salePrice = book.sale_price;
  return (
    <div className="flex w-[960px] pl-[54px] pr-4 py-6">
      {/* 썸네일 */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-[210px] h-[280px] object-cover rounded"
        />
        <FavoriteButton
          book={book}
          size="md"
          className="absolute top-2 right-2"
        />
      </div>

      {/* 제목/저자/책소개 */}
      <div className="flex-1 ml-8 text-left">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-[18px] leading-[26px] font-bold text-textPrimary">{title}</h3>
          <p className="text-body2 text-textSecondary">{author}</p>
        </div>

        <div>
          <h4 className="text-[14px] leading-[26px] font-bold text-textPrimary mb-3">책소개</h4>
          <p className="text-[10px] leading-4 font-medium text-textSecondary">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end ml-6">
        {/* 상세보기 버튼 */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-[115px] h-12
            px-5 py-[13px] text-caption text-textSecondary bg-lightGray
            rounded-lg cursor-pointer hover:bg-gray/20 transition-colors"
        >
          <span className="mr-[5px]">상세보기</span>
          <img
            src={iconArrowUp}
            alt="상세보기"
            className="w-3.5 h-2"
          />
        </button>

        {/* 가격 및 구매하기 버튼 */}
        <div className="text-right">
          <p className="flex justify-end items-center gap-2 mb-2">
            <span className="text-[10px] text-textSubtitle">원가</span>
            <span className="text-[18px] font-[350] text-textSubtitle line-through">
              {originalPrice.toLocaleString()}원
            </span>
          </p>
          <p className="flex justify-end items-center gap-2 mb-7">
            <span className="text-[10px] text-textSubtitle">할인가</span>
            <span className="text-[18px] font-bold text-textPrimary">
              {salePrice.toLocaleString()}원
            </span>
          </p>
          <button
            onClick={handlePurchase}
            className="w-60 h-12 px-5 py-[13px] text-caption text-white
              bg-primary rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
