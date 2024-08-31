import { LinearProgress } from '@mui/material';

export default function LoadingView() {
  return (
      <LinearProgress
        sx={{ borderRadius: 1, width: '100%', zIndex: 2 }}
      />
  );
}


