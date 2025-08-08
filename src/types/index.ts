export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: 'user' | 'moderator' | 'admin';
  profile: UserProfile;
  settings: UserSettings;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthdate?: string;
  gender?: string;
  pronouns?: string[];
  avatar?: string;
  banner?: string;
  interests?: string[];
  kinks?: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'experienced' | 'expert';
  lookingFor?: string[];
  relationshipStatus?: string;
  height?: number; // in cm
  weight?: number; // in kg
  bodyType?: string;
  hairColor?: string;
  eyeColor?: string;
  occupation?: string;
  education?: string;
  languages?: string[];
  lastActive?: string;
  isOnline: boolean;
}

export interface UserSettings {
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showOnlineStatus: boolean;
    allowMessagesFrom: 'everyone' | 'friends' | 'none';
    showLastActive: boolean;
    showAge: boolean;
    showLocation: boolean;
    showKinks: 'public' | 'friends' | 'private';
    showInterests: 'public' | 'friends' | 'private';
  };
  notifications: {
    email: {
      messages: boolean;
      friendRequests: boolean;
      groupInvites: boolean;
      eventReminders: boolean;
      newPosts: boolean;
      comments: boolean;
      likes: boolean;
    };
    push: {
      messages: boolean;
      friendRequests: boolean;
      groupInvites: boolean;
      eventReminders: boolean;
      newPosts: boolean;
      comments: boolean;
      likes: boolean;
    };
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    saveLoginHistory: boolean;
    requirePasswordChange: number; // days
    activeSessions: {
      id: string;
      device: string;
      location: string;
      lastActive: string;
      current: boolean;
    }[];
  };
  content: {
    nsfwFilter: boolean;
    blurNsfw: boolean;
    hideNsfw: boolean;
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'system';
  };
  account: {
    deactivateAccount: boolean;
    deleteAccount: boolean;
    exportData: boolean;
  };
}

export interface Group {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  type: 'public' | 'private' | 'hidden';
  isNsfw: boolean;
  avatar?: string;
  banner?: string;
  rules: string[];
  settings: GroupSettings;
  ownerId: string;
  stats: {
    memberCount: number;
    postCount: number;
    eventCount: number;
    discussionCount: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroupSettings {
  postApprovalRequired: boolean;
  memberApprovalRequired: boolean;
  postTypesAllowed: string[];
  postTags: string[];
  memberPermissions: {
    canCreatePosts: boolean;
    canComment: boolean;
    canCreateEvents: boolean;
    canInviteMembers: boolean;
  };
  moderatorPermissions: {
    canApprovePosts: boolean;
    canManagePosts: boolean;
    canManageComments: boolean;
    canManageEvents: boolean;
    canManageMembers: boolean;
    canBanMembers: boolean;
  };
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  role: 'member' | 'moderator' | 'admin' | 'owner';
  status: 'pending' | 'approved' | 'rejected' | 'banned';
  isBanned: boolean;
  banReason?: string;
  joinedAt: string;
  lastActive?: string;
  notifications: {
    posts: boolean;
    events: boolean;
    discussions: boolean;
    announcements: boolean;
  };
  user?: Pick<User, 'id' | 'username' | 'profile'>;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
