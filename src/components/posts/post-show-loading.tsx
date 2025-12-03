import { Skeleton, Box, Paper, Stack } from '@mui/material';

export default function PostShowLoading() {
  return (
    <Box sx={{ m: 4 }}>
      <Box sx={{ my: 2 }}>
        <Skeleton variant="text" width={200} height={32} />
      </Box>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Skeleton variant="text" width={150} height={24} />
          <Skeleton variant="text" width={150} height={24} />
          <Skeleton variant="text" width={150} height={24} />
        </Stack>
      </Paper>
    </Box>
  );
}
