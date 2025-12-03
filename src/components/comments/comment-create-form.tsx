'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { TextField, Button, Alert, Stack } from '@mui/material';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <Stack spacing={2} sx={{ px: 1 }}>
        <TextField
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          multiline
          rows={4}
          fullWidth
          error={!!formState.errors.content}
          helperText={formState.errors.content?.join(', ')}
        />

        {formState.errors._form ? (
          <Alert severity="error">{formState.errors._form?.join(', ')}</Alert>
        ) : null}

        <FormButton isLoading={isPending}>Create Comment</FormButton>
      </Stack>
    </form>
  );

  return (
    <div>
      <Button size="small" variant="text" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
