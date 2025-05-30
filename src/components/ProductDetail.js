import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Chip,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { styled } from '@mui/material/styles';
import Header from './Header'; // Add this import

// Update the ProductImage styled component
const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3)
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

const TableRow = styled(motion.div)(({ theme, isHeader }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: isHeader ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(7, 51, 44, 0.1)',
  '& > *': {
    display: 'flex',
    alignItems: 'center'
  }
}));




const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Add useEffect to scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Find the product from all categories
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

  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <Container sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" align="center">Product not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
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
        <Container sx={{ pt: 8, pb: 6 }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ mb: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />  <span>Back to Home Page</span>
          </IconButton>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProductImage 
                src={`/images/products/${product.name.toLowerCase().replace(/ /g, '-')}.jpg`}
                alt={product.name}
              />
            </Grid>
            
           
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                {product.name}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h4" color="primary">
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    height: '50px',
                    width: 'auto',
                    bgcolor: '#07332c',
                    '&:hover': {
                      bgcolor: '#0a4f45'
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            
              <Box sx={{ my: 2 }}>
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: 'rgba(7, 51, 44, 0.1)',
                      color: '#07332c',
                      fontWeight: 600
                    }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Benefits
              </Typography>
              <Typography variant="body1" paragraph>
                {product.benefits}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Nutrition Information
              </Typography>
              <Grid container spacing={1}>
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <NutritionChip label={`${key}: ${value}`} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
      
      <Container sx={{ pb: 6 }}>
        <ComparisonTable
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#07332c', mb: 4 }}>
            REVIVE vs. COMMERCIAL PRE-WORKOUTS
          </Typography>

          <TableRow isHeader
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h6">Feature</Typography>
            <Typography variant="h6">REVIVE</Typography>
            <Typography variant="h6">Commercial</Typography>
          </TableRow>

          {comparisonData.map((row, index) => (
            <TableRow
              key={row.feature}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Typography>{row.feature}</Typography>
              <Typography sx={{ color: 'primary.main', fontWeight: 500 }}>{row.revive}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{row.commercial}</Typography>
            </TableRow>
          ))}

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#07332c' }}>
              WHY CHOOSE REVIVE
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                'Natural ingredient profile',
                'Better overall nutrition',
                'Sustained energy without crash',
                'Supports muscle preservation',
                'No artificial colors, flavors or sweeteners',
                'Transparency in ingredient sourcing'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: '#07332c',
                      mr: 2,
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <Typography>{benefit}</Typography>
                </motion.div>
              ))}
            </motion.div>
          </Box>
        </ComparisonTable>
      </Container>
      
      {/* ... existing code ... */}
    </>
  );
};

export default ProductDetail;

const comparisonData = [
  { feature: 'Energy Source', revive: 'Natural coffee + peanut butter', commercial: 'Synthetic caffeine + artificial stimulants' },
  { feature: 'Protein Content', revive: '13g complete protein', commercial: '0-5g incomplete amino acids' },
  { feature: 'Nutritional Profile', revive: 'Complete macro and micronutrient profile', commercial: 'Limited to performance ingredients' },
  { feature: 'Sweeteners', revive: 'Natural stevia', commercial: 'Artificial sweeteners' },
  { feature: 'Digestive Comfort', revive: 'Gentle on stomach', commercial: 'May cause digestive discomfort' },
  { feature: 'Crash Effect', revive: 'Minimal due to balanced release', commercial: 'Often severe due to stimulant stack' }
];