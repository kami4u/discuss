'use client';

import { useActionState, startTransition, useState } from 'react';
import {
  Button,
  TextField,
  Popover,
  Box,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {}
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a Topic
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
        <Box sx={{ p: 4, width: 320 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Typography variant="h6">Create a Topic</Typography>
              <TextField
                name="name"
                label="Name"
                placeholder="Name"
                fullWidth
                error={!!formState.errors.name}
                helperText={formState.errors.name?.join(', ')}
              />
              <TextField
                name="description"
                label="Description"
                placeholder="Describe your topic"
                multiline
                rows={4}
                fullWidth
                error={!!formState.errors.description}
                helperText={formState.errors.description?.join(', ')}
              />

              {formState.errors._form ? (
                <Alert severity="error">
                  {formState.errors._form?.join(', ')}
                </Alert>
              ) : null}

              <FormButton isLoading={isPending}>Save</FormButton>
            </Stack>
          </form>
        </Box>
      </Popover>
    </>
  );
}
