import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Hero = () => {
  const theme = useTheme();

  const features = [
    {
      title: 'Natural Ingredients',
      description: 'No artificial additives',
      icon: CheckCircleOutlineIcon
    },
    {
      title: '24g+ Protein',
      description: 'Optimal muscle support',
      icon: CheckCircleOutlineIcon
    },
    {
      title: 'Nutrition Transparency',
      description: 'Know what you consume',
      icon: CheckCircleOutlineIcon
    },
    {
      title: 'Great Taste',
      description: 'Premium flavors',
      icon: CheckCircleOutlineIcon
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box
      component="section"
      sx={{
        
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#07332c',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 10,
          pb: 6,
          width: '100%'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%' }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center'
            }}
          >
            Natural Protein & Premium Cold Brew
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: theme.palette.primary.light,
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.75rem' },
              textAlign: 'center'
            }}
          >
            Why Choose Revive ?
          </Typography>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Grid 
              container 
              spacing={{ xs: 2, md: 4 }}
              sx={{ 
                maxWidth: '100%',
                width: '100%',
                justifyContent: 'center',
                '& .MuiGrid-item': {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
            >
              {features.map((feature, index) => (
                <Grid 
                  item 
                  xs={6} 
                  sm={6} 
                  md={3} 
                  key={index}
                  sx={{
                    width: '100%',
                    maxWidth: { md: '45%' }
                  }}
                >
                  <motion.div 
                    variants={itemVariants}
                    style={{ width: '100%' }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        p: { xs: 1.5, md: 2 },
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.06)',
                          transform: 'translateY(-8px)',
                          '& .icon-container': {
                            transform: 'scale(1.1)',
                            background: 'rgba(255, 255, 255, 0.15)'
                          }
                        }
                      }}
                    >
                      <Box
                        className="icon-container"
                        sx={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          mr: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: '1.5rem',
                            color: '#4CAF50'
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: '#ffffff',
                            fontSize: { xs: '1.25rem', md: '1.1rem' },
                            mb: { xs: 1, md: 0.5 },
                            lineHeight: 1.2
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '1rem', md: '0.9rem' },
                            lineHeight: 1.4
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;