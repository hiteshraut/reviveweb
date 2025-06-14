import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Modal, Button, TextField, Alert, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'; // NEW: Import arrow icons

// Function to generate unique coupon code
const generateCouponCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let coupon = '';
  for (let i = 0; i < length; i++) {
    coupon += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return coupon;
};

const gymPartners = [
  // {
  //   name: 'Elevate Gym',
  //   location: 'Samta Colony',
  //   description: 'Premium fitness facility with state-of-the-art equipment',
  //   tagline: 'Transform your body, elevate your life!',
  //   image: '/images/partners/gymimage-min.jpg',
  //   rating: 4.8,
  // },
  {
    name: 'SK 27 Gym',
    location: 'GE Road',
    description: 'Specialized in strength training and conditioning',
    tagline: 'Unleash your inner strength!',
    image: '/images/partners/gymimage-min.jpg',
    rating: 4.9,
  }
];

const saveToGoogleSheets = async (data) => {
  try {
    const formspreeURL = 'https://formspree.io/f/mpwrzqjo';
    
    const response = await fetch(formspreeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        timestamp: data.timestamp,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        gymName: data.gymName,
        discountCode: data.discountCode,
        subject: `New Gym Coupon Request - ${data.gymName}`
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error saving data:', error);
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwUoUvSSxjAMiwusQo7_ExSwWFv4eKSUGsoCVSne6ZNcq1jg7DdOEpOZWn_LTKzoFvawQ/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          timestamp: data.timestamp,
          customerName: data.customerName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          gymName: data.gymName,
          discountCode: data.discountCode
        })
      });
      
      return { success: true };
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw new Error('Failed to save data to any service');
    }
  }
};

const CouponPopup = ({ gym, open, onClose, onSave }) => {
  const [customerData, setCustomerData] = useState({
    customerName: '',
    phoneNumber: '',
    email: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!customerData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    if (!customerData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!customerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setSaveError('');
      
      const newCouponCode = generateCouponCode();
      setCouponCode(newCouponCode);
      
      const couponData = {
        timestamp: new Date().toISOString(),
        customerName: customerData.customerName,
        phoneNumber: customerData.phoneNumber,
        email: customerData.email,
        gymName: gym.name,
        discountCode: newCouponCode
      };
      
      try {
        await saveToGoogleSheets(couponData);
        onSave(couponData);
        setShowCoupon(true);
        
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setShowCoupon(false);
            setCustomerData({ customerName: '', phoneNumber: '', email: '' });
            setErrors({});
            setCouponCode('');
            onClose();
          }, 3000);
        }, 2000);
        
      } catch (error) {
        setSaveError('Failed to save your information. Please try again.');
        console.error('Save error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #07332c, #0a4f45)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #0a4f45, #07332c)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'float 4s ease-in-out infinite reverse'
          }}
        />

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
          `}
        </style>

        {!showSuccess && !showCoupon ? (
          <>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                mb: 2,
                background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Get Your Coupon!
            </Typography>

            <Box
              sx={{
                textAlign: 'center',
                mb: 3,
                p: 2,
                background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
                borderRadius: '12px',
                color: 'white'
              }}
            >
              <Typography variant="h6">{gym?.name}</Typography>
            </Box>

            {saveError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
                {saveError}
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={customerData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                error={!!errors.customerName}
                helperText={errors.customerName}
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#07332c'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#07332c'
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#07332c'
                  }
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={customerData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#07332c'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#07332c'
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#07332c'
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={customerData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#07332c'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#07332c'
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#07332c'
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                fullWidth
                onClick={onClose}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  border: '2px solid #07332c',
                  color: '#07332c',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'rgba(7, 51, 44, 0.1)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0a4f45 0%, #07332c 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(7, 51, 44, 0.3)'
                  },
                  '&:disabled': {
                    background: '#ccc',
                    color: '#666'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isLoading ? 'Saving...' : 'Get Coupon Code'}
              </Button>
            </Box>
          </>
        ) : showCoupon ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#07332c',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Your Coupon Code
            </Typography>
            
            <Box
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
                borderRadius: '16px',
                color: 'white',
                mb: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {gym?.name}
              </Typography>
              <Box
                sx={{
                  p: 2,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  border: '2px dashed rgba(255,255,255,0.5)'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}
                >
                  {couponCode}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Show this code at the gym to redeem your exclusive offer! Start your fitness journey today!
            </Typography>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Box
              sx={{
                fontSize: '60px',
                color: '#07332c',
                mb: 2,
                animation: 'bounce 1s ease-in-out'
              }}
            >
              🎉
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: '#07332c',
                fontWeight: 'bold',
                mb: 1
              }}
            >
              Coupon Generated Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your information has been saved and you can now use your coupon code at the gym.
            </Typography>

            <style>
              {`
                @keyframes bounce {
                  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                  40%, 43% { transform: translate3d(0, -20px, 0); }
                  70% { transform: translate3d(0, -10px, 0); }
                  90% { transform: translate3d(0, -4px, 0); }
                }
              `}
            </style>
          </motion.div>
        )}
      </motion.div>
    </Modal>
  );
};

const GymPartners = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gymPartners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleGetCoupon = (gym) => {
    setSelectedGym(gym);
    setPopupOpen(true);
  };

  const handleSaveCoupon = (data) => {
    console.log('Coupon data saved:', data);
  };

  // NEW: Functions to handle arrow navigation
  // const handlePrevSlide = () => {
  //   setActiveIndex((prev) => (prev - 1 + gymPartners.length) % gymPartners.length);
  // };

  // const handleNextSlide = () => {
  //   setActiveIndex((prev) => (prev + 1) % gymPartners.length);
  // };

  return (
    <Container sx={{ pt: 9, pb: 4 }} id="revive">
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 3,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}
      >
        Our Gym Partners
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 4, px: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: '#07332c',
            fontWeight: 'bold'
          }}
        >
          Kickstart Your Fitness Journey!
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', height: '500px', perspective: '1000px' }}>
        <AnimatePresence mode="popLayout">
          {gymPartners.map((gym, index) => {
            const distance = Math.abs(activeIndex - index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={gym.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '350px',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, x: '-50%', y: '-50%', rotateY: -90 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  x: `calc(-50% + ${(index - activeIndex) * 120}px)`,
                  y: '-50%',
                  rotateY: isActive ? 0 : 45,
                  scale: isActive ? 1 : 0.8,
                  zIndex: gymPartners.length - distance
                }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveIndex(index)}
              >
                <Card
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={gym.image}
                    alt={gym.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {gym.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {gym.location} • ⭐ {gym.rating}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#07332c',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {gym.tagline}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {gym.description}
                    </Typography>
                    
                    <Button
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetCoupon(gym);
                      }}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: '4px',
                        background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        height:'50px',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0a4f45 0%, #07332c 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(7, 51, 44, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Get Coupon Code
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* NEW: Navigation Arrows */}
        {/* <IconButton
          onClick={handlePrevSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: '10px', sm: '20px' },
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #0a4f45 0%, #07332c 100%)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          aria-label="Previous slide"
        >
          <ArrowBackIos sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
        </IconButton>
        <IconButton
          onClick={handleNextSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: '10px', sm: '20px' },
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, #07332c 0%, #0a4f45 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #0a4f45 0%, #07332c 100%)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          aria-label="Next slide"
        >
          <ArrowForwardIos sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
        </IconButton> */}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Don’t miss out! Grab your exclusive coupon and start training with the best gyms in town.
        </Typography>
      </Box>

      <CouponPopup
        gym={selectedGym}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSave={handleSaveCoupon}
      />
    </Container>
  );
};

export default GymPartners;