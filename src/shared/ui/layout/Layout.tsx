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
      <header className="bg-white border-b border-gray">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">CERTICOS BOOKS</h1>
            <nav className="flex gap-0">
              <NavLink to="/search" className={getNavLinkClass}>
                도서 검색
              </NavLink>
              <NavLink to="/favorites" className={getNavLinkClass}>
                내가 찜한 책
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
