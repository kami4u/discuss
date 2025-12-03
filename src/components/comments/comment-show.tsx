import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { Box, Paper, Stack, Avatar, Typography } from '@mui/material';

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  return (
    <Paper sx={{ p: 4, mt: 2, mb: 1 }}>
      <Stack direction="row" spacing={3}>
        <Avatar
          src={comment.user.image || ''}
          alt="user image"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              {comment.user.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {comment.content}
            </Typography>
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ pl: 4 }}>{renderedChildren}</Box>
    </Paper>
  );
}
