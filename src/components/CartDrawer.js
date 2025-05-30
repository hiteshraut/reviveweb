// Add Alert to the imports from @mui/material
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Button, TextField, Stepper, Step, StepLabel, Divider, Alert } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import PaymentScreen from './PaymentScreen';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems: cart, updateQuantity, removeFromCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Update steps array
  const steps = ['Cart', 'Delivery Details', 'Payment', 'Order Summary'];

  // Move isDeliveryFormValid here, before it's used
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
      return total + (price * item.quantity);
    }, 0);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDeliveryDetailsChange = (field) => (event) => {
    setDeliveryDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderCartItems = () => (
    <List>
      {cart.map((item) => (
        <ListItem key={item.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* <img 
              src={item.image} 
              alt={item.name} 
              style={{ width: 50, height: 50, marginRight: 16, objectFit: 'cover' }} 
            /> */}
            <ListItemText 
              primary={item.name}
              secondary={`₹${item.price} | Protein: ${item.protein}`}
            />
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
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={deliveryDetails.phone}
        onChange={handleDeliveryDetailsChange('phone')}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Delivery Address"
        value={deliveryDetails.address}
        onChange={handleDeliveryDetailsChange('address')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Pincode"
        value={deliveryDetails.pincode}
        onChange={handleDeliveryDetailsChange('pincode')}
        margin="normal"
      />
    </Box>
  );

  const handlePaymentComplete = () => {
    setActiveStep(3); // Move to order summary
    setOrderPlaced(true);
  };

  // Update renderOrderSummary function
  const renderOrderSummary = () => (
    <Box sx={{ p: 2 }}>
      {orderPlaced ? (
        <>
          <Alert severity="success" sx={{ mb: 3 }}>
            Order placed successfully!
          </Alert>
          <Typography variant="body1" gutterBottom>
            Your order will be delivered within 30-45 minutes.
          </Typography>
        </>
      ) : null}
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      {cart.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{item.name} x{item.quantity}</Typography>
          <Typography>₹{parseFloat(item.price.replace('₹', '')) * item.quantity}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₹{calculateTotal()}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Delivery Details</Typography>
        <Typography>{deliveryDetails.name}</Typography>
        <Typography>{deliveryDetails.phone}</Typography>
        <Typography>{deliveryDetails.address}</Typography>
        <Typography>{deliveryDetails.pincode}</Typography>
      </Box>
    </Box>
  );

  // Add payment screen rendering
  const renderPaymentScreen = () => (
    <PaymentScreen
      totalAmount={calculateTotal()}
      onPaymentComplete={handlePaymentComplete}
      onBack={handleBack}
    />
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{steps[activeStep]}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Stepper activeStep={activeStep} sx={{ px: 2, py: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {activeStep === 0 && renderCartItems()}
        {activeStep === 1 && renderDeliveryForm()}
        {activeStep === 2 && renderPaymentScreen()}
        {activeStep === 3 && renderOrderSummary()}
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Total Amount:</Typography>
          <Typography variant="h6">₹{calculateTotal()}</Typography>
        </Box>
        {activeStep !== 2 && ( // Hide buttons during payment screen
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep > 0 && !orderPlaced && (
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {!orderPlaced && (
              <Button
                fullWidth
                variant="contained"
                onClick={activeStep === steps.length - 1 ? onClose : handleNext}
                disabled={activeStep === 1 && !isDeliveryFormValid()}
              >
                {activeStep === steps.length - 1 ? 'Close' : 'Next'}
              </Button>
            )}
            {orderPlaced && (
              <Button
                fullWidth
                variant="contained"
                onClick={onClose}
              >
                Close
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;