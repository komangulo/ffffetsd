import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, UserProfile } from "@/types";
import { useState } from "react";

// The author prop should be a combination of User and UserProfile
// to include the display name and avatar.
type Author = {
  name?: UserProfile['displayName'];
  avatarUrl?: UserProfile['avatar'];
}

interface PostComposerProps {
  author: Author;
  onPostCreated: (content: string) => void;
}

export default function PostComposer({ author, onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      onPostCreated(content.trim());
      setContent('');
    }
  };

  return (
    <div className="flex items-start gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={author.avatarUrl ?? undefined} alt={author.name ?? 'User'} />
        <AvatarFallback>{author.name?.[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder="What's on your mind?"
          className="mb-2 resize-none border-0 ring-offset-0 focus-visible:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handlePost}>Post</Button>
        </div>
      </div>
    </div>
  );
}
