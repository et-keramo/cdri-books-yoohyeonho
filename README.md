# CDRI Books

CDRI 프론트엔드 사전과제

## 프로젝트 개요

카카오의 다음 책 검색 API를 활용하여 책을 검색하고 결과를 제공하는 웹 애플리케이션입니다.

### API 문서

- [카카오 개발자 가이드](https://developers.kakao.com/docs/latest/ko/getting-started/quick-start)
- [다음 검색 - 책](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)
  

## 실행 방법 및 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 카카오 API 키를 설정합니다:

```env
VITE_KAKAO_API_KEY="발급받은 카카오 API 키"
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

## 폴더 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

```
cdri-books-yoohyeonho/
└── src/
    ├── app/                    # 애플리케이션 초기화 및 라우팅
    │   ├── providers/            # React Query 등 전역 프로바이더
    |   ├── styles/               # 전역 스타일
    │   └── App.tsx               # 루트 컴포넌트
    ├── pages/                  # 페이지
    │   ├── search/               # 도서 검색 페이지
    │   └── favorites/            # 내가 찜한 책 페이지
    ├── features/               # 비즈니스 기능
    │   ├── book-search/          # 도서 검색 기능
    │   ├── book-list/            # 도서 목록 표시
    │   └── book-favorite/        # 찜하기 기능
    ├── entities/               # 비즈니스 엔티티
    │   └── book/                 # 도서 엔티티(React Query Hook)
    └── shared/                 # 공통 모듈
        ├── api/                  # API 클라이언트, 서비스
        |   └── kakao/            # 카카오 API(실제 API 호출, 타입)
        ├── constants/            # 공통 상수
        ├── hooks/                # 공통 Hook
        ├── ui/                   # 공통 UI 컴포넌트
        ├── lib/                  # 유틸리티 함수
        └── store/                # 전역 상태
```


## 주요 코드 설명

### 1. React Query를 활용한 무한 스크롤

```typescript
// src/entities/book/api/book-queries.ts
export function useBookSearchInfinite(
  params: Omit<KakaoBookSearchRequest, 'page'>
) {
  return useInfiniteQuery({
    queryKey: ['book', 'search', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!params.query,
    initialPageParam: 1,
  });
}

```

- `useInfiniteQuery`를 사용해 페이지네이션 데이터를 자동으로 관리
- `getNextPageParam`에서 카카오 API의 `is_end` 메타데이터를 활용해 다음 페이지 존재 여부 판단
- `enabled` 옵션으로 검색어가 있을 때만 API 호출
- React Query 캐싱으로 중복 요청 방지


```typescript
// src/shared/hooks/use-infinite-scroll.ts
export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions
) {
  const { enabled, threshold = 0.1 } = options;
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold }
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
  }, [enabled, threshold, callback]);

  return observerTarget;
}
```

- IntersectionObserver API를 활용한 스크롤 감지
- 특정 엘리먼트가 뷰포트에 진입하면 콜백 함수 실행

### 2. Zustand를 활용한 검색 상태 관리

```typescript
// src/shared/store/search-store.ts
export const useSearchStore = create((set) => ({
  query: '',
  target: undefined,
  setSearch: (query, target) => set({ query, target }),
  clearSearch: () => set({ query: '', target: undefined }),
}));
```

- 최소한의 보일러플레이트로 전역 상태 관리
- 검색어(`query`)와 검색 대상(`target`)을 페이지 이동 간에도 유지

### 3. IME Composition 이벤트 처리

```typescript
// src/features/book-search/ui/SearchDetailPopup.tsx
const [isComposing, setIsComposing] = useState(false);

const handleKeyDown = (e: React.KeyboardEvent) => {
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
  }
};

<input
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={() => setIsComposing(false)}
  onKeyDown={handleKeyDown}
/>
```

- `onCompositionStart`/`onCompositionEnd` 이벤트로 한글 입력 조합 상태 추적
- IME 조합 중에는 Enter 키 이벤트 무시하여 중복 검색 방지


## 라이브러리 선택 이유

### React Router
- URL 기반 네비게이션 제공
  
### Axios
- 간편한 HTTP 요청 처리
- 요청/응답 인터셉터를 통한 공통 로직 처리

### Zustand
- 최소한의 보일러플레이트로 전역 상태 관리
- 검색 상태(검색어, 검색 대상)를 페이지 이동 시에도 유지

### Tailwind CSS
- 클래스 기반 스타일링으로 일관성 유지
- 커스텀 테마 설정

## 강조 하고 싶은 기능

### 1. React Query 기반 무한 스크롤
- `useInfiniteQuery`를 활용한 페이지네이션
- IntersectionObserver로 자동 로딩 트리거

### 2. Zustand 기반 검색 상태 관리
- 문제: 도서 검색 → 찜한 책 → 도서 검색 이동 시, 검색 결과가 초기화됨
- 해결: Zustand로 검색어와 검색 조건을 전역 상태로 관리하여 불필요한 재검색 방지

### 3. 한글 입력 중복 실행 방지
- 문제: 한글 입력 후에 Enter 키 입력 시, 검색이 2번 실행됨
- 해결: IME 이벤트 처리로 중복 실행 방지

