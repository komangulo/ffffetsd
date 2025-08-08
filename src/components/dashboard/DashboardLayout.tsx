import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button/Button';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Groups', href: '/dashboard/groups', icon: Users },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <div className={`fixed inset-0 z-40 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Nexus</h1>
              <button
                type="button"
                className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <div className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
                      {user?.avatar ? (
                        <img
                          className="h-full w-full text-gray-300"
                          src={user.avatar}
                          alt={user.username}
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200">
                      {user?.username}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Nexus</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <div className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
                    {user?.avatar ? (
                      <img
                        className="h-full w-full text-gray-300"
                        src={user.avatar}
                        alt={user.username}
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200">
                    {user?.username}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow dark:bg-gray-800">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h1 className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                {title || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <button
                  type="button"
                  className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    {user?.avatar ? (
                      <img
                        className="h-full w-full text-gray-300"
                        src={user.avatar}
                        alt={user.username}
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>
                {profileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
