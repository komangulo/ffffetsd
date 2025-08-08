import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { GroupCard } from '@/components/groups/GroupCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Users, UserCheck, Star, MapPin, Filter } from 'lucide-react';
import { Group } from '@/types/group';

type GroupFilter = 'all' | 'my-groups' | 'recommended' | 'nearby';



export default function GroupsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<GroupFilter>('all');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const fetchedGroups = await response.json();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Optionally set an error state to display a message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'my-groups') {
      return matchesSearch && group.isMember;
    }
    
    return matchesSearch;
  });

  const handleJoinGroup = async (groupId: string) => {
    setLoadingGroupId(groupId);
    const originalGroups = [...groups];
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: true, memberCount: group.memberCount + 1 }
        : group
    ));

    try {
      const response = await fetch(`/api/groups/${groupId}/membership`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to join group');
    } catch (error) {
      console.error(error);
      setGroups(originalGroups); // Revert state on error
    } finally {
      setLoadingGroupId(null);
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    setLoadingGroupId(groupId);
    const originalGroups = [...groups];
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: false, memberCount: Math.max(0, group.memberCount - 1) }
        : group
    ));

    try {
      const response = await fetch(`/api/groups/${groupId}/membership`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to leave group');
    } catch (error) {
      console.error(error);
      setGroups(originalGroups); // Revert state on error
    } finally {
      setLoadingGroupId(null);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title="Groups">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Groups</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Connect with communities that share your interests
              </p>
            </div>
            <Button 
              variant="default" 
              onClick={() => router.push('/groups/create')}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search groups..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeFilter === 'all'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Users className="h-4 w-4 mr-1" />
                All Groups
              </button>
              <button
                onClick={() => setActiveFilter('my-groups')}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeFilter === 'my-groups'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <UserCheck className="h-4 w-4 mr-1" />
                My Groups
              </button>
              <button
                onClick={() => setActiveFilter('recommended')}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeFilter === 'recommended'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Star className="h-4 w-4 mr-1" />
                Recommended
              </button>
              <button
                onClick={() => setActiveFilter('nearby')}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeFilter === 'nearby'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <MapPin className="h-4 w-4 mr-1" />
                Nearby
              </button>
            </div>
          </div>

          {/* Groups Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  {...group}
                  onJoin={() => handleJoinGroup(group.id)}
                  onLeave={() => handleLeaveGroup(group.id)}
                  isLoading={loadingGroupId === group.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <Users className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No groups found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchQuery 
                  ? 'No groups match your search. Try different keywords.'
                  : activeFilter === 'my-groups'
                    ? "You haven't joined any groups yet."
                    : 'No groups available at the moment.'}
              </p>
              <div className="mt-6">
                <Button 
                  variant="default" 
                  onClick={() => router.push('/groups/create')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create a Group
                </Button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
