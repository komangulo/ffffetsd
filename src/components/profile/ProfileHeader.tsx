import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/Button';
import { User, Mail, MapPin, Link as LinkIcon, Edit, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ProfileHeaderProps = {
  user: {
    id: string;
    username: string;
    name?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate: string;
    isCurrentUser?: boolean;
    isFollowing?: boolean;
  };
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
};

export function ProfileHeader({
  user,
  onEditProfile,
  onFollowToggle,
}: ProfileHeaderProps) {
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : user.username.slice(0, 2).toUpperCase();

  const joinDate = new Date(user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex">
            <div className="-mt-12">
              <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden">
                <Avatar className="h-full w-full">
                  {user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                  ) : (
                    <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-2xl font-medium">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
            
            <div className="ml-4 mt-2">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name || user.username}
                </h1>
                {user.isCurrentUser && (
                  <Badge variant="outline" className="ml-2">
                    You
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <User className="h-3 w-3 mr-1" />
                  Member since {joinDate}
                </Badge>
                {user.location && (
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {user.location}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex space-x-2">
            {user.isCurrentUser ? (
              <>
                <Button variant="outline" onClick={onEditProfile}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onFollowToggle}>
                  {user.isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Bio and Links */}
        <div className="mt-4">
          {user.bio && (
            <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
          )}
          
          {(user.website) && (
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {user.website && (
                <a
                  href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="mt-6 flex border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex-1 text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">1,234</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div className="flex-1 text-center border-l border-r border-gray-200 dark:border-gray-700">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">5,678</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">123</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
