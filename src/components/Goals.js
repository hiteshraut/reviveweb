import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const navigate = useNavigate();
  const goals = [
    {
      title: 'Weight Gain',
      image: '/images/goals/weight-gain.jpg',
      description: 'High-calorie protein shakes designed to support muscle growth and healthy weight gain.',
      products: ['MALAI KULFI THANDAI RECOVERY', 'COMPLETE CHHATTISGARHI NUTRITION', 'MALAI KULFI BANANA SHAKE']
    },
    {
      title: 'Weight Loss',
      image: '/images/goals/weight-loss.jpg',
      description: 'Low-calorie, nutrient-rich shakes that support your weight loss journey while preserving muscle.',
      products: ['TRIPLE-CHARGED MOCHA ENERGIZER', 'ELECTROLYTE REPLENISHER', 'GREEN DETOX CLEANSE']
    },
    {
      title: 'General Fitness',
      image: '/images/goals/general-fitness.jpg',
      description: 'Balanced protein shakes that provide essential nutrients for overall health and fitness maintenance.',
      products: ['COFFEE CINNAMON PRE-WORKOUT', 'CHOCOLATE BERRY RECOVERY', 'PEANUT BUTTER PROTEIN MAX']
    }
  ];

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
        Shop by Your Goal
      </Typography>

      <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        {goals.map((goal, index) => (
          <Grid 
            size={{ xs: 12, sm: 6, lg: 4 }}
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={goal.image}
                  alt={goal.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {goal.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {goal.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/goals/${goal.title.toLowerCase().replace(/\s+/g, '-')}`)}
                      sx={{
                        mt: 2,
                        bgcolor: '#07332c',
                        '&:hover': {
                          bgcolor: '#0a4f45'
                        }
                      }}
                    >
                      Explore Products
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Goals;