import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Hero = () => {
  const theme = useTheme();

  const features = [
    {
      text: '100% Natural Ingredients - No artificial additives or preservatives'
    },
    {
      text: 'Clear Nutritional Transparency - Know exactly what\'re consuming'
    },
    {
      text: 'No Artificial Sweeteners - Only natural flavors from real ingredients'
    },
    {
      text: 'Made Fresh in Raipur - Supporting local community and ensuring freshness'
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '45vh', sm: '80vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#07332c',
        color: 'white',
        position: 'relative',
        py: { xs: 8, sm: 8 },
        pt: { xs: 10, sm: 12 },  // Added extra padding to the top
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' }
            }}
          >
            Natural Protein & Premium Cold Brew
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mb: 6,
              color: theme.palette.primary.light,
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Why Choose Revive
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 'md', mx: 'auto' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: theme.palette.primary.light,
                        fontSize: '2rem',
                        flexShrink: 0
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: 'left',
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;