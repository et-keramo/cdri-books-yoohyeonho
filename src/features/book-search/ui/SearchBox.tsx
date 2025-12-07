import { useState } from 'react';
import iconSearch from '@/assets/icons/icon_search.png';
import iconClose from '@/assets/icons/icon_close.png';
import { useSearchHistory } from '../model';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchInput, setSearchInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchInput.trim();
    if (searchTerm) {
      addToHistory(searchTerm);
      onSearch(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryItemClick = (term: string) => {
    setSearchInput(term);
    handleSearch(term);
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, term: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromHistory(term);
  };

  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-[480px] bg-lightGray rounded-[24px]">
        {/* 검색어 입력 */}
        <div className="flex items-center h-[50px] px-[10px] py-[10px]">
          <img
            src={iconSearch}
            alt="검색"
            className="w-[30px] h-[30px] mr-[11px]"
          />

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent text-caption text-textSecondary
              placeholder:text-textSubtitle focus:outline-none"
          />
        </div>

        {/* 검색 기록 */}
        {isFocused && history.length > 0 && (
          <div className="px-[10px] pb-[10px]">
            {history.map((term) => (
              <div
                key={term}
                className="flex items-center justify-between py-[6px] pl-[41px] pr-[14px]"
              >
                <span
                  onClick={() => handleHistoryItemClick(term)}
                  className="text-caption text-textSubtitle cursor-pointer hover:text-textPrimary"
                >
                  {term}
                </span>
                <button
                  onMouseDown={(e) => handleDeleteHistoryItem(e, term)}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  <img src={iconClose} alt="삭제" className="w-full h-full" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 상세검색 버튼 */}
      <button
        className="w-[72px] h-[35px] px-[10px] py-[5px] text-body2 text-textSubtitle
          border border-textSubtitle rounded-[8px]
          hover:bg-gray/20 active:translate-y-0.5
          cursor-pointer transition-all ease-out duration-300"
      >
        상세검색
      </button>
    </div>
  );
}
