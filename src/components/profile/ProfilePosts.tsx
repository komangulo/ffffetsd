import { useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { PostCard } from '@/components/posts/PostCard';
import { PostComposer } from '@/components/posts/PostComposer';
import { Post } from '@/types/post';

interface ProfilePostsProps {
  posts: Post[];
  isCurrentUser: boolean;
  onPostCreated?: (post: Post) => void;
  onPostDeleted?: (postId: string) => void;
}

export function ProfilePosts({ 
  posts, 
  isCurrentUser, 
  onPostCreated,
  onPostDeleted 
}: ProfilePostsProps) {
  const [showComposer, setShowComposer] = useState(false);

  const handlePostCreated = (post: Post) => {
    setShowComposer(false);
    if (onPostCreated) {
      onPostCreated(post);
    }
  };

  return (
    <div className="space-y-4">
      {isCurrentUser && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          {showComposer ? (
            <PostComposer 
              onSuccess={handlePostCreated}
              onCancel={() => setShowComposer(false)}
              placeholder="What's on your mind?"
              autoFocus
            />
          ) : (
            <div 
              className="flex items-center p-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-text hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowComposer(true)}
            >
              <div className="flex-1 text-gray-500 dark:text-gray-400">
                What's on your mind?
              </div>
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                setShowComposer(true);
              }}>
                Create Post
              </Button>
            </div>
          )}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={onPostDeleted}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
            <svg
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No posts yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isCurrentUser 
              ? "You haven't created any posts yet. Share your thoughts with the community!"
              : "This user hasn't posted anything yet."}
          </p>
          {isCurrentUser && !showComposer && (
            <div className="mt-6">
              <Button 
                variant="primary" 
                onClick={() => setShowComposer(true)}
              >
                Create your first post
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
