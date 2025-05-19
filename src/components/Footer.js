import { Box, Container, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#07332c', color: 'white', py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Revive</Typography>
            <Typography variant="body2">Recharge Rebuild Restore</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Quick Links</Typography>
            <MuiLink component={RouterLink} to="#" color="inherit" display="block">Products</MuiLink>
            <MuiLink component={RouterLink} to="#" color="inherit" display="block">Gym Partners</MuiLink>
            <MuiLink component={RouterLink} to="#" color="inherit" display="block">FAQ</MuiLink>
            <MuiLink component={RouterLink} to="/privacy-policy" color="inherit" display="block">Privacy Policy</MuiLink>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Contact</Typography>
            <MuiLink 
              href="mailto:info@revivenutrition.in" 
              color="inherit" 
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="body2">Email: info@revivenutrition.in</Typography>
            </MuiLink>
            <MuiLink 
              href="https://wa.me/919202320023" 
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit" 
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="body2">Phone: +91 9202320023</Typography>
            </MuiLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;