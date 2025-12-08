import { useState, useRef, useEffect } from 'react';
import iconSearch from '@/assets/icons/icon_search.png';
import iconClose from '@/assets/icons/icon_close.png';
import { useSearchHistory } from '../model';
import SearchDetailPopup from './SearchDetailPopup';

interface SearchBoxProps {
  onSearch: (query: string, target?: 'title' | 'person' | 'publisher') => void;
  initialValue?: string;
}

export default function SearchBox({ onSearch, initialValue = '' }: SearchBoxProps) {
  const [searchInput, setSearchInput] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isDetailedSearchOpen, setIsDetailedSearchOpen] = useState(false);
  const detailButtonRef = useRef<HTMLButtonElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isDetailedSearchingRef = useRef(false);
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  // URL 파라미터가 변경되면 입력값 업데이트
  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);

  const handleSearch = (query?: string, target?: 'title' | 'person' | 'publisher') => {
    const searchTerm = query || searchInput.trim();
    if (searchTerm) {
      addToHistory(searchTerm);
      onSearch(searchTerm, target);

      if (!target) {
        setIsDetailedSearchOpen(false);
      }
    }
  };

  const handleDetailedSearch = (query: string, target: 'title' | 'person' | 'publisher') => {
    isDetailedSearchingRef.current = true;
    setSearchInput('');
    handleSearch(query, target);
    setTimeout(() => {
      isDetailedSearchingRef.current = false;
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isDetailedSearchingRef.current) {
        e.preventDefault();
        return;
      }
      handleSearch(undefined, undefined);
    }
  };

  const handleHistoryItemClick = (term: string) => {
    setSearchInput(term);
    handleSearch(term, undefined);
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, term: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromHistory(term);
  };

  return (
    <div className="relative flex items-start gap-4 mb-6">
      <div
        ref={searchContainerRef}
        className="w-[480px] bg-lightGray rounded-[24px]"
      >
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
      <div className="relative mt-[7.5px]">
        <button
          ref={detailButtonRef}
          onClick={() => setIsDetailedSearchOpen(!isDetailedSearchOpen)}
          className="w-[72px] h-[35px] px-[10px] py-[5px] text-body2 text-textSubtitle
            border border-textSubtitle rounded-[8px]
            hover:bg-gray/20 active:translate-y-0.5
            cursor-pointer transition-all ease-out duration-300"
        >
          상세검색
        </button>

        {/* 상세검색 팝업 */}
        <SearchDetailPopup
          isOpen={isDetailedSearchOpen}
          onClose={() => setIsDetailedSearchOpen(false)}
          onSearch={handleDetailedSearch}
          buttonRef={detailButtonRef}
          searchContainerRef={searchContainerRef}
        />
      </div>
    </div>
  );
}
