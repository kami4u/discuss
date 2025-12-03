import Link from 'next/link';
import { Suspense } from 'react';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { paths } from '@/paths';
import { Stack, Link as MuiLink } from '@mui/material';

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: '1200px' }}>
      <MuiLink
        component={Link}
        href={paths.topicShow(slug)}
        underline="none"
        sx={{
          color: '#0066cc',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          fontSize: '0.95rem',
          '&:hover': {
            color: '#0052a3',
            textDecoration: 'underline'
          },
          transition: 'all 0.2s ease'
        }}
      >
        {'< '}Back to {slug}
      </MuiLink>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </Stack>
  );
}
