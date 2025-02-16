import { Link, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { iUser } from '@/types';

const nav_links = [
  {
    path: '',
    display: 'Trang chủ',
  },
  {
    path: 'jobs',
    display: 'Việc làm',
  },
  {
    path: 'companies',
    display: 'Công ty',
  },
  {
    path: 'resume-dashboard',
    display: 'Hồ sơ & CV',
  },
];

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth) as { user: iUser | null };

  return (
    <header className="sticky top-0 inset-x-0 z-10 w-full flex items-center justify-between px-10 py-6 border-b border-gray-200 shadow-sm bg-background backdrop-blur-lg">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="flex items-center gap-8">
          {nav_links.map((nav, index) => (
            <NavLink
              to={nav.path}
              key={index}
              className={(navClass) =>
                navClass.isActive
                  ? 'font-semibold text-primary'
                  : 'font-semibold hover:text-primary'
              }
            >
              {nav.display}
            </NavLink>
          ))}
        </div>
      </div>

      {user ? (
        <div>Xin chào, {user?.name}</div>
      ) : (
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to={'/sign-in'}>
            <Button variant={'secondary'}>Đăng nhập</Button>
          </Link>
          <Link to={'/sign-up'}>
            <Button>Đăng ký</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
