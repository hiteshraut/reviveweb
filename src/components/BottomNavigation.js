import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from '@mui/material';
import { 
  Restaurant as MenuIcon, 
  FitnessCenter as GymIcon, 
  Flag as GoalIcon,
  ShoppingCart as CartIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: cart } = useCart();
  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleNavigation = (path, section) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            bgcolor: '#07332c',
            height: '70px',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.6)',
              minWidth: '80px',
              padding: '8px 12px',
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                margin: '8px',
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.875rem',
                  fontWeight: 600
                }
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                transition: 'font-size 0.2s, opacity 0.2s',
                opacity: 1
              }
            }
          }}
        >
          <BottomNavigationAction 
            label="Menu" 
            icon={<MenuIcon />} 
            onClick={() => handleNavigation('/', 'products')}
          />
          <BottomNavigationAction 
            label="Gym" 
            icon={<GymIcon />} 
            onClick={() => handleNavigation('/', 'revive')}
          />
          <BottomNavigationAction 
            label="Goal" 
            icon={<GoalIcon />} 
            onClick={() => handleNavigation('/', 'goals')}
          />
          <BottomNavigationAction 
            label="Cart" 
            icon={
              <Badge badgeContent={cartItemCount} color="error">
                <CartIcon />
              </Badge>
            } 
            onClick={() => setIsCartOpen(true)}
          />
          
        </BottomNavigation>
      </Paper>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default BottomNav;