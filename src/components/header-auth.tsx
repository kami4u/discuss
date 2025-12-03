'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/actions';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function HeaderAuth() {
  const { status, data } = useSession();
  const user = data?.user;

  const [showActions, setShowActions] = useState(false);
  const toggle = () => setShowActions((v) => !v);

  if (status === 'loading') return <div style={containerStyle} />;

  // Logged out
  if (!user) {
    return (
      <div style={containerStyle}>
        <Stack direction="row" spacing={2}>
          <form action={signIn}>
            <Typography
              component="button"
              type="submit"
              sx={{
                cursor: 'pointer',
                background: '#1976d2',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              Login
            </Typography>
          </form>

          <Typography
            sx={{
              cursor: 'pointer',
              background: '#1976d2',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 1
            }}
          >
            Sign Up
          </Typography>
        </Stack>
      </div>
    );
  }

  // Logged in
  return (
    <div style={{ ...containerStyle, position: 'relative' }}>
      <Avatar
        src={user.image ?? undefined}
        onClick={toggle}
        sx={{ cursor: 'pointer' }}
      />

      {showActions && (
        <div
          style={{
            position: 'absolute',
            top: '80%',
            marginTop: 10,
            padding: '10px 16px',
            background: 'white',
            borderRadius: 8,
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            minWidth: 120
          }}
        >
          <form action={signOut}>
            <Typography
              component="button"
              type="submit"
              sx={{
                cursor: 'pointer',
                fontSize: 15,
                border: 'none',
                background: 'none',
                textAlign: 'left',
                px: 0,
                py: 0,
                width: '100%',
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              Sign Out
            </Typography>
          </form>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  minWidth: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
