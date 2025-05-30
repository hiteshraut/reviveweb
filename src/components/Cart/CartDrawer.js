import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  Drawer,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';

const CartDrawer = () => {
  const { user } = useAuth();
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      // Save current cart state
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
      // Redirect to auth page with return URL
      navigate('/auth?redirect=checkout');
      setIsCartOpen(false);
      return;
    }
    // Proceed with checkout
    navigate('/checkout');
    setIsCartOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
    >
      <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <Close />
          </IconButton>
        </Stack>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box display="flex" width="100%" mb={1}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box ml={2} flex={1}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price} × {item.quantity}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={() => removeFromCart(item.id)}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                </ListItem>
              ))}
            </List>

            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Total: ₹{total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleCheckout}
                sx={{ 
                  mt: 2,
                  height: '50px'
                }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;