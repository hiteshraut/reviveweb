import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Add this import
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import Header from './Header'; // Add this import

// Reuse the styled components from Products.js
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

const GoalProducts = () => {
  const { goalId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Add this

  // Product data (same as in Products.js)
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

  // Filter products based on goal
  const goalProducts = {
    'weight-gain': ['MALAI KULFI THANDAI RECOVERY', 'COMPLETE CHHATTISGARHI NUTRITION', 'MALAI KULFI BANANA SHAKE'],
    'weight-loss': ['TRIPLE-CHARGED MOCHA ENERGIZER', 'ELECTROLYTE REPLENISHER', 'GREEN DETOX CLEANSE'],
    'general-fitness': ['COFFEE CINNAMON PRE-WORKOUT', 'CHOCOLATE BERRY RECOVERY', 'PEANUT BUTTER PROTEIN MAX']
  };

  const getImageUrl = (name) => {
    const filename = name.toLowerCase().replace(/\s+/g, '-');
    return `/images/products/${filename}.jpg`;
  };

  const filteredProducts = Object.values(products)
    .flat()
    .filter(product => goalProducts[goalId]?.includes(product.name));

  const goalTitles = {
    'weight-gain': 'Weight Gain',
    'weight-loss': 'Weight Loss',
    'general-fitness': 'General Fitness'
  };

  return (
    <>
      <Header />
      <Container sx={{ pt: 10, pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: '#07332c',
              '&:hover': {
                bgcolor: 'rgba(7, 51, 44, 0.04)'
              }
            }}
          >
            Back to Home
          </Button>
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

      <Grid container spacing={4}>
        {filteredProducts.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProductCard>
                <ProductImage>
                  <StyledImage src={getImageUrl(product.name)} alt={product.name} />
                  <ProteinTag label={`${product.protein} Protein`} />
                </ProductImage>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.benefits}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {product.tags.map((tag) => (
                      <NutritionChip key={tag} label={tag} />
                    ))}
                  </Box>
                  <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="p">
                      {product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => addToCart(product)}
                      sx={{
                        bgcolor: '#07332c',
                        fontSize: '16px',
                        '&:hover': {
                          bgcolor: '#0a4f45'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </ProductCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default GoalProducts;