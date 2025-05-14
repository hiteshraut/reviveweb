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

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <main style={{ marginTop: '56px' }}>
              <Routes>
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Hero />
                    <Products />
                    <GymPartners />
                    <ProteinCalculator />
                    <Goals />
                    <Testimonials />
                    <FAQ />
                  </motion.div>
                } />
                <Route path="/goals/:goalId" element={<GoalProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;