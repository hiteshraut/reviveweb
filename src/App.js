import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Goals from './components/Goals'; // Fixed: Import Goals instead of Products
import Products from './components/Products';
import GymPartners from './components/GymPartners';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProteinCalculator from './components/ProteinCalculator';
import Testimonials from './components/Testimonials';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import GoalProducts from './components/GoalProducts';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDetail from './components/ProductDetail';
import BottomNav from './components/BottomNavigation';
import TimedProducts from './components/TimedProducts';
import ComingSoonPopup from './components/ComingSoonPopup';


function App() {
  return (
    <Router>
       {/* <ComingSoonPopup /> */}
       <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && performance.navigation.type === 1) {
      // Mobile refresh detected
      console.log('Mobile refresh detected - clearing cache');
      
      // Clear all possible caches
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.unregister());
        });
      }
      
      // Clear application cache (deprecated but still used by some mobile browsers)
      if (window.applicationCache) {
        window.applicationCache.update();
      }
      
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
    }
  }, []);
  useEffect(() => {
    // Handle hash for scrolling (if needed)
    const hash = location.hash;
    if (hash === '#revive') {
      // If the hash is #revive, render GymPartners or scroll to it
      const element = document.getElementById('revive');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top on other route changes
    }
  }, [location]);

  // Extract hash to determine if we should render GymPartners component
  const isReviveHash = location.hash === '#revive';
  
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                {isReviveHash ? (
                  // Render only GymPartners for #revive
                  <>
                    <div id="revive">
                      <GymPartners />
                    </div>
                    <Footer />
                    <BottomNav />
                  </>
                ) : (
                  // Normal homepage content
                  <>
                    <Hero />
                    <TimedProducts />
                    <ProteinCalculator />
                    <Testimonials />
                    <FAQ />
                    <Footer />
                    <BottomNav />
                  </>
                )}
              </>
            } />
            <Route path="/products" element={
              <>
                <Header />
                <Products />
                <Footer />
                <BottomNav />
              </>
            } />
           
            <Route path="/goals" element={
              <>
                <Header />
                <Goals /> {/* Fixed: Render Goals component instead of Products */}
                <Footer />
                <BottomNav />
              </>
            } />
            <Route path="/goals/:goalId" element={
              <>
                <GoalProducts />
                <BottomNav />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/product/:productId" element={
              <>
                <ProductDetail />
                <BottomNav />
              </>
            } />
            {/* Optional: Redirect /revive to /#revive to support non-hash URLs */}
            <Route path="/revive" element={<Navigate to="/#revive" replace />} />
           
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;