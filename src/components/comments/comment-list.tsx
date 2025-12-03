import CommentShow from '@/components/comments/comment-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { Stack, Typography } from '@mui/material';

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
    );
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        All {comments.length} comments
      </Typography>
      {renderedComments}
    </Stack>
  );
}
