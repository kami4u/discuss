import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider, Stack, Box, Typography, Paper } from '@mui/material';
import PostList from '@/components/posts/post-list';
import { fetchTopPosts } from '@/db/queries/posts';

export default function Home() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      sx={{ width: '100%', maxWidth: '1200px' }}
    >
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Top Posts
        </Typography>
        <PostList fetchData={fetchTopPosts} />
      </Box>

      <Paper sx={{ flex: 1, p: 2, minWidth: 300 }}>
        <TopicCreateForm />
        <Divider sx={{ my: 2 }} />
        <TopicList />
      </Paper>
    </Stack>
  );
}
