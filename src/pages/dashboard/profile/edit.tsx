import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, MapPin, Link as LinkIcon, Upload, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
    },
  });

  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatarPreview(user.avatarUrl);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    // In a real app, you would also need to handle removing the avatar from the server
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // In a real app, you would upload the avatar file to your server here
      // and get back a URL to save with the profile
      
      await updateProfile({
        ...data,
        // avatarUrl would be set here after upload
      });
      
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
    : user?.username.slice(0, 2).toUpperCase() || '';

  return (
    <ProtectedRoute>
      <DashboardLayout title="Edit Profile">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your profile information and settings.
            </p>
          </div>

          <div className="space-y-6">
            {/* Avatar Upload */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700">
                      <Avatar className="h-full w-full">
                        {avatarPreview ? (
                          <AvatarImage src={avatarPreview} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-2xl font-medium">
                            {initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Recommended size: 400x400px. Max file size: 5MB
                    </p>
                    <div className="mt-3">
                      <label
                        htmlFor="avatar-upload"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                        <input
                          id="avatar-upload"
                          name="avatar-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <FormInput
                      label="Full Name"
                      id="name"
                      name="name"
                      type="text"
                      icon={<User className="h-5 w-5 text-gray-400" />}
                      error={errors.name?.message}
                      {...register('name')}
                    />

                    <FormInput
                      label="Username"
                      id="username"
                      name="username"
                      type="text"
                      icon={<span className="text-gray-400">@</span>}
                      error={errors.username?.message}
                      {...register('username')}
                    />

                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          rows={4}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          {...register('bio')}
                        />
                      </div>
                      {errors.bio?.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.bio.message}
                        </p>
                      )}
                    </div>

                    <FormInput
                      label="Location"
                      id="location"
                      name="location"
                      type="text"
                      icon={<MapPin className="h-5 w-5 text-gray-400" />}
                      error={errors.location?.message}
                      {...register('location')}
                    />

                    <FormInput
                      label="Website"
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://example.com"
                      icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
                      error={errors.website?.message}
                      {...register('website')}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-right sm:px-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-3"
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>

            {/* Success Message */}
            {success && (
              <div className="rounded-md bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Profile updated successfully!
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4">
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
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
