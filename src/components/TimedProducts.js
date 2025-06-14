import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  Chip, 
  useTheme, 
  useMediaQuery,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

// Updated ProductCard with consistent height
const ProductCard = styled(motion.div)(({ theme }) => ({
  width: '100%',
  maxWidth: { xs: '100%', sm: '350px' },
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  boxShadow: theme.shadows[2],
  backgroundColor: '#fff',
  borderRadius: '8px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  // Consistent height for desktop, auto for mobile
  [theme.breakpoints.up('md')]: {
    height: '100%', // Let grid control the height
    minHeight: '650px', // Minimum height for consistency
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    minHeight: '500px',
  },
}));

const ProductImage = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  flexShrink: 0, // Prevent image from shrinking
  '&:before': {
    content: '""',
    display: 'block',
    paddingTop: '75%',
  },
}));

const StyledImage = styled('img')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const NutritionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: '#fff',
  color: '#07332c',
  border: '1px solid #07332c',
  '&:hover': {
    backgroundColor: '#07332c',
    color: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '24px',
  },
}));

const ProteinTag = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  zIndex: 1,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  padding: '4px',
  border: `2px solid ${theme.palette.primary.main}`,
  height: '50px',
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  width: '36px',
  height: '36px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#999',
  }
}));

// New styled component for content area with flexible layout
const ProductContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(0.5),
  minHeight: 0, // Allow content to shrink if needed
}));

// Styled component for main content that can expand
const FlexibleContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flexGrow: 1, // This will make content expand to fill available space
  minHeight: 0,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            px: { xs: 0, sm: 3 }, // Remove left/right padding on mobile (xs), keep default on sm and above
            py: 3, // Preserve vertical padding
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TimedProducts = () => {
  const [value, setValue] = useState(0); // 0 for Pre-Workout, 1 for Post-Workout
  const [isSticky, setIsSticky] = useState(false);
  const [showAllPre, setShowAllPre] = useState(false);
  const [showAllPost, setShowAllPost] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, updateCartItemQuantity } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabsRef = useRef(null);
  const productsSectionRef = useRef(null);
  const preWorkoutButtonRef = useRef(null);
  const postWorkoutButtonRef = useRef(null);

  // Function to get cart item quantity
  const getCartItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 10) {
      setValue(0); // Pre-Workout
    } else if (currentHour >= 10 && currentHour < 20) {
      setValue(1); // Post-Workout
    } else {
      setValue(0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current || !productsSectionRef.current) return;
      
      const headerHeight = 64;
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const productsSectionRect = productsSectionRef.current.getBoundingClientRect();
      const productsSectionBottom = productsSectionRect.bottom;
      
      if (tabsRect.top <= headerHeight && productsSectionBottom > headerHeight) {
        if (!isSticky) setIsSticky(true);
      } else {
        if (isSticky) setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getImageUrl = (name) => {
    const filename = name.toLowerCase().replace(/\s+/g, '-');
    return `/images/products/${filename}.png?=1`;
  };

  const showToast = (message, severity = 'success') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  // FIXED: Updated handleAddToCart with proper event handling
  const handleAddToCart = (product, event) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  // FIXED: Updated handleIncreaseQuantity with proper event handling
  const handleIncreaseQuantity = (product, event) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    addToCart(product);
    const newQuantity = getCartItemQuantity(product.id) + 1;
    showToast(`${product.name} quantity updated to ${newQuantity}`, 'success');
  };

  // FIXED: Updated handleDecreaseQuantity function to properly handle quantity decrease
  const handleDecreaseQuantity = (product, event) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    const currentQuantity = getCartItemQuantity(product.id);
    
    if (currentQuantity > 1) {
      // If quantity is more than 1, decrease by 1
      // Check if updateCartItemQuantity exists in your CartContext
      if (updateCartItemQuantity) {
        updateCartItemQuantity(product.id, currentQuantity - 1);
      } else {
        // Alternative method: remove the item and add it back with quantity - 1
        removeFromCart(product.id);
        for (let i = 0; i < currentQuantity - 1; i++) {
          addToCart(product);
        }
      }
      showToast(`${product.name} quantity updated to ${currentQuantity - 1}`, 'info');
    } else if (currentQuantity === 1) {
      // If quantity is 1, remove the item completely
      removeFromCart(product.id);
      showToast(`${product.name} removed from cart`, 'info');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const morningProducts = products['Pre-Workout'] || [];
  const afternoonProducts = products['Post-Workout'] || [];

  const getCurrentPreWorkoutProducts = () => {
    if (!showAllPre && morningProducts.length > 2) {
      return morningProducts.slice(0, 2);
    }
    return morningProducts;
  };

  const getCurrentPostWorkoutProducts = () => {
    if (!showAllPost && afternoonProducts.length > 2) {
      return afternoonProducts.slice(0, 2);
    }
    return afternoonProducts;
  };

  const handleViewAllPreClick = () => {
    const newShowAllPre = !showAllPre;
    setShowAllPre(newShowAllPre);
    if (newShowAllPre === false && preWorkoutButtonRef.current) {
      setTimeout(() => {
        preWorkoutButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleViewAllPostClick = () => {
    const newShowAllPost = !showAllPost;
    setShowAllPost(newShowAllPost);
    if (newShowAllPost === false && postWorkoutButtonRef.current) {
      setTimeout(() => {
        postWorkoutButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // FIXED: Updated renderCartControls function with better event handling
  const renderCartControls = (product) => {
    const quantity = getCartItemQuantity(product.id);
    
    if (quantity === 0) {
      return (
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={(e) => handleAddToCart(product, e)}
          fullWidth
          sx={{
            bgcolor: theme.palette.primary.main,
            height: '50px',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            fontSize: '14px',
            fontWeight: 'bold',
            py: 1,
          }}
        >
          Add to Cart
        </Button>
      );
    }

    return (
      <QuantityControl
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <QuantityButton
          onClick={(e) => handleDecreaseQuantity(product, e)}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          size="small"
        >
          <RemoveIcon fontSize="small" />
        </QuantityButton>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            minWidth: '40px',
            textAlign: 'center',
            userSelect: 'none'
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {quantity}
        </Typography>
        
        <QuantityButton
          onClick={(e) => handleIncreaseQuantity(product, e)}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          size="small"
        >
          <AddIcon fontSize="small" />
        </QuantityButton>
      </QuantityControl>
    );
  };

  return (
    <>
      <Container sx={{ pt: 10, pb: 0, position: 'relative', minHeight: '100vh' }} ref={productsSectionRef}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Products for Your Day
        </Typography>

        <Box
          ref={tabsRef}
          sx={{
            position: 'relative',
            width: '100%',
            mb: 0,
          }}
        >
          <Box
            sx={{
              position: isSticky ? 'fixed' : 'relative',
              top: isSticky ? '55px' : 'auto',
              left: isSticky ? 0 : 'auto',
              right: isSticky ? 0 : 'auto',
              width: '100%',
              zIndex: 1100,
              backgroundColor: '#fff',
              boxShadow: isSticky ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Container maxWidth="lg" disableGutters>
              <Tabs
                value={value}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons={isMobile ? 'auto' : false}
                allowScrollButtonsMobile
                aria-label="timed product tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                  },
                  '& .MuiTab-root': {
                    flex: '1 0 50%',
                    maxWidth: '50%',
                    minWidth: 0,
                    fontWeight: 600,
                    padding: { xs: '8px 12px', sm: '12px 16px' },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                  },
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Tab label="Pre-Workout" {...a11yProps(0)} />
                <Tab label="Post-Workout" {...a11yProps(1)} />
              </Tabs>
            </Container>
          </Box>
          {isSticky && <Box sx={{ height: '48px' }} />}
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabPanel value={value} index={0}>
              <Grid container spacing={3} sx={{ mt: 0, justifyContent: 'center', alignItems: 'stretch' }}>
                {getCurrentPreWorkoutProducts().map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ProductCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        width: '100%',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductImage>
                        <ProteinTag label={`Protein: ${product.protein}`} size="small" />
                        <StyledImage
                          src={getImageUrl(product.name)}
                          alt={product.name}
                          loading="lazy"
                        />
                      </ProductImage>
                      
                      <ProductContent>
                        <FlexibleContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.25rem' },
                              lineHeight: { xs: 1.4, sm: 1.6 },
                              mb: 0.5,
                            }}
                          >
                            {product.name}
                          </Typography>
                          
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold', mb: 0.5 }}
                          >
                            {product.price}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                            {product.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(7, 51, 44, 0.1)',
                                  color: '#07332c',
                                  fontWeight: 600,
                                }}
                              />
                            ))}
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 0.5,
                              lineHeight: 1.5,
                            }}
                          >
                            {product.benefits}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 0.5, 
                            mb: 1,
                          }}>
                            {Object.entries(product.nutrition).map(([key, value]) => (
                              <NutritionChip
                                key={key}
                                label={`${key}: ${value}`}
                                size="small"
                                sx={{ marginLeft: 0 }}
                              />
                            ))}
                          </Box>
                        </FlexibleContent>
                        
                        {/* Cart controls container with fixed height - always at bottom */}
                        <Box sx={{ height: '50px', mt: 'auto', flexShrink: 0 }}>
                          {renderCartControls(product)}
                        </Box>
                      </ProductContent>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
              {morningProducts.length > 2 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    ref={preWorkoutButtonRef}
                    variant="contained"
                    onClick={handleViewAllPreClick}
                    sx={{
                      backgroundColor: '#07332c',
                      height: '50px',
                      fontSize: '14px',
                      '&:hover': {
                        backgroundColor: '#0a4f45',
                      },
                    }}
                  >
                    {showAllPre ? 'Show Less' : 'View All Pre-Workout Products'}
                  </Button>
                </Box>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
                {getCurrentPostWorkoutProducts().map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'stretch', // This ensures all cards stretch to same height
                    }}
                  >
                    <ProductCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        width: '100%',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductImage>
                        <ProteinTag label={`Protein: ${product.protein}`} size="small" />
                        <StyledImage
                          src={getImageUrl(product.name)}
                          alt={product.name}
                          loading="lazy"
                        />
                      </ProductImage>
                      
                      <ProductContent>
                        <FlexibleContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.25rem' },
                              lineHeight: { xs: 1.4, sm: 1.6 },
                              mb: 0.5,
                              minHeight: { md: '3rem' }, // Consistent title height on desktop
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}
                          >
                            {product.name}
                          </Typography>
                          
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 'bold', mb: 0.5 }}
                          >
                            {product.price}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5, minHeight: { md: '2rem' } }}>
                            {product.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(7, 51, 44, 0.1)',
                                  color: '#07332c',
                                  fontWeight: 600,
                                }}
                              />
                            ))}
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 0.5,
                              minHeight: { md: '3rem' }, // Consistent benefits height on desktop
                              display: '-webkit-box',
                              WebkitLineClamp: { xs: 'none', md: 3 },
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {product.benefits}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 0.5, 
                            mb: 1,
                            minHeight: { md: '4rem' }, // Consistent nutrition height on desktop
                            alignContent: 'flex-start'
                          }}>
                            {Object.entries(product.nutrition).map(([key, value]) => (
                              <NutritionChip
                                key={key}
                                label={`${key}: ${value}`}
                                size="small"
                                sx={{ marginLeft: 0 }}
                              />
                            ))}
                          </Box>
                        </FlexibleContent>
                        
                        {/* Spacer to push cart controls to bottom */}
                        <Box sx={{ flexGrow: 1 }} />
                        
                        {/* Cart controls container with fixed height */}
                        <Box sx={{ height: '50px', mt: 1, flexShrink: 0 }}>
                          {renderCartControls(product)}
                        </Box>
                      </ProductContent>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
              {afternoonProducts.length > 2 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    ref={postWorkoutButtonRef}
                    variant="contained"
                    onClick={handleViewAllPostClick}
                    sx={{
                      backgroundColor: '#07332c',
                      height: '50px',
                      fontSize: '14px',
                      '&:hover': {
                        backgroundColor: '#0a4f45',
                      },
                    }}
                  >
                    {showAllPost ? 'Show Less' : 'View All Post-Workout Products'}
                  </Button>
                </Box>
              )}
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              fontWeight: 600
            }
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TimedProducts;