import { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, Grid, Chip, useTheme, useMediaQuery, Button, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';

// Product Card and related components
const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const ProductImage = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '250px',
  backgroundColor: '#f5f5f5',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  overflow: 'hidden',
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const NutritionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
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

const Products = () => {
  const { addToCart } = useCart();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSticky, setIsSticky] = useState(false);
  
  // Refs for the section elements
  const tabsRef = useRef(null);
  const productsSectionRef = useRef(null);
  
  // Handle scroll event to manage sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current || !productsSectionRef.current) return;
      
      const headerHeight = 64; // Adjust based on your actual header height
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const productsSectionRect = productsSectionRef.current.getBoundingClientRect();
      const productsSectionBottom = productsSectionRect.bottom;
      
      // Make tabs sticky when scrolled to their position but still within products section
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
    return `/images/products/${filename}.jpg`;
  };

  // Product data
  const products = {
    'Pre-Workout': [
      {
        id: 'pre-1',
        name: 'TRIPLE-CHARGED MOCHA ENERGIZER',
        price: '₹190',
        protein: '8g',
        tags: ['HIGH ENERGY', 'WEIGHT LOSS'],
        benefits: 'Provides sustained, powerful energy for 2-3 hours with green tea\'s L-theanine balancing coffee\'s caffeine for focused energy without jitters.',
        nutrition: {
          'Calories': '110 kcal',
          'Protein': '8g',
          'Carbs': '12g',
          'Fat': '2.5g',
          'Caffeine': '~240mg'
        }
      },
      {
        id: 'pre-2',
        name: 'COFFEE CINNAMON PRE-WORKOUT',
        price: '₹170',
        protein: '8g',
        tags: ['ENERGY BOOST', 'WEIGHT LOSS'],
        benefits: 'Quick-acting caffeine boost with sustained release, enhanced focus and alertness, cinnamon helps stabilize blood sugar during workout.',
        nutrition: {
          'Calories': '95 kcal',
          'Protein': '8g',
          'Carbs': '10g',
          'Fat': '2g',
          'Calcium': '120mg',
          'Caffeine': '~90mg'
        }
      }
      // {
      //   id: 'pre-3',
      //   name: 'IMPROVED MASALA CHAI ENERGIZER',
      //   price: '₹170',
      //   protein: '7g',
      //   tags: ['MODERATE ENERGY', 'WEIGHT GAIN'],
      //   benefits: 'Sustained energy release for 1-2 hour workouts, sharper mental focus and reaction time, enhanced thermogenic effect for better calorie burn.',
      //   nutrition: {
      //     'Calories': '120 kcal',
      //     'Protein': '7g',
      //     'Carbs': '15g',
      //     'Fat': '3g',
      //     'Iron': '1.2mg',
      //     'Magnesium': '40mg'
      //   }
      // }
    ],
    'Post-Workout': [
      {
        id: 'post-1',
        name: 'MALAI KULFI THANDAI RECOVERY',
        price: '₹210',
        protein: '24g',
        tags: ['PREMIUM RECOVERY', 'WEIGHT GAIN'],
        benefits: 'Festival favorite with enhanced protein for superior recovery, authentic kulfi flavor with traditional adaptogens support post-workout stress management, cooling properties perfect for recovery after summer workouts.',
        nutrition: {
          'Calories': '175 kcal',
          'Protein': '24g',
          'Carbs': '8g',
          'Fat': '6g',
          'Calcium': '150mg',
          'Iron': '1.5mg'
        }
      },
      {
        id: 'post-2',
        name: 'ELECTROLYTE REPLENISHER',
        price: '₹175',
        protein: '24g',
        tags: ['HYDRATION', 'WEIGHT LOSS'],
        benefits: 'Rapidly replenishes electrolytes lost during sweating, perfect carb-to-protein ratio for optimal recovery, L-citrulline from watermelon reduces muscle soreness.',
        nutrition: {
          'Calories': '195 kcal',
          'Protein': '24g',
          'Carbs': '35g',
          'Fat': '0.5g',
          'Potassium': '680mg',
          'Vitamin C': '30mg'
        }
      },
      {
        id: 'post-3',
        name: 'CHOCOLATE BERRY RECOVERY',
        price: '₹185',
        protein: '24g',
        tags: ['ANTIOXIDANT BOOST', 'WEIGHT LOSS'],
        benefits: 'Strawberries provide vitamin C and antioxidants that accelerate recovery, cocoa flavanols improve blood flow to muscles, antioxidants reduce muscle soreness and inflammation.',
        nutrition: {
          'Calories': '195 kcal',
          'Protein': '24g',
          'Carbs': '22g',
          'Fat': '2.5g',
          'Vitamin C': '45mg',
          'Calcium': '200mg'
        }
      },
      {
        id: 'post-4',
        name: 'PROTEIN MANGO LASSI',
        price: '₹195',
        protein: '24g',
        tags: ['INDIAN FAVORITE', 'WEIGHT GAIN'],
        benefits: 'Perfect balance of carbs and protein for recovery, probiotics from yogurt support gut health and immunity, rich in vitamins A and C for immune system support.',
        nutrition: {
          'Calories': '195 kcal',
          'Protein': '24g',
          'Carbs': '20g',
          'Fat': '2.5g',
          'Calcium': '250mg',
          'Vitamin C': '40mg'
        }
      }
    ],
    'Meal Replacement': [
      {
        id: 'meal-1',
        name: 'COMPLETE CHHATTISGARHI NUTRITION',
        price: '₹245',
        protein: '30g',
        tags: ['REGIONAL SPECIAL', 'WEIGHT GAIN'],
        benefits: 'Combines traditional Chhattisgarhi nutrition with modern fitness science, exceptional protein content supports significant muscle building, complete amino acid profile from multiple protein sources.',
        nutrition: {
          'Calories': '285 kcal',
          'Protein': '30g',
          'Carbs': '22g',
          'Fat': '5g',
          'Iron': '3.5mg',
          'Calcium': '250mg'
        }
      },
      {
        id: 'meal-2',
        name: 'MALAI KULFI BANANA SHAKE',
        price: '₹250',
        protein: '27g',
        tags: ['DESSERT-INSPIRED', 'WEIGHT GAIN'],
        benefits: 'Dessert-like satisfaction with complete nutrition, traditional Indian flavors provide unique offering, excellent for weight gain and muscle building programs.',
        nutrition: {
          'Calories': '280 kcal',
          'Protein': '27g',
          'Carbs': '30g',
          'Fat': '6g',
          'Calcium': '300mg',
          'Potassium': '450mg'
        }
      },
      {
        id: 'meal-3',
        name: 'PEANUT BUTTER PROTEIN MAX',
        price: '₹240',
        protein: '30g',
        tags: ['MUSCLE BUILDER', 'WEIGHT GAIN'],
        benefits: 'Ideal macronutrient ratio for muscle building, complete amino acid profile for protein synthesis, balanced combination of simple and complex carbs, healthy monounsaturated fats support hormone production.',
        nutrition: {
          'Calories': '285 kcal',
          'Protein': '30g',
          'Carbs': '30g',
          'Fat': '8g',
          'Calcium': '300mg',
          'Zinc': '2mg'
        }
      }
    ],
    'Seasonal': [
      {
        id: 'seasonal-1',
        name: 'GREEN DETOX CLEANSE',
        price: '₹195',
        protein: '24g',
        tags: ['SUMMER SPECIAL', 'WEIGHT LOSS'],
        benefits: 'Perfect for summer detoxification, high fiber content supports digestive health, rich in antioxidants and vitamins for immune support.',
        nutrition: {
          'Calories': '185 kcal',
          'Protein': '24g',
          'Carbs': '12g',
          'Fat': '6g',
          'Fiber': '7g',
          'Vitamin K': '120μg'
        }
      }
    ]
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Container 
      sx={{ 
        pt: 10,
        pb: 8,
        position: 'relative',
        minHeight: '100vh'
      }}
      ref={productsSectionRef}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 4,
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
      
      {/* Tabs wrapper */}
      <Box 
        ref={tabsRef}
        sx={{ 
          position: 'relative',
          width: '100%',
          mb: 3
        }}
      >
        {/* Actual tabs - will be fixed or relative based on scroll position */}
        <Box
          sx={{
            position: isSticky ? 'fixed' : 'relative',
            top: isSticky ? '64px' : 'auto',
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
                  minWidth: { xs: 100, sm: 120 },
                  fontWeight: 600,
                  padding: { xs: '12px 8px', sm: '12px 16px' },
                },
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              {Object.keys(products).map((category) => (
                <Tab key={category} label={category} />
              ))}
            </Tabs>
          </Container>
        </Box>
        
        {/* Spacer div to prevent content jump when tabs are fixed */}
        {isSticky && (
          <Box sx={{ height: '48px' }} /> // Adjust height to match tabs height
        )}
      </Box>

      {/* Product grid with animations */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={tabValue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Grid container spacing={3} sx={{ px: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'flex-start' }}>
            {products[Object.keys(products)[tabValue]].map((product, index) => (
              <Grid 
              item 
              xs={12} 
              sm={6} 
              lg={3} 
              key={index}
              sx={{
                display: 'flex',
                maxWidth: { lg: '31.333%' }
              }}
            >
                <ProductCard elevation={2}>
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
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      gutterBottom 
                      sx={{ fontWeight: 'bold' }}
                    >
                      {product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
                      paragraph
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {product.benefits}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <NutritionChip 
                          key={key} 
                          label={`${key}: ${value}`}
                          size="small"
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                      fullWidth
                      sx={{
                        mt: 'auto',
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                        fontWeight: 'bold',
                        py: 1
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Products;