import { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from '@mui/material';
import { 
  Restaurant as MenuIcon, 
  FitnessCenter as GymIcon, 
  Flag as GoalIcon,
  ShoppingCart as CartIcon, 
  Home as HomeIcon
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

  useEffect(() => {
    // Set value based on current pathname or hash
    if (location.pathname === '/' && location.hash !== '#revive') {
      setValue(0); // Home
    } 
    else if (location.pathname === '/products' || location.pathname.startsWith('/product/')) {
      setValue(1); // Menu
    }
    else if (location.pathname === '/goals' || location.pathname.startsWith('/goals/')) {
      setValue(2); // Goal - Fixed: This should highlight when on goals page
    } 
    else if (location.pathname === '/revive' || location.hash === '#revive') {
      setValue(3); // Gym
    } else {
      setValue(0); // Default to Home for unmatched routes
    }
  }, [location.pathname, location.hash]);

  const handleNavigation = (path, section, index) => {
    // Set the value immediately for better UX
    setValue(index);
    
    if (path === '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
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
            padding: '0 4px',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.6)',
              minWidth: { xs: '60px', sm: '80px' },
              padding: { xs: '6px 8px', sm: '8px 12px' },
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                margin: { xs: '4px', sm: '8px' },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 600
                }
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                transition: 'font-size 0.2s, opacity 0.2s',
                opacity: 1
              }
            }
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            icon={<HomeIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />} 
            onClick={() => handleNavigation('/', 'hero', 0)}
          />
          <BottomNavigationAction 
            label="Menu" 
            icon={<MenuIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />} 
            onClick={() => handleNavigation('/products', null, 1)}
          />
          <BottomNavigationAction 
            label="Goal" 
            icon={<GoalIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />} 
            onClick={() => handleNavigation('/goals', null, 2)}
          />
          <BottomNavigationAction 
            label="Gym" 
            icon={<GymIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />} 
            onClick={() => handleNavigation('/revive', null, 3)}
          /> 
          <BottomNavigationAction 
            label="Cart" 
            icon={
              <Badge badgeContent={cartItemCount} color="error">
                <CartIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
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