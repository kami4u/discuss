import { db } from '@/db';
import { notFound } from 'next/navigation';
import { Box, Typography, Paper } from '@mui/material';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const post = await db.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    notFound();
  }
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 2 }}>
        {post.title}
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Typography variant="body1">{post.content}</Typography>
      </Paper>
    </Box>
  );
}
