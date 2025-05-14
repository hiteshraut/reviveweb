import { useState, useEffect } from 'react';
import { Box, Container, Typography, Avatar, Card, Rating, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    image: '/images/testimonials/sarah.jpg',
    rating: 5,
    text: 'The protein shakes from Revive have become an essential part of my fitness routine. The taste is amazing, and I have seen significant improvements in my recovery time!'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'CrossFit Athlete',
    image: '/images/testimonials/mike.jpg',
    rating: 5,
    text: 'As a CrossFit athlete, I need high-quality protein to maintain my performance. Revives shakes not only taste great but also provide the perfect nutritional balance.'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Yoga Instructor',
    image: '/images/testimonials/emma.jpg',
    rating: 5,
    text: 'I love how Revive offers plant-based options. The shakes are light yet fulfilling, perfect for my post-yoga recovery. Highly recommended!'
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card
      sx={{
        p: 4,
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={testimonial.image}
          alt={testimonial.name}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '4px solid #07332c',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontStyle: 'italic',
            color: 'text.secondary',
            lineHeight: 1.8,
            textAlign: 'center',
            fontSize: '1.1rem'
          }}
        >
          "{testimonial.text}"
        </Typography>
        <Typography variant="h6" component="div" gutterBottom sx={{ color: '#07332c' }}>
          {testimonial.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {testimonial.role}
        </Typography>
      </Box>
    </Card>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 5,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}
      >
          What Our Customers Say
        </Typography>

        <Box sx={{ position: 'relative', height: '400px' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              style={{ position: 'absolute', width: '100%' }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <IconButton
            onClick={() => paginate(-1)}
            sx={{
              position: 'absolute',
              left: { xs: 0, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
            }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={() => paginate(1)}
            sx={{
              position: 'absolute',
              right: { xs: 0, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                mx: 1,
                bgcolor: index === currentIndex ? '#07332c' : 'rgba(7, 51, 44, 0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;