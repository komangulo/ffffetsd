import { createContext, useContext, useState, ReactNode } from 'react';

interface GroupContextType {
  joinedGroups: Set<number>;
  joinGroup: (groupId: number) => void;
  leaveGroup: (groupId: number) => void;
  isJoined: (groupId: number) => boolean;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroupContext must be used within a GroupProvider');
  }
  return context;
};

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set());

  const joinGroup = (groupId: number) => {
    setJoinedGroups(prev => new Set([...prev, groupId]));
  };

  const leaveGroup = (groupId: number) => {
    setJoinedGroups(prev => {
      const newSet = new Set(prev);
      newSet.delete(groupId);
      return newSet;
    });
  };

  const isJoined = (groupId: number) => joinedGroups.has(groupId);

  return (
    <GroupContext.Provider value={{ joinedGroups, joinGroup, leaveGroup, isJoined }}>
      {children}
    </GroupContext.Provider>
  );
};




