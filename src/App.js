import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { theme } from './styles/theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Goals from './components/Goals';
import Products from './components/Products';
import GymPartners from './components/GymPartners';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProteinCalculator from './components/ProteinCalculator';
import Testimonials from './components/Testimonials';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoalProducts from './components/GoalProducts';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';
import BottomNav from './components/BottomNavigation';
import Fab from '@mui/material/Fab'; // Import Fab
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Import WhatsAppIcon
import { styled } from '@mui/material/styles'; // Import styled

// Styled component for the floating WhatsApp button
const WhatsAppFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(9), // Adjust based on your BottomNav height
  right: theme.spacing(2),
  backgroundColor: '#25D366', // WhatsApp green
  color: 'white',
  '&:hover': {
    backgroundColor: '#1DA851',
  },
  zIndex: 1000, // Ensure it's above other content
}));

function App() {
  useEffect(() => {
    // Handle hash links scroll
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919202320023', '_blank'); // Use 91 for India's country code
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <Hero />
                  <Products />
                  <GymPartners />
                  <ProteinCalculator />
                  <Goals />
                  <Testimonials />
                  <FAQ />
                  <Footer />
                  <BottomNav />
                  {/* Add the floating WhatsApp button */}
                  <WhatsAppFab aria-label="WhatsApp" onClick={handleWhatsAppClick}>
                    <WhatsAppIcon />
                  </WhatsAppFab>
                </>
              } />
              <Route path="/goals/:goalId" element={<GoalProducts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              // Add this route to your existing routes
              <Route path="/product/:productId" element={
                <>
                  <ProductDetail />
                  <BottomNav />
                  {/* Add the floating WhatsApp button to product detail page as well */}
                  <WhatsAppFab aria-label="WhatsApp" onClick={handleWhatsAppClick}>
                    <WhatsAppIcon />
                  </WhatsAppFab>
                </>
              } />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;