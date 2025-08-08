import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Post } from '@/types/post';

interface ProfilePageProps {
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    website: string;
    avatarUrl: string;
    joinDate: string;
  };
  posts: Post[];
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user: initialUser, posts: initialPosts }) => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  const isCurrentUser = currentUser?.id === initialUser.id;
  
  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };
  
  const handlePostDeleted = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };
  
  const handleEditProfile = () => {
    router.push('/dashboard/settings');
  };
  
  const handleFollowToggle = async () => {
    // Implement follow/unfollow logic
    console.log('Follow toggle');
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title={`${initialUser.name || initialUser.username} | Nexus`}>
        <div className="space-y-6">
          <ProfileHeader 
            user={{
              ...initialUser,
              isCurrentUser,
              isFollowing: false, // This would come from the API
            }}
            onEditProfile={handleEditProfile}
            onFollowToggle={handleFollowToggle}
          />
          
          <ProfileTabs 
            activeTab="posts" 
            username={initialUser.username} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow"
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <ProfilePosts 
              posts={posts}
              isCurrentUser={isCurrentUser}
              onPostCreated={handlePostCreated}
              onPostDeleted={handlePostDeleted}
            />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };
  
  // In a real app, you would fetch the user and their posts from your API
  // This is just mock data for demonstration
  const mockUser = {
    id: '1',
    username: username.replace('@', ''),
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Digital creator & photography enthusiast. Sharing my journey and thoughts.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: '2023-01-15T00:00:00.000Z',
  };
  
  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'Just finished my latest project! Check it out and let me know what you think. #design #webdev',
      author: {
        id: mockUser.id,
        username: mockUser.username,
        name: mockUser.name,
        avatarUrl: mockUser.avatarUrl,
      },
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: '2',
      content: 'Beautiful day for a hike! 🏞️ Nature always helps me clear my mind and get new ideas.',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
      ],
      author: {
        id: mockUser.id,
        username: mockUser.username,
        name: mockUser.name,
        avatarUrl: mockUser.avatarUrl,
      },
      likes: 42,
      comments: 5,
      shares: 2,
      isLiked: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];

  return {
    props: {
      user: mockUser,
      posts: mockPosts,
    },
  };
};

export default ProfilePage;
