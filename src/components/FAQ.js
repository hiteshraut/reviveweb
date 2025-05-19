import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What makes Revive protein shakes different?',
    answer: 'Our shakes are made with premium protein and natural ingredients, designed for optimal nutrition and taste. We never use artificial sweeteners or preservatives.',
  },
  {
    question: 'When is the best time to drink Revive shakes?',
    answer: 'For pre-workout, consume 30 minutes before exercise. Post-workout, drink within 30 minutes. Meal replacement shakes can be enjoyed anytime during the day.',
  },
  {
    question: 'Are Revive shakes suitable for vegetarians?',
    answer: 'Yes! We offer both whey-based and plant-based protein options to accommodate different dietary preferences.',
  },
  {
    question: 'How long do Revive shakes stay fresh?',
    answer: 'Once mixed, consume within 2 hours. Our powder products have a shelf life of 12 months when stored in a cool, dry place.',
  },
  {
    question: 'Do you offer custom protein blends?',
    answer: 'Yes, we can create custom blends based on your specific fitness goals and dietary requirements. Contact us for personalized options.',
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <Container sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            background: 'linear-gradient(45deg, #07332c 30%, #0a4f45 90%)',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Frequently Asked Questions
        </Typography>
      </motion.div>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              initial={false}
              animate={{
                backgroundColor: expandedIndex === index ? '#f5f5f5' : '#fff',
                scale: expandedIndex === index ? 1.02 : 1,
                boxShadow: expandedIndex === index 
                  ? '0 4px 20px rgba(0,0,0,0.1)' 
                  : '0 2px 10px rgba(0,0,0,0.05)'
              }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              style={{
                padding: '1.2rem',
                marginBottom: '1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    color: expandedIndex === index ? '#07332c' : 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {faq.question}
                </Typography>
                <motion.div
                  animate={{
                    rotate: expandedIndex === index ? 180 : 0,
                    color: expandedIndex === index ? '#07332c' : 'inherit'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ExpandMoreIcon />
                </motion.div>
              </Box>
              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <Typography
                      sx={{
                        mt: 2,
                        color: 'text.secondary',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;