import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Button, 
  IconButton,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { products } from '../data/products';

// Updated ProductCard with consistent height (same as TimedProducts)
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
    height: '24px'
  }
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

// New styled components from TimedProducts
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

const GoalProducts = () => {
  const { goalId } = useParams();
  const { addToCart, removeFromCart, cartItems, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  // Add useEffect to scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to get cart item quantity
  const getCartItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Updated goalProducts to include all products based on tags
  const goalProducts = {
    'weight-gain': [
      'NUTTY COFFEE BLAST',
      'CARAMEL COFFEE ENERGIZER',
      'MALAI KULFI THANDAI RECOVERY',
      'PROTEIN MANGO LASSI',
      'COOKIE DOUGH RECOVERY',
      'PEANUT BUTTER PROTEIN MAX',
      'COMPLETE CHHATTISGARHI NUTRITION',
      'MALAI KULFI BANANA SHAKE',
      'OVERNIGHT OATS PROTEIN MEAL',
      'MALAI KULFI FESTIVAL TREAT',
      'COCONUT BLUEBERRY MUFFIN DELIGHT',
      'TROPICAL MANGO SMOOTHIE'
    ],
    'weight-loss': [
      'TRIPLE-CHARGED MOCHA ENERGIZER',
      'COFFEE CINNAMON PRE-WORKOUT',
      'ELECTROLYTE REPLENISHER',
      'CHOCOLATE BERRY RECOVERY',
      'GREEN DETOX CLEANSE',
      'WATERMELON MINT REFRESHER',
      'COCONUT LIME COOLER'
    ],
    'general-fitness': [
      'COFFEE CINNAMON PRE-WORKOUT',
      'CHOCOLATE BERRY RECOVERY',
      'PEANUT BUTTER PROTEIN MAX'
    ]
  };

  const getImageUrl = (name) => {
    const filename = name.toLowerCase().replace(/\s+/g, '-');
    return `/images/products/${filename}.png?=1`;
  };

  // Access products from the imported data (same as TimedProducts)
  const filteredProducts = Object.values(products)
    .flat()
    .filter(product => goalProducts[goalId]?.includes(product.name));

  const goalTitles = {
    'weight-gain': 'Weight Gain',
    'weight-loss': 'Weight Loss',
    'general-fitness': 'General Fitness'
  };

  // Toast functions
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

  // Cart handling functions (same as TimedProducts)
  const handleAddToCart = (product, event) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

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

  const handleDecreaseQuantity = (product, event) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    const currentQuantity = getCartItemQuantity(product.id);
    
    if (currentQuantity > 1) {
      // If quantity is more than 1, decrease by 1
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

  // Render cart controls function (same as TimedProducts)
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
      <Header />
      <Container sx={{ pt: 10, pb: 15 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ mb: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />  <span>Back</span>
          </IconButton>
        </Box>
        
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold'
          }}
        >
          {goalTitles[goalId]} Shakes
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
          {filteredProducts.map((product, index) => (
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <ProductCard
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
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 0.5, 
                        mb: 0.5,
                        minHeight: { md: '2rem' }
                      }}>
                        {product.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(7, 51, 44, 0.1)',
                              color: '#07332c',
                              fontWeight: 600
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
                    
                    {/* Cart controls container with fixed height - always at bottom */}
                    <Box sx={{ height: '50px', mt: 'auto', flexShrink: 0 }}>
                      {renderCartControls(product)}
                    </Box>
                  </ProductContent>
                </ProductCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
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

export default GoalProducts;