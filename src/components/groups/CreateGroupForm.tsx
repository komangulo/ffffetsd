import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/FormInput';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';

const groupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  isPrivate: z.boolean().default(false),
  location: z.string().max(100).optional(),
  category: z.string().min(1, 'Please select a category'),
});

type GroupFormData = z.infer<typeof groupSchema>;

interface CreateGroupFormProps {
  onSubmit: (data: GroupFormData & { avatarFile?: File; coverFile?: File }) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<GroupFormData>;
}

export function CreateGroupForm({ onSubmit, isLoading = false, initialData }: CreateGroupFormProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      isPrivate: false,
      ...initialData,
    },
  });

  const isPrivate = watch('isPrivate');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setAvatarFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
      setCoverFile(file);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const removeCover = () => {
    setCoverPreview(null);
    setCoverFile(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const onSubmitForm = (data: GroupFormData) => {
    onSubmit({
      ...data,
      ...(avatarFile && { avatarFile }),
      ...(coverFile && { coverFile }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Cover Photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cover Photo
        </label>
        <div className="relative h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
          {coverPreview ? (
            <div className="relative w-full h-full">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeCover}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="cover-upload"
                  className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="cover-upload"
                    name="cover-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleCoverChange}
                    ref={coverInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Group Avatar
        </label>
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            {avatarPreview ? (
              <div className="relative h-full w-full">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm font-medium leading-4 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change
              <input
                id="avatar-upload"
                name="avatar-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={avatarInputRef}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Square image recommended. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Group Name */}
      <FormInput
        label="Group Name"
        id="name"
        type="text"
        placeholder="e.g., San Francisco Hiking Club"
        error={errors.name?.message}
        {...register('name')}
      />

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Tell us about your group..."
          className={`min-h-[120px] ${errors.description ? 'border-red-300' : ''}`}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Privacy */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {isPrivate ? 'Private Group' : 'Public Group'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isPrivate
              ? 'Only members can see who\'s in the group and what they post.'
              : 'Anyone can see who\'s in the group and what they post.'}
          </p>
        </div>
        <div className="flex items-center">
          <Switch
            id="isPrivate"
            checked={isPrivate}
            onCheckedChange={(checked) => setValue('isPrivate', checked)}
          />
          <Label htmlFor="isPrivate" className="ml-2">
            {isPrivate ? 'Private' : 'Public'}
          </Label>
        </div>
      </div>

      {/* Location */}
      <FormInput
        label="Location (optional)"
        id="location"
        type="text"
        placeholder="e.g., San Francisco, CA"
        error={errors.location?.message}
        {...register('location')}
      />

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
            errors.category ? 'border-red-300' : ''
          }`}
          {...register('category')}
        >
          <option value="">Select a category</option>
          <option value="social">Social</option>
          <option value="professional">Professional</option>
          <option value="hobbies">Hobbies & Interests</option>
          <option value="education">Education</option>
          <option value="technology">Technology</option>
          <option value="health">Health & Wellness</option>
          <option value="business">Business & Networking</option>
          <option value="community">Community</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="default" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Group'
          )}
        </Button>
      </div>
    </form>
  );
}
