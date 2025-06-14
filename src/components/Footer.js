import { Box, Container, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#07332c', color: 'white', pt: 6, pb:11 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
              <Link to="/">
                <Box
                  component="img"
                  src="/images/revive-logo.svg"
                  alt="Revive"
                  sx={{
                    height: '40px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
            </Link>
            <Typography variant="body2">Recharge Rebuild Restore</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Quick Links</Typography>
            {/* <MuiLink component={RouterLink} to="#" color="inherit" display="block">Products</MuiLink>
            <MuiLink component={RouterLink} to="#" color="inherit" display="block">Gym Partners</MuiLink>
            <MuiLink component={RouterLink} to="#" color="inherit" display="block">FAQ</MuiLink> */}
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
              href="https://wa.me/919243022440" 
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit" 
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="body2">Phone: +91 9243022440</Typography>
            </MuiLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;