import { NavLink, Outlet } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-6 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-textPrimary border-b-2 border-primary'
      : 'text-textSecondary hover:text-textPrimary'
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4 relative">
          <h1 className="text-2xl font-bold absolute left-8 top-1/2 -translate-y-1/2">
            CERTICOS BOOKS
          </h1>

          <nav className="flex gap-0 justify-center">
            <NavLink to="/search" className={getNavLinkClass}>
              도서 검색
            </NavLink>
            <NavLink to="/favorites" className={getNavLinkClass}>
              내가 찜한 책
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
