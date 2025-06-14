import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { styled } from '@mui/material/styles';
import Header from './Header';
import { products } from '../data/products';
import { Superscript } from '@mui/icons-material';

// Styled components
const ProductImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '280px',
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const ProteinTag = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  zIndex: 1,
  fontWeight: 600,
  fontSize: '16px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NutritionChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(7, 51, 44, 0.08)',
  color: theme.palette.primary.main,
  margin: theme.spacing(0.5),
  '& .MuiChip-label': {
    fontWeight: 600
  }
}));

const ComparisonTable = styled(motion.div)(({ theme }) => ({
  marginTop: theme.spacing(6),
  backgroundColor: 'rgba(7, 51, 44, 0.05)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  overflow: 'hidden'
}));

const NutritionTable = styled(motion.div)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: 'rgba(7, 51, 44, 0.05)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  overflow: 'hidden'
}));

const TableRow = styled(motion.div)(({ theme, isHeader }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr', // Match ComparisonTable's column proportions
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: isHeader ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(7, 51, 44, 0.1)',
  '& > *': {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word', // Allow text to wrap to prevent overflow
    overflowWrap: 'break-word', // Ensure long words wrap
    whiteSpace: 'normal', // Allow text to wrap to multiple lines
  }
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
  width: '100%'
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

const FixedButtonContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '56px',
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: 'white',
  zIndex: 1000,
  boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    position: 'static',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    padding: theme.spacing(0),
    marginTop: theme.spacing(3)
  }
}));

// Comparison data for different categories
const comparisonData = {
  'Pre-Workout': {
    title: 'REVIVE vs. COMMERCIAL PRE-WORKOUTS',
    data: [
      { feature: 'Energy Source', revive: 'Natural coffee + peanut butter', commercial: 'Synthetic caffeine + artificial stimulants' },
      { feature: 'Protein Content', revive: '12-13g complete protein', commercial: '0-5g incomplete amino acids' },
      { feature: 'Nutritional Profile', revive: 'Complete macro and micronutrient profile', commercial: 'Limited to performance ingredients' },
      { feature: 'Sweeteners', revive: 'Natural stevia', commercial: 'Artificial sweeteners' },
      { feature: 'Digestive Comfort', revive: 'Gentle on stomach', commercial: 'May cause digestive discomfort' },
      { feature: 'Crash Effect', revive: 'Minimal due to balanced release', commercial: 'Often severe due to stimulant stack' }
    ],
    benefits: [
      'Natural ingredient profile',
      'Better overall nutrition',
      'Sustained energy without crash',
      'Supports muscle preservation',
      'No artificial colors, flavors or sweeteners',
      'Transparency in ingredient sourcing'
    ]
  },
  'Post-Workout': {
    title: 'REVIVE vs. COMMERCIAL POST-WORKOUT RECOVERY DRINKS',
    data: [
      { feature: 'Protein Quality', revive: 'Complete amino acid profile with 24g high-quality protein', commercial: 'Often contains 15-20g incomplete protein with lower bioavailability' },
      { feature: 'Recovery Timing', revive: 'Scientifically optimized 2:1 or 1:1 protein-to-carb ratios', commercial: 'Generic ratios that may not match individual recovery needs' },
      { feature: 'Antioxidant Power', revive: 'Natural antioxidants from real fruits and spices', commercial: 'Synthetic antioxidants with limited bioavailability' },
      { feature: 'Electrolyte Balance', revive: 'Complete natural electrolyte profile from whole foods', commercial: 'Artificial electrolyte blends with excessive sodium' },
      { feature: 'Digestive Support', revive: 'Probiotics from yogurt and gentle whole food ingredients', commercial: 'May contain artificial additives causing discomfort' },
      { feature: 'Sustained Energy', revive: 'Complex carbohydrates and healthy fats for extended replenishment', commercial: 'Simple sugars that cause energy crashes' }
    ],
    benefits: [
      'Superior bioavailability from real food sources',
      'Complete recovery addressing all aspects simultaneously',
      'Traditional wisdom with time-tested ingredients',
      'Clean label with no artificial preservatives',
      'Metabolic support for specific goals',
      'Authentic flavors making recovery enjoyable'
    ]
  },
  'Meal Replacement': {
    title: 'REVIVE vs. COMMERCIAL MEAL REPLACEMENTS',
    data: [
      { feature: 'Nutritional Completeness', revive: 'Complete macro and micronutrient profile with 27-30g protein', commercial: 'Often lack essential micronutrients or incomplete amino acids' },
      { feature: 'Natural Ingredients', revive: 'Real food ingredients like soaked nuts and fresh fruits', commercial: 'Heavily processed with artificial fillers and synthetic compounds' },
      { feature: 'Digestive Health', revive: 'Gentle on stomach with natural fiber and probiotics', commercial: 'May cause digestive discomfort from artificial sweeteners' },
      { feature: 'Sustained Energy', revive: 'Balanced slow-release carbohydrates provide 4-5 hours energy', commercial: 'Quick energy spike followed by crash from simple sugars' },
      { feature: 'Authentic Flavors', revive: 'Regional flavors using real ingredients like saffron and cardamom', commercial: 'Artificial flavoring that doesn\'t match natural taste profiles' },
      { feature: 'Bioavailability', revive: 'Enhanced nutrient absorption through natural food combinations', commercial: 'Synthetic vitamins and minerals with lower absorption rates' }
    ],
    benefits: [
      'Premium nutrition with restaurant-quality taste',
      'Whole food nutrition with enhanced bioavailability',
      'Provides lasting energy and satisfaction',
      'Supports long-term health with functional ingredients',
      'Cultural integration with traditional superfoods',
      'Customizable for different fitness goals'
    ]
  },
  'Seasonal': {
    title: 'REVIVE vs. COMMERCIAL POST-WORKOUT RECOVERY DRINKS',
    data: [
      { feature: 'Protein Quality', revive: 'Complete amino acid profile with 24g high-quality protein', commercial: 'Often contains 15-20g incomplete protein with lower bioavailability' },
      { feature: 'Recovery Timing', revive: 'Scientifically optimized 2:1 or 1:1 protein-to-carb ratios', commercial: 'Generic ratios that may not match individual recovery needs' },
      { feature: 'Antioxidant Power', revive: 'Natural antioxidants from real fruits and spices', commercial: 'Synthetic antioxidants with limited bioavailability' },
      { feature: 'Electrolyte Balance', revive: 'Complete natural electrolyte profile from whole foods', commercial: 'Artificial electrolyte blends with excessive sodium' },
      { feature: 'Digestive Support', revive: 'Probiotics from yogurt and gentle whole food ingredients', commercial: 'May contain artificial additives causing discomfort' },
      { feature: 'Sustained Energy', revive: 'Complex carbohydrates and healthy fats for extended replenishment', commercial: 'Simple sugars that cause energy crashes' }
    ],
    benefits: [
      'Superior bioavailability from real food sources',
      'Complete recovery addressing all aspects simultaneously',
      'Traditional wisdom with time-tested ingredients',
      'Clean label with no artificial preservatives',
      'Metabolic support for specific goals',
      'Authentic flavors making recovery enjoyable'
    ]
  }
};

// Nutrition key benefits mapping based on PDF
const nutritionKeyBenefits = {
  'Calories': {
    'Pre-Workout': 'Energy for workout',
    'Post-Workout': 'Recovery energy',
    'Seasonal': 'Hydrating energy',
    'Meal Replacement': 'Complete meal energy'
  },
  'Protein': {
    'Pre-Workout': 'Muscle building',
    'Post-Workout': 'Muscle repair',
    'Seasonal': 'Muscle maintenance',
    'Meal Replacement': 'Superior muscle building'
  },
  'Carbohydrates': {
    'Pre-Workout': 'Quick energy',
    'Post-Workout': 'Glycogen replenishment',
    'Seasonal': 'Quick hydration',
    'Meal Replacement': 'Sustained energy'
  },
  'Dietary Fiber': 'Digestive health',
  'Total Fat': {
    'Pre-Workout': 'Sustained energy',
    'Post-Workout': 'Sustained energy',
    'Seasonal': 'Light energy',
    'Meal Replacement': 'Balanced nutrition'
  },
  'Omega-3 Fatty Acids': {
    'Pre-Workout': 'Brain health',
    'Post-Workout': 'Anti-inflammatory',
    'Seasonal': 'Brain health',
    'Meal Replacement': 'Exceptional brain health'
  },
  'Natural Sugars': 'Natural sweetness',
  'Water Content': 'Superior hydration',
  'Calcium': 'Bone health, muscle function',
  'Iron': 'Energy production, oxygen transport',
  'Magnesium': 'Muscle function, energy metabolism',
  'Phosphorus': 'Energy metabolism, bone health',
  'Potassium': 'Heart health, muscle function',
  'Zinc': 'Immune function, protein synthesis',
  'Vitamin E': 'Antioxidant, cell protection',
  'Selenium': 'Antioxidant enzyme function',
  'Manganese': 'Antioxidant enzymes',
  'Niacin (B3)': 'Energy metabolism',
  'Copper': 'Antioxidant enzymes',
  'Vitamin A': 'Eye health, immune function',
  'Vitamin C': 'Antioxidant, immune support',
  'Vitamin B12': 'Energy metabolism',
  'Probiotics': 'Gut health, immune support',
  'Beta-Carotene': 'Antioxidant protection',
  'Lycopene': 'Powerful antioxidant',
  'Vitamin B1': 'Energy metabolism',
  'Vitamin B6': 'Protein metabolism',
  'Vitamin D': 'Bone health, immune function'
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, updateCartItemQuantity } = useCart();
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

  // Toast handling
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
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    addToCart(product);
    const newQuantity = getCartItemQuantity(product.id) + 1;
    showToast(`${product.name} added to cart! Quantity: ${newQuantity}`, 'success');
  };

  const handleIncreaseQuantity = (product, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    addToCart(product);
    const newQuantity = getCartItemQuantity(product.id) + 1;
    showToast(`${product.name} quantity updated to ${newQuantity}`, 'success');
  };

  const handleDecreaseQuantity = (product, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    const currentQuantity = getCartItemQuantity(product.id);
    
    if (currentQuantity > 1) {
      if (updateCartItemQuantity) {
        updateCartItemQuantity(product.id, currentQuantity - 1);
      } else {
        removeFromCart(product.id);
        for (let i = 0; i < currentQuantity - 1; i++) {
          addToCart(product);
        }
      }
      showToast(`${product.name} quantity updated to ${currentQuantity - 1}`, 'info');
    } else if (currentQuantity === 1) {
      removeFromCart(product.id);
      showToast(`${product.name} removed from cart`, 'info');
    }
  };

  // Render cart controls
  const renderCartControls = (product) => {
    const quantity = getCartItemQuantity(product.id);
    
    if (quantity === 0) {
      return (
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={(e) => handleAddToCart(product, e)}
          sx={{
            height: '50px',
            width: '100%',
            bgcolor: '#07332c',
            '&:hover': {
              bgcolor: '#0a4f45'
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
            color: 'primary.main',
            minWidth: '40px',
            textAlign: 'center',
            userSelect: 'none',
            flexGrow: 1
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

  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <Container sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" align="center">Product not found</Typography>
      </Container>
    );
  }

  // Get comparison data based on product category
  const currentComparison = comparisonData[product.category];

  // Split nutrition data into macronutrients and vitamins/minerals
  const macroNutrients = Object.entries(product.nutrition || {}).filter(([key]) => 
    ['Calories', 'Protein', 'Carbohydrates', 'Dietary Fiber', 'Total Fat', 'Omega-3 Fatty Acids', 'Natural Sugars', 'Water Content'].includes(key)
  );
  const vitaminsMinerals = Object.entries(product.nutrition || {}).filter(([key]) => 
    !['Calories', 'Protein', 'Carbohydrates', 'Dietary Fiber', 'Total Fat', 'Omega-3 Fatty Acids', 'Natural Sugars', 'Water Content'].includes(key)
  );

  // Additional enhancers for specific products
  const additionalEnhancers = {
    'post-2': [
      { name: 'Probiotics', value: '2.2 billion CFU', benefit: 'Gut health, immune support' },
      { name: 'Digestive Enzymes', value: 'Enhanced (from fennel)', benefit: '' },
      { name: 'Beta-Carotene', value: 'High', benefit: 'Antioxidant protection' }
    ],
    'post-4': [
      { name: 'Probiotics', value: '1 billion CFU', benefit: 'Gut health, immune support' },
      { name: 'Combined Omega-3s', value: '', benefit: 'Optimize post-workout recovery and reduce inflammation' }
    ],
    'meal-2': [
      { name: 'Beta-Glucan', value: 'from oats', benefit: 'Immune support, cholesterol management' },
      { name: 'Quercetin', value: 'from apples', benefit: 'Anti-inflammatory, antioxidant' },
      { name: 'Vitamin E', value: 'from almonds', benefit: 'Cell protection' }
    ]
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container sx={{ pt: 8, pb: 18 }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ mb: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />  <span>Back</span>
          </IconButton>

          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <ProductImageContainer>
                <ProteinTag
                  label={`Protein: ${product.protein}`}
                  size="medium"
                />
                <ProductImage 
                  src={`/images/products/${product.name.toLowerCase().replace(/ /g, '-')}.png`}
                  alt={product.name}
                />
              </ProductImageContainer>
            </Grid>
           
            <Grid item xs={12} md={6}>
              
              <Typography variant="h3" component="h1" gutterBottom>
                {product.name}
              </Typography>
              
              <Box sx={{ 
                display: { xs: 'block', md: 'flex' }, 
                alignItems: 'center', 
                mb: 2,
                gap: 2
              }}>
                <Typography variant="h4" color="primary" mb={2}>
                  {product.price}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, }}>
                  {product.tags.map((tag, index) => (
                    <NutritionChip key={index} label={tag} sx={{marginLeft: '0' }} />
                  ))}
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Key Benefits
              </Typography>
              <Typography component="p" variant="body1" sx={{ mb: 3 }}>
                {product.benefits}
              </Typography>
             
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                * All nutritional values are approximate and may vary slightly.
              </Typography>
              
              {macroNutrients.length > 0 && (
                <NutritionTable
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    Complete Nutrition Information
                  </Typography>
                  <TableRow isHeader>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nutrient</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Amount</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Key Benefits</Typography>
                  </TableRow>
                  {macroNutrients.map(([key, value], index) => (
                    <TableRow key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * index }}>
                      <Typography variant="body2">{key}</Typography>
                      <Typography variant="body2">{value}</Typography>
                      <Typography variant="body2">
                        {typeof nutritionKeyBenefits[key] === 'object' 
                          ? nutritionKeyBenefits[key][product.category] || nutritionKeyBenefits[key]['Pre-Workout']
                          : nutritionKeyBenefits[key]}
                      </Typography>
                    </TableRow>
                  ))}
                </NutritionTable>
              )}

              {vitaminsMinerals.length > 0 && (
                <NutritionTable
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    Vitamins & Minerals
                  </Typography>
                  <TableRow isHeader>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nutrient</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Amount</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Key Benefits</Typography>
                  </TableRow>
                  {vitaminsMinerals.map(([key, value], index) => (
                    <TableRow key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * index }}>
                      <Typography variant="body2">{key}</Typography>
                      <Typography variant="body2">{value}</Typography>
                      <Typography variant="body2">{nutritionKeyBenefits[key]}</Typography>
                    </TableRow>
                  ))}
                </NutritionTable>
              )}

              {additionalEnhancers[product.id] && (
                <NutritionTable
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    {product.id === 'post-2' ? 'Digestive & Recovery Enhancers' : 'Recovery Enhancers'}
                  </Typography>
                  <TableRow isHeader>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Name</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Value</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Key Benefits</Typography>
                  </TableRow>
                  {additionalEnhancers[product.id].map((enhancer, index) => (
                    <TableRow key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * index }}>
                      <Typography variant="body2">{enhancer.name}</Typography>
                      <Typography variant="body2">{enhancer.value}</Typography>
                      <Typography variant="body2">{enhancer.benefit}</Typography>
                    </TableRow>
                  ))}
                </NutritionTable>
              )}
            </Grid>
          </Grid>

          {currentComparison && (
            <ComparisonTable
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ padding: 3 }}
            >
              <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                {currentComparison.title}
              </Typography>
              <TableRow isHeader comparisonTable={true}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Feature</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>REVIVE</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Commercial</Typography>
              </TableRow>
              {currentComparison.data.map((row, index) => (
                <TableRow key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * index }}>
                  <Typography variant="body2">{row.feature}</Typography>
                  <Typography variant="body2">{row.revive}</Typography>
                  <Typography variant="body2">{row.commercial}</Typography>
                </TableRow>
              ))}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Why Choose REVIVE?
                </Typography>
                <ul>
                  {currentComparison.benefits.map((benefit, index) => (
                    <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                      {benefit}
                    </Typography>
                  ))}
                </ul>
              </Box>
            </ComparisonTable>
          )}
        </Container>

        <FixedButtonContainer>
          <Box sx={{ maxWidth: '300px', width: '100%' }}>
            {renderCartControls(product)}
          </Box>
        </FixedButtonContainer>
      </motion.div>
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;