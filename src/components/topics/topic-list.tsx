import Link from 'next/link';
import { Chip, Box } from '@mui/material';
import { db } from '@/db';
import { paths } from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => {
    return (
      <Link
        key={topic.id}
        href={paths.topicShow(topic.slug)}
        style={{ textDecoration: 'none' }}
      >
        <Chip
          label={topic.slug}
          color="warning"
          variant="outlined"
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'action.hover' }
          }}
        />
      </Link>
    );
  });

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
    >
      {renderedTopics}
    </Box>
  );
}
