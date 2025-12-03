'use client';
import { useActionState, useState } from 'react';
import {
  Button,
  TextField,
  Popover,
  Box,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { createPost } from '@/actions';
import FormButton from '@/components/common/form-button';

type PostCreateFormProps = {
  slug: string;
};

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {}
    }
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a Post
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 4, minWidth: 320 }}>
          <form action={action}>
            <Stack spacing={4}>
              <Typography variant="h6">Create a Post</Typography>
              <TextField
                error={!!formState.errors.title}
                helperText={formState.errors.title?.join(', ')}
                name="title"
                label="Title"
                placeholder="Title"
                fullWidth
              />
              <TextField
                error={!!formState.errors.content}
                helperText={formState.errors.content?.join(', ')}
                name="content"
                label="Content"
                placeholder="Content"
                multiline
                rows={4}
                fullWidth
              />
              {formState.errors._form && (
                <Alert severity="error">
                  {formState.errors._form.join(', ')}
                </Alert>
              )}
              <FormButton isLoading={isPending}>Create Post</FormButton>
            </Stack>
          </form>
        </Box>
      </Popover>
    </>
  );
}
