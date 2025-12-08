import { useState, useRef, useEffect, useCallback } from 'react';
import iconClosePopup from '@/assets/icons/icon_close_popup.png';

interface SearchDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, target: 'title' | 'person' | 'publisher') => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  searchContainerRef?: React.RefObject<HTMLDivElement | null>;
}

const SEARCH_TYPES = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
] as const;

export default function SearchDetailPopup({
  isOpen,
  onClose,
  onSearch,
  buttonRef,
  searchContainerRef,
}: SearchDetailPopupProps) {
  const [searchType, setSearchType] = useState<'title' | 'person' | 'publisher'>('title');
  const [searchInput, setSearchInput] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // 팝업 닫힌 후 상태 초기화
      setSearchType('title');
      setSearchInput('');
    }, 300);
  }, [onClose]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target as Node) &&
        searchContainerRef?.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose, buttonRef, searchContainerRef]);

  if (!isOpen) {
    return null;
  }

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (trimmed) {
      onSearch(trimmed, searchType);
      setSearchInput('');
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter/Escape는 무조건 기본 동작 방지
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }

    // IME 조합 중이면 무시
    if (isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`absolute top-[calc(100%+8px)] right-0 w-[360px] h-[160px] bg-white rounded-[8px] p-6 z-50 ${
          isClosing ? 'animate-move-out-top' : 'animate-move-in-bottom'
        }`}
      style={{ boxShadow: '0px 4px 14px 6px rgba(151, 151, 151, 0.15)' }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-5 h-5 flex items-center justify-center cursor-pointer"
      >
        <img src={iconClosePopup} alt="닫기" className="w-full h-full" />
      </button>

      {/* 검색 조건/검색어 입력 */}
      <div className="flex items-center gap-1 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as typeof searchType)}
          className="w-[100px] h-[48px] px-3 text-body2-bold text-textPrimary bg-white
            border-b-2 border-gray focus:outline-none focus:border-primary cursor-pointer"
        >
          {SEARCH_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력"
          autoFocus
          className="flex-1 h-[48px] px-3 text-body2 text-textSecondary
            placeholder:text-caption placeholder:text-textCaption bg-white
            border-b-2 border-gray focus:outline-none focus:border-primary"
        />
      </div>

      {/* 검색하기 버튼 */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={!searchInput.trim()}
        className="w-[312px] h-[48px] text-caption text-white bg-primary rounded-[8px]
          hover:bg-primary/90 cursor-pointer transition-colors
          disabled:bg-gray disabled:cursor-not-allowed"
      >
        검색하기
      </button>
    </div>
  );
}
