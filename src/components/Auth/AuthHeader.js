import { AppBar, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#07332c' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Link to="/">
          <Box
            component="img"
            src="/images/revive-logo.svg"
            alt="Revive"
            sx={{
              height: '40px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AuthHeader;