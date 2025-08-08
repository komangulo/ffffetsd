import { useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CreateGroupForm } from '@/components/groups/CreateGroupForm';

export default function CreateGroupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Note: File uploads would be handled here, likely by uploading to a service
      // and then sending the URLs with the group data. For now, we omit the files.
      const { avatarFile, coverFile, ...groupData } = data;

      const response = await fetch('/api/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create group');
      }

      const newGroup = await response.json();
      
      // Redirect to the new group page using the ID from the API response
      router.push(`/groups/${newGroup.id}`);

    } catch (err: any) {
      console.error('Failed to create group:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title="Create Group">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create a New Group
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Bring people together around a common interest, hobby, or goal.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <CreateGroupForm 
                onSubmit={handleSubmit} 
                isLoading={isSubmitting} 
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
