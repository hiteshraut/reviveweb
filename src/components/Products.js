import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  useTheme, 
  useMediaQuery, 
  Button, 
  Container,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products'; // Import products from the new data file

// Product Card and related components
const ProductCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const ProductCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  p: 2,
  '&:last-child': { pb: 2 },
  gap: 0.5,
}));

const ProductImage = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    display: 'block',
    paddingTop: '75%' // Changed from 100% to 75% for a 4:3 aspect ratio
  }
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
    transform: 'scale(1.1)'
  }
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

const FilterButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '20px',
  padding: '8px 32px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: active ? '#07332c' : '#f5f5f5',
  color: active ? '#fff' : '#07332c',
  border: '1px solid #07332c',
  '&:hover': {
    backgroundColor: active ? '#0a4f45' : '#e0e0e0',
    color: active ? '#fff' : '#07332c',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 36px',
    fontSize: '0.85rem',
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
  }
}));

const Products = () => {
  const { addToCart, removeFromCart, cartItems, updateCartItemQuantity } = useCart();
  const [tabValue, setTabValue] = useState(0);
 // const [showAll, setShowAll] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  // Function to get cart item quantity
  const getCartItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Refs for the section elements
  const tabsRef = useRef(null);
  const productsSectionRef = useRef(null);
  
  // Handle scroll event to manage sticky state
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
    setTabValue(newValue);
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

  // Get all products for the "All" tab
  const allProducts = Object.values(products).flat();

  // Handle filter button navigation
  const handleFilterClick = (filterType) => {
    navigate(`/goals/${filterType.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Get current products based on selected tab
  const getCurrentProducts = () => {
    let currentProducts = tabValue === 0 ? allProducts : products[Object.keys(products)[tabValue - 1]];
    
    // if (!showAll && currentProducts.length > 6) {
    //   return currentProducts.slice(0, 6);
    // }
    return currentProducts;
  };

  // const handleViewAllClick = () => {
  //   setShowAll(!showAll);
  // };

  // const currentProducts = getCurrentProducts();
 // const totalProducts = tabValue === 0 ? allProducts.length : products[Object.keys(products)[tabValue - 1]].length;

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
            py: 1
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
      <Container sx={{ pt: 10, pb: 6, position: 'relative', minHeight: '100vh' }} ref={productsSectionRef} id="products">
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
            fontWeight: 'bold'
          }}
        >
          Our Menu
        </Typography>

        {/* Filter Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 4,
          flexWrap: 'wrap'
        }}>
          <FilterButton
            onClick={() => handleFilterClick('WEIGHT GAIN')}
          >
            Weight Gain
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterClick('WEIGHT LOSS')}
          >
           Weight Loss
          </FilterButton>
        </Box>
        
        {/* Tabs wrapper */}
        <Box 
          ref={tabsRef}
          sx={{ 
            position: 'relative',
            width: '100%',
            mb: 3
          }}
        >
          {/* Actual tabs */}
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
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons={isMobile ? 'auto' : false}
                allowScrollButtonsMobile
                aria-label="product categories"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  '& .MuiTabs-flexContainer': {
                    justifyContent: { xs: 'flex-start', md: 'center' },
                  },
                  '& .MuiTab-root': {
                    minWidth: { xs: 80, sm: 100 },
                    fontWeight: 600,
                    padding: { xs: '8px 12px', sm: '12px 16px' },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                  },
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Tab label="All" />
                {Object.keys(products).map((category) => (
                  <Tab key={category} label={category} />
                ))}
              </Tabs>
            </Container>
          </Box>
          {isSticky && <Box sx={{ height: '48px' }} />}
        </Box>

        <AnimatePresence mode='wait'>
          <motion.div
            key={tabValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
              {getCurrentProducts().map((product) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={product.id} 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: { md: '33.333%' }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', maxWidth: '350px' }}
                  >
                    <ProductCard 
                      sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductImage>
                        <ProteinTag
                          label={`Protein: ${product.protein}`}
                          size="small"
                        />
                        <StyledImage
                          src={getImageUrl(product.name)}
                          alt={product.name}
                          loading="lazy"
                        />
                      </ProductImage>
                      <ProductCardContent>
                        <Typography 
                          variant="h6" 
                          sx={{
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            lineHeight: { xs: 1.4, sm: 1.6 },
                            mb: 0.5
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
                                fontWeight: 600
                              }}
                            />
                          ))}
                        </Box>
                        <Typography 
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {product.benefits}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {Object.entries(product.nutrition).map(([key, value]) => (
                            <NutritionChip 
                              key={key} 
                              label={`${key}: ${value}`}
                              size="small"
                              sx={{
                                marginLeft: 0
                              }}
                            />
                          ))}
                        </Box>
                        {/* Spacer to push cart controls to bottom */}
                        <Box sx={{ flexGrow: 1 }} />
                        {/* Cart controls container with fixed height */}
                        <Box sx={{ height: '50px', mt: 1 }}>
                          {renderCartControls(product)}
                        </Box>
                      </ProductCardContent>
                    </ProductCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            {/* {totalProducts > 6 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleViewAllClick}
                  sx={{
                    backgroundColor: '#07332c',
                    height: '50px',
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: '#0a4f45'
                    }
                  }}
                >
                  {showAll ? 'Show Less' : 'View All'}
                </Button>
              </Box>
            )} */}
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

export default Products;