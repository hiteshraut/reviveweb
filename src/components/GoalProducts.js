import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';

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

  // Product data (same as in Products.js)
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
      // ... other products
    ],
    'Post-Workout': [
      // ... post-workout products
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
    <Container sx={{ py: 8 }}>
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
  );
};

export default GoalProducts;