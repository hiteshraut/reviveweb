import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Link,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login, signup, forgotPassword, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSuccessfulAuth = () => {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get('redirect');
    if (redirectTo === 'checkout') {
      navigate('/checkout');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      await forgotPassword(phone);
      return;
    }
    
    const success = isLogin 
      ? await login(phone, password)
      : await signup(phone, password, name);

    if (success) {
      handleSuccessfulAuth();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Login' : 'Sign Up')}
          </Typography>
          
          {!isForgotPassword && (
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={(e, v) => setIsLogin(v === 0)}
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && !isForgotPassword && (
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
            )}
            
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              required
              type="tel"
            />
            
            {!isForgotPassword && (
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
            )}

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 
                (isForgotPassword ? 'Reset Password' : 
                  (isLogin ? 'Login' : 'Sign Up'))}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsForgotPassword(!isForgotPassword)}
              >
                {isForgotPassword ? 'Back to Login' : 'Forgot Password?'}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Auth;