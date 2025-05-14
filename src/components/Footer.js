import { Box, Container, Typography, Grid, Link } from '@mui/material';

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
            <Link href="#" color="inherit" display="block">Products</Link>
            <Link href="#" color="inherit" display="block">Gym Partners</Link>
            <Link href="#" color="inherit" display="block">FAQ</Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6">Contact</Typography>
            <Typography variant="body2">Email: info@revive.com</Typography>
            <Typography variant="body2">Phone: (555) 123-4567</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;