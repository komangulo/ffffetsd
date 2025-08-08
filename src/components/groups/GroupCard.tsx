import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Calendar, MapPin, Users as MembersIcon, Loader2 } from 'lucide-react';

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  isMember: boolean;
  isAdmin: boolean;
  coverImage?: string;
  avatarUrl?: string;
  location?: string;
  createdAt: string;
  category?: string;
  onJoin?: (groupId: string) => void;
  onLeave?: (groupId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function GroupCard({
  id,
  name,
  description,
  memberCount,
  isPrivate,
  isMember,
  isAdmin,
  coverImage,
  avatarUrl,
  location,
  createdAt,
  category,
  onJoin,
  onLeave,
  isLoading = false,
  className = '',
}: GroupCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        {coverImage && (
          <img
            src={coverImage}
            alt={`${name} cover`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute -bottom-6 left-4">
          <div className="h-16 w-16 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden">
            <Avatar className="h-full w-full">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-lg font-medium">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </div>

      {/* Group Info */}
      <div className="pt-8 px-4 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              <Link href={`/groups/${id}`} className="hover:underline">
                {name}
              </Link>
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              {isPrivate ? (
                <Badge variant="outline" className="text-xs">
                  <Lock className="h-3 w-3 mr-1" />
                  Cerrado
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  Abierto
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          
          {isAdmin && (
            <Badge variant="default" className="text-xs">
              Admin
            </Badge>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
          <div className="flex items-center">
            <MembersIcon className="h-4 w-4 mr-1" />
            <span>{memberCount} {memberCount === 1 ? 'miembro' : 'miembros'}</span>
          </div>
          {location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Creado en {formattedDate}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {isMember ? (
            <Button 
              variant={isAdmin ? 'outline' : 'default'} 
              size="sm" 
              className="w-full"
              onClick={() => onLeave?.(id)}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAdmin ? 'Administrar' : 'Unido'}
            </Button>
          ) : (
            <Link href={`/groups/${id}`} className="w-full">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
              >
                Unirse
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" className="w-full">
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
}
