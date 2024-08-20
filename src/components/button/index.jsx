import { Button } from '@mui/material';

function ButtonPrimary({ children, ...props }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props?.disabled ? () => {} : props?.onClick}
      {...props}
      sx={{
        pl: 2,
        pr: 2,
        textTransform: 'Capitalize',
        fontWeight: 400,
        ...props?.sx,
      }}
    >
      {children}
    </Button>
  );
}

function ButtonOutlined({ children, ...props }) {
  return (
    <Button
      onClick={props?.disabled ? () => {} : props?.onClick}
      {...props}
      color="primary"
      variant="outlined"
    >
      {children}
    </Button>
  );
}

export { ButtonOutlined, ButtonPrimary };
