import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GroupPost as Post } from "@/types/group";
import { MessageCircle, ThumbsUp, Share2, Trash2 } from "lucide-react";

interface PostCardProps {
  post: Post;
  onPostDeleted: (postId: string) => void;
}

export default function PostCard({ post, onPostDeleted }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onPostDeleted(post.id)}>
            <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="mr-2 h-4 w-4" />
          {post.likes} Likes
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          {post.comments} Comments
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          {post.shares} Shares
        </Button>
      </CardFooter>
    </Card>
  );
}
