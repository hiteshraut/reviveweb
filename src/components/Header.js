import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
//import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';

const Header = () => {
 // const { cartItems: cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  const handlePrivacyPolicy = () => {
    handleClose();
    navigate('/privacy-policy');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={handleLogoClick}
          >
            <img
              src="/images/revive-logo.svg"
              alt="Revive Logo"
              style={{ height: '40px', marginRight: '8px' }}
            />
          </Box>
          
          <IconButton color="inherit" onClick={handleProfileClick}>
            {user ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#07332c' }}>
                {user.phoneNumber.slice(-2)}
              </Avatar>
            ) : (
              <AccountCircle />
            )}
          </IconButton> 
        </Toolbar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {user ? (
              [
                <MenuItem key="phone" disabled>
                  {user.phoneNumber}
                </MenuItem>,
                <MenuItem key="privacy" onClick={handlePrivacyPolicy}>
                  Privacy Policy
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>
              ]
            ) : (
              <MenuItem onClick={handleLogin}>Login/Signup</MenuItem>
            )}
          </Menu>
        
      </AppBar>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;