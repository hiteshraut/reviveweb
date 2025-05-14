import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';

const PaymentScreen = ({ totalAmount, onPaymentComplete, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({
    upi: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePaymentDetailsChange = (field) => (event) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'upi') {
      return paymentDetails.upi.includes('@');
    } else if (paymentMethod === 'card') {
      return (
        paymentDetails.cardNumber.length === 16 &&
        paymentDetails.cardExpiry.length === 5 &&
        paymentDetails.cardCvv.length === 3 &&
        paymentDetails.cardName.length > 0
      );
    }
    return false;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      setError('Please fill all payment details correctly');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentComplete();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Payment Method</Typography>
      
      <FormControl component="fieldset">
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'upi' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="UPI ID"
            placeholder="username@upi"
            value={paymentDetails.upi}
            onChange={handlePaymentDetailsChange('upi')}
            margin="normal"
          />
        </Box>
      )}

      {paymentMethod === 'card' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailsChange('cardNumber')}
            margin="normal"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Expiry (MM/YY)"
              placeholder="MM/YY"
              value={paymentDetails.cardExpiry}
              onChange={handlePaymentDetailsChange('cardExpiry')}
            />
            <TextField
              label="CVV"
              type="password"
              value={paymentDetails.cardCvv}
              onChange={handlePaymentDetailsChange('cardCvv')}
            />
          </Box>
          <TextField
            fullWidth
            label="Name on Card"
            value={paymentDetails.cardName}
            onChange={handlePaymentDetailsChange('cardName')}
            margin="normal"
          />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onBack}
          disabled={processing}
        >
          Back
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentScreen;