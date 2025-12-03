import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import { Box, Stack, Typography } from '@mui/material';

type TopicShowPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      sx={{ width: '100%', maxWidth: '1200px' }}
    >
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          {slug}
        </Typography>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 2,
          minWidth: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <PostCreateForm slug={slug} />
      </Box>
    </Stack>
  );
}
