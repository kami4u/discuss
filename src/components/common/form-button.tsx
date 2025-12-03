'use client';
import { Button, CircularProgress } from '@mui/material';

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
      fullWidth
    >
      {children}
    </Button>
  );
}
