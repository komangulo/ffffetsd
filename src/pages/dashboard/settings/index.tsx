import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Bell, Globe, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { FormInput } from '@/components/ui/form/FormInput';

type Tab = 'profile' | 'account' | 'privacy' | 'notifications' | 'danger';

const SettingsPage: NextPage = () => {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(formData);
      // Show success message
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs: { id: Tab; name: string; icon: React.ReactNode }[] = [
    { id: 'profile', name: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'account', name: 'Account', icon: <Mail className="h-4 w-4" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="h-4 w-4" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'danger', name: 'Danger Zone', icon: <Trash2 className="h-4 w-4" /> },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout title="Settings">
        <Head>
          <title>Settings | Nexus</title>
          <meta name="description" content="Manage your account settings" />
        </Head>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-gray-50 text-indigo-700 hover:bg-gray-50 hover:text-indigo-700 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-3 flex-shrink-0">
                    {React.cloneElement(tab.icon as React.ReactElement, {
                      className: `h-5 w-5 ${
                        activeTab === tab.id
                          ? 'text-indigo-500 group-hover:text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`,
                      'aria-hidden': 'true',
                    })}
                  </span>
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white py-6 px-4 dark:bg-gray-800 sm:p-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Profile
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <FormInput
                          label="Username"
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Bio
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Brief description for your profile.
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <FormInput
                          label="Location"
                          id="location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <FormInput
                          label="Website"
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700 sm:px-6">
                    <Button type="submit" variant="primary" isLoading={isLoading}>
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'account' && (
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white py-6 px-4 dark:bg-gray-800 sm:p-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Account Settings
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Update your account information and email address.
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <FormInput
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled
                      />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Contact support to change your email address.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard/settings/change-password')}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white py-6 px-4 dark:bg-gray-800 sm:p-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Privacy Settings
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Control your privacy settings and data sharing preferences.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="show-online-status"
                          name="show-online-status"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="show-online-status"
                          className="font-medium text-gray-700 dark:text-gray-300"
                        >
                          Show online status
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Let others see when you're online
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="show-activity"
                          name="show-activity"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="show-activity"
                          className="font-medium text-gray-700 dark:text-gray-300"
                        >
                          Show activity status
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Let others see your current activity
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="allow-dms"
                          name="allow-dms"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="allow-dms"
                          className="font-medium text-gray-700 dark:text-gray-300"
                        >
                          Allow direct messages
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Allow others to send you direct messages
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700 sm:px-6">
                  <Button variant="primary">Save</Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white py-6 px-4 dark:bg-gray-800 sm:p-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Notification Preferences
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Configure how you receive notifications.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h4>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="email-mentions"
                              name="email-mentions"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="email-mentions"
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Mentions
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">
                              Email me when someone mentions me
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="email-replies"
                              name="email-replies"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="email-replies"
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Replies
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">
                              Email me when someone replies to my posts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Push Notifications
                      </h4>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="push-mentions"
                              name="push-mentions"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="push-mentions"
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Mentions
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">
                              Notify me when someone mentions me
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="push-replies"
                              name="push-replies"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="push-replies"
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Replies
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">
                              Notify me when someone replies to my posts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700 sm:px-6">
                  <Button variant="primary">Save</Button>
                </div>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="space-y-6">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-md dark:bg-gray-800">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Export Data
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                      <p>Download all your data in a JSON file.</p>
                    </div>
                    <div className="mt-5">
                      <Button variant="outline">
                        <svg
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow sm:overflow-hidden sm:rounded-md dark:bg-gray-800">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-red-600 dark:text-red-400">
                      Delete Account
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <div className="mt-5">
                      <Button variant="danger">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SettingsPage;
