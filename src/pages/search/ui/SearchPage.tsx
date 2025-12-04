import { useState } from 'react';
import iconSearch from '@/assets/icons/icon_search.png';
import iconBook from '@/assets/icons/icon_book.png';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* 타이틀 */}
      <h2 className="mb-8 text-left text-title2 text-textTitle">
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
            className="w-5 h-5 mr-[11px] opacity-60"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent text-caption text-textSecondary
              placeholder:text-textSubtitle focus:outline-none"
          />
        </div>

        {/* 상세검색 버튼 */}
        <button
          className="h-[35px] px-[10px] py-[5px] text-body2 text-textPrimary
            border border-textSubtitle rounded-[8px] hover:bg-gray/20 transition-colors"
        >
          상세검색
        </button>
      </div>

      {/* 검색 결과 건수 */}
      <p className="mb-8 text-left text-[16px] leading-[24px] font-medium text-textSecondary">
        도서 검색 결과
        <span className="mx-2">총</span>
        <span className="font-bold text-primary">{searchResults.length}</span>건
      </p>

      {/* 빈 상태 */}
      {searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src={iconBook}
            alt="책 아이콘"
            className="w-16 h-16 mb-4"
          />
          <p className="text-caption text-textSecondary">
            검색된 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
