import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Menu,
  X,
  House,
  Radar,
  Layers,
  BarChart3,
  History,
  Search,
  User,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../provider/AuthProvider';

function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <User size={16} />
        <span className="text-sm font-medium">{user?.fullName || user?.name || user?.email}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md dark:bg-slate-800 dark:border-slate-700">
          <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
            Profile
          </Link>
          <button
            onClick={() => signOut().then(() => (window.location.href = '/login'))}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: House },
    { label: 'Scanner', path: '/scanner', icon: Radar },
    { label: 'Prediction', path: '/prediction', icon: Search },
    { label: 'Batch Audit', path: '/batch', icon: Layers },
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'History', path: '/history', icon: History },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-sm dark:bg-slate-900/80 dark:border-slate-700/60">
      <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-colors">
              <Shield className="text-emerald-600 dark:text-emerald-300" size={20} />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">SCALA-Guard</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-300/70 dark:text-emerald-300 dark:bg-emerald-500/10 dark:ring-emerald-500/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={14} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth controls */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">
                  Login
                </Link>
                <Link to="/register" className="ml-2 px-4 py-2 text-sm font-medium text-sky-600 border border-sky-600 rounded-md hover:bg-sky-50">
                  Register
                </Link>
              </div>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-3' : 'max-h-0'}`}>
          <div className="flex flex-col gap-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-300/70 dark:text-emerald-300 dark:bg-emerald-500/10 dark:ring-emerald-500/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            ))}

            {/* Mobile auth links */}
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-3 rounded-lg text-sm font-medium text-sky-600">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-3 rounded-lg text-sm font-medium text-sky-600">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-3">{user?.fullName || user?.name || user?.email}</div>
                <button
                  onClick={() => signOut().then(() => (window.location.href = '/login'))}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}