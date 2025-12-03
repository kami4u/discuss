import type { PostWithData } from '@/db/queries/posts';
import Link from 'next/link';
import { paths } from '@/paths';
import { Card, CardContent, Typography, Stack } from '@mui/material';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <Link
        key={post.id}
        href={paths.postShow(topicSlug, post.id)}
        style={{ textDecoration: 'none' }}
      >
        <Card sx={{ '&:hover': { boxShadow: 4 }, cursor: 'pointer' }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 'bold', mb: 1 }}
            >
              {post.title}
            </Typography>
            <Stack direction="row" spacing={4}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                By {post.user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {post._count.comments} comments
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Link>
    );
  });

  return <Stack spacing={2}>{renderedPosts}</Stack>;
}
