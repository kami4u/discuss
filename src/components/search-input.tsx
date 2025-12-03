'use client';

import { Autocomplete, TextField } from '@mui/material';
import { search } from '@/actions';
import { useContext, type SyntheticEvent } from 'react';
import { PostsContext } from '@/app/providers';

export default function SearchInput() {
  const posts = useContext(PostsContext);

  const handleSelect = (_event: SyntheticEvent, value: string | null) => {
    search(value);
  };

  return (
    <Autocomplete
      disablePortal
      freeSolo
      options={posts.map((p) => p.title)}
      sx={{ width: 300 }}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Posts..."
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
          name="term"
        />
      )}
    />
  );
}
