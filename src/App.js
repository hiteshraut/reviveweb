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
                </>
              } />
              <Route path="/goals/:goalId" element={<GoalProducts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;