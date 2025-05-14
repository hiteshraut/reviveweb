import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const gymPartners = [
  {
    name: 'Elevate Gym',
    location: 'Samta Colony',
    description: 'Premium fitness facility with state-of-the-art equipment',
    image: '/images/partners/gymimage-min.jpg',
    offer: '10% off on Joining Membership',
    rating: 4.8,
    discountCode: 'ELEVATE10'
  },
  {
    name: 'SK 27 Gym',
    location: 'GE Road',
    description: 'Specialized in strength training and conditioning',
    image: '/images/partners/gymimage-min.jpg',
    offer: 'Free protein shake with membership',
    rating: 4.9,
    discountCode: 'SK27FIT'
  },
  {
    name: 'Fitness factory Gym',
    location: 'GE Road',
    description: 'Luxury gym with personal training focus',
    image: '/images/partners/gymimage-min.jpg',
    offer: 'First month free',
    rating: 4.7,
    discountCode: 'FACTORY10'
  },
  {
    name: 'Gold Gym',
    location: 'GE Road',
    description: 'High-intensity functional fitness training',
    image: '/images/partners/gymimage-min.jpg',
    offer: 'Free trial class',
    rating: 4.6,
    discountCode: 'GOLD10'
  }
];

const ScratchCoupon = ({ code }) => {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const handleScratch = (e) => {
    if (scratchProgress < 50) {
      setScratchProgress(prev => Math.min(prev + 10, 50));
    } else {
      setIsScratched(true);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '50px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        mt: 2
      }}
      onMouseMove={handleScratch}
      onTouchMove={handleScratch}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07332c',
          color: 'white',
          zIndex: 2
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {code}
        </Typography>
      </Box>
      {!isScratched && (
        <Box
          sx={{
            position: 'absolute',
            width: `${100 - scratchProgress}%`,
            height: '100%',
            right: 0,
            background: 'linear-gradient(45deg, #888 25%, #999 25%, #999 50%, #888 50%, #888 75%, #999 75%)',
            backgroundSize: '10px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            zIndex: 3,
            transition: 'width 0.3s ease',
            '&::before': {
              content: '"Scratch here!"',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
        />
      )}
    </Box>
  );
};

const GymPartners = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gymPartners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 0,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}
      >
        Our Gym Partners
      </Typography>

      <Box sx={{ position: 'relative', height: '500px', perspective: '1000px' }}>
        <AnimatePresence mode="popLayout">
          {gymPartners.map((gym, index) => {
            const distance = Math.abs(activeIndex - index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={gym.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '350px',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, x: '-50%', y: '-50%', rotateY: -90 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  x: `calc(-50% + ${(index - activeIndex) * 120}px)`,
                  y: '-50%',
                  rotateY: isActive ? 0 : 45,
                  scale: isActive ? 1 : 0.8,
                  zIndex: gymPartners.length - distance
                }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveIndex(index)}
              >
                <Card
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={gym.image}
                    alt={gym.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {gym.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {gym.location} • ⭐ {gym.rating}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {gym.description}
                    </Typography>
                    <Box
                      sx={{
                        background: '#07332c',
                        color: 'white',
                        p: 1,
                        borderRadius: '8px',
                        textAlign: 'center',
                        mt: 2
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {gym.offer}
                      </Typography>
                    </Box>
                    <ScratchCoupon code={gym.discountCode} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default GymPartners;