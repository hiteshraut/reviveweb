import { Box, Container, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" gutterBottom>Privacy Policy</Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Information We Collect</Typography>
        <Typography paragraph>
          We collect information you provide directly to us, including name, email address, phone number, and delivery address when you place an order or create an account.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>How We Use Your Information</Typography>
        <Typography paragraph>
          - To process and deliver your orders
          - To communicate with you about your orders and our products
          - To send you marketing communications (with your consent)
          - To improve our products and services
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Information Sharing</Typography>
        <Typography paragraph>
          We do not sell or share your personal information with third parties except as necessary to provide our services (e.g., delivery partners).
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Data Security</Typography>
        <Typography paragraph>
          We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Your Rights</Typography>
        <Typography paragraph>
          You have the right to:
          - Access your personal information
          - Correct inaccurate information
          - Request deletion of your information
          - Opt-out of marketing communications
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Contact Us</Typography>
        <Typography paragraph>
          If you have questions about our privacy policy, please contact us at info@revivenutrition.in
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;