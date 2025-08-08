import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LayoutGrid, Bookmark, Users, Image, Calendar } from 'lucide-react';

type Tab = 'posts' | 'saved' | 'groups' | 'events' | 'media';

type ProfileTabsProps = {
  activeTab: Tab;
  username: string;
  className?: string;
};

export function ProfileTabs({ activeTab, username, className }: ProfileTabsProps) {
  const router = useRouter();
  const basePath = `/@${username}`;

  const tabs = [
    {
      id: 'posts',
      name: 'Posts',
      icon: <LayoutGrid className="h-4 w-4" />,
      href: basePath,
    },
    {
      id: 'saved',
      name: 'Saved',
      icon: <Bookmark className="h-4 w-4" />,
      href: `${basePath}/saved`,
    },
    {
      id: 'groups',
      name: 'Groups',
      icon: <Users className="h-4 w-4" />,
      href: `${basePath}/groups`,
    },
    {
      id: 'events',
      name: 'Events',
      icon: <Calendar className="h-4 w-4" />,
      href: `${basePath}/events`,
    },
    {
      id: 'media',
      name: 'Media',
      icon: <Image className="h-4 w-4" />,
      href: `${basePath}/media`,
    },
  ] as const;

  return (
    <div className={cn('border-b border-gray-200 dark:border-gray-700', className)}>
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              'group inline-flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200',
              'transition-colors duration-200'
            )}
          >
            <span className="mr-2">{tab.icon}</span>
            <span>{tab.name}</span>
            {activeTab === tab.id && (
              <span className="sr-only">(current)</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
