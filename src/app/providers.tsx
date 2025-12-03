'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext } from 'react';
import { PostWithData } from '@/db/queries/posts';

interface ProvidersProps {
  children: React.ReactNode;
  posts: PostWithData[];
}

export const PostsContext = createContext<PostWithData[]>([]);

export default function Providers({ children, posts }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>
        <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
