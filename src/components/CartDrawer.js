// Add Alert to the imports from @mui/material
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, Button, TextField, Stepper, Step, StepLabel } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems: cart, updateQuantity } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const steps = ['Cart', 'Delivery Details'];

  // Handle browser back button and prevent background scroll
  useEffect(() => {
    if (open) {
      // Push a new history state only when the drawer opens
      window.history.pushState({ drawerOpen: true }, '', window.location.href);
      
      // Prevent background scroll when drawer is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore background scroll when drawer is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    const handlePopState = (event) => {
      if (open) {
        // Prevent default navigation
        event.preventDefault();
        setActiveStep(0); // Reset to Cart step
        onClose(); // Close the drawer
        // Optionally, push the current state back to prevent blank page
        window.history.pushState({ drawerOpen: false }, '', window.location.href);
      }
    };

    // Add popstate event listener
    window.addEventListener('popstate', handlePopState);

    // Cleanup listener on component unmount or when drawer closes
    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Restore scroll when component unmounts
      if (open) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };
  }, [open, onClose]);

  const isDeliveryFormValid = () => {
    return (
      deliveryDetails.name.trim() !== '' &&
      deliveryDetails.phone.trim().length >= 10 &&
      deliveryDetails.address.trim() !== '' &&
      deliveryDetails.pincode.trim().length === 6
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', ''));
      return total + price * item.quantity;
    }, 0);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDeliveryDetailsChange = (field) => (event) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleOrderNow = () => {
    const orderMessage = `Hello! I would like to place an order:

*Order Details:*
${cart.map((item) => `• ${item.name} x${item.quantity} - ₹${parseFloat(item.price.replace('₹', '')) * item.quantity}`).join('\n')}

*Total Amount:* ₹${calculateTotal()}

*Delivery Details:*
Name: ${deliveryDetails.name}
Phone: ${deliveryDetails.phone}
Address: ${deliveryDetails.address}
Pincode: ${deliveryDetails.pincode}

Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/919243022440?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const renderCartItems = () => (
    <List>
      {cart.map((item) => (
        <ListItem key={item.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ListItemText primary={item.name} secondary={` ${item.price} | Protein: ${item.protein}`} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  const renderDeliveryForm = () => (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Full Name"
        value={deliveryDetails.name}
        onChange={handleDeliveryDetailsChange('name')}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={deliveryDetails.phone}
        onChange={handleDeliveryDetailsChange('phone')}
        margin="normal"
        required
        inputProps={{ maxLength: 10 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Delivery Address"
        value={deliveryDetails.address}
        onChange={handleDeliveryDetailsChange('address')}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Pincode"
        value={deliveryDetails.pincode}
        onChange={handleDeliveryDetailsChange('pincode')}
        margin="normal"
        required
        inputProps={{ maxLength: 6 }}
      />
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 400 },
          height: '100vh',
          maxHeight: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        },
      }}
      ModalProps={{
        keepMounted: false,
        disableScrollLock: false,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          height: '100vh !important',
          maxHeight: '100vh !important',
          overflow: 'hidden'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexShrink: 0,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6">{steps[activeStep]}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Stepper activeStep={activeStep} sx={{ px: 2, py: 3, flexShrink: 0 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        minHeight: 0,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}>
        {activeStep === 0 && renderCartItems()}
        {activeStep === 1 && renderDeliveryForm()}
      </Box>
      
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        flexShrink: 0,
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Total Amount:</Typography>
          <Typography variant="h6">₹{calculateTotal()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep > 0 && (
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              sx={{
                height: '50px',
              }}
            >
              Back
            </Button>
          )}
          {activeStep === 0 && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              disabled={cart.length === 0}
              sx={{
                height: '50px',
              }}
            >
              Proceed to Delivery
            </Button>
          )}
          {activeStep === 1 && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleOrderNow}
              disabled={!isDeliveryFormValid()}
              sx={{
                height: '50px',
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#20BA5A' },
              }}
            >
              Order Now via WhatsApp
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;