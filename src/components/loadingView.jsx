import { LinearProgress } from '@mui/material';

export default function LoadingView() {
  return (
      <LinearProgress
        color="success"
        sx={{ borderRadius: 1, width: '100%', zIndex: 2 }}
      />
  );
}


