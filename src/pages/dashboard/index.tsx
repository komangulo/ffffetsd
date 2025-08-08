import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { Button } from '@/components/ui/button/Button';
import { Plus } from 'lucide-react';

const DashboardPage: NextPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/posts');
        // const data = await response.json();
        // setPosts(data);
        
        // Mock data for now
        setTimeout(() => {
          setPosts([
            {
              id: '1',
              content: 'Welcome to Nexus! This is your feed where you\'ll see updates from people and groups you follow.',
              author: {
                id: 'system',
                username: 'Nexus Team',
                avatar: null,
              },
              createdAt: new Date().toISOString(),
              likes: 0,
              comments: 0,
              shares: 0,
            },
          ]);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch posts', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout title="Home">
        <Head>
          <title>Dashboard | Nexus</title>
          <meta name="description" content="Your Nexus dashboard" />
        </Head>

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Create Post */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
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
              <div className="min-w-0 flex-1">
                <div className="rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-gray-600">
                  <label htmlFor="post" className="sr-only">
                    What's on your mind?
                  </label>
                  <textarea
                    rows={3}
                    name="post"
                    id="post"
                    className="block w-full resize-none border-0 border-b border-transparent bg-transparent py-3 focus:border-gray-300 focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 sm:text-sm"
                    placeholder="What's on your mind?"
                    defaultValue={''}
                  />
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Attach a file</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-4.5 4.5a2.25 2.25 0 01-3.182-3.18l.8-.8a.75.75 0 111.06 1.06l-.8.8a.75.75 0 001.06 1.06l4.5-4.5a3 3 0 000-4.242z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Add an emoji</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.06-1.06 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <Button type="button" size="sm">
                      <Plus className="-ml-1 mr-1 h-4 w-4" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="animate-pulse space-y-4">
                  <div className="flex space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-3 w-1/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex space-x-4 pt-2">
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                          {post.author.avatar ? (
                            <img
                              className="h-full w-full text-gray-300"
                              src={post.author.avatar}
                              alt={post.author.username}
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                              {post.author.username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author.username}
                          </p>
                          <span className="mx-1 text-gray-500">·</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          {post.content}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:hover:bg-gray-700"
                        >
                          <span className="sr-only">More options</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg
                          className="mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Like
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg
                          className="mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Comment
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg
                          className="mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No posts yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by creating a new post.
                </p>
                <div className="mt-6">
                  <Button>
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
