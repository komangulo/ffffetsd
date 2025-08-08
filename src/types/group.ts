export interface GroupMember {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  role: 'member' | 'admin' | 'moderator';
  joinedAt: string;
}

export interface GroupEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  isOnline: boolean;
  attendees: number;
  isAttending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroupPost {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  media?: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  slug: string;
  isPrivate: boolean;
  isMember: boolean;
  isAdmin: boolean;
  memberCount: number;
  avatarUrl?: string;
  coverImage?: string;
  location?: string;
  category: string;
  tags: string[];
  rules?: string[];
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    attendees: number;
    isAttending: boolean;
  }>;
  recentMembers: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupInput {
  name: string;
  description: string;
  isPrivate: boolean;
  category: string;
  location?: string;
  tags?: string[];
  rules?: string[];
  avatarFile?: File;
  coverImageFile?: File;
}

export interface UpdateGroupInput extends Partial<Omit<CreateGroupInput, 'avatarFile' | 'coverImageFile'>> {
  id: string;
  avatarFile?: File | null;
  coverImageFile?: File | null;
  removeAvatar?: boolean;
  removeCoverImage?: boolean;
}

export interface GroupInvite {
  id: string;
  groupId: string;
  groupName: string;
  inviter: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  expiresAt: string;
}

export interface GroupJoinRequest {
  id: string;
  groupId: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
  };
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface GroupStats {
  totalMembers: number;
  activeMembers: number;
  totalPosts: number;
  postsThisWeek: number;
  totalEvents: number;
  upcomingEvents: number;
}

export interface GroupSettings {
  id: string;
  groupId: string;
  isPrivate: boolean;
  allowMemberPosts: boolean;
  postApprovalRequired: boolean;
  allowMemberEvents: boolean;
  eventApprovalRequired: boolean;
  allowMemberInvites: boolean;
  membershipApprovalRequired: boolean;
  defaultMemberRole: 'member' | 'moderator';
  createdAt: string;
  updatedAt: string;
}

export type GroupRole = 'member' | 'moderator' | 'admin';

export interface GroupMembership {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  joinedAt: string;
  lastSeenAt?: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    lastActive?: string;
  };
}
