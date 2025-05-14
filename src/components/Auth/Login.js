import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = () => {
    // Here you would typically send OTP to the phone number
    setShowOtp(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(phoneNumber, otp);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
            type="tel"
            required
            disabled={showOtp}
          />
          {!showOtp ? (
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOtp}
              sx={{ mt: 2, bgcolor: '#07332c' }}
              disabled={!phoneNumber || loading}
            >
              Send OTP
            </Button>
          ) : (
            <>
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                margin="normal"
                type="number"
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2, bgcolor: '#07332c' }}
                disabled={!otp || loading}
              >
                Login
              </Button>
            </>
          )}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button color="primary" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;