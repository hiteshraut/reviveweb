import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ComingSoonPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Always open the popup for demonstration/testing
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Removed localStorage.setItem to ensure it shows on every refresh
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="coming-soon-dialog-title"
      aria-describedby="coming-soon-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Modern gradient background
          color: 'white',
          textAlign: 'center',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
          maxWidth: '500px',
          width: '90%',
          animation: 'fadeInScale 0.5s ease-out',
        },
        '@keyframes fadeInScale': {
          '0%': {
            opacity: 0,
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      }}
    >
      <DialogTitle
        id="coming-soon-dialog-title"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
          marginBottom: '15px',
          letterSpacing: '2px',
        }}
      >
        {"Coming Soon!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="coming-soon-dialog-description"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            marginBottom: '30px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          Get ready for the ultimate protein shake experience! Premium blends, fresh ingredients, and unbeatable taste.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '30px' }}>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: '#FFD700', // Gold color
            color: '#333',
            fontWeight: 'bold',
            padding: '12px 40px',
            borderRadius: '30px',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#FFA500', // Darker orange on hover
              transform: 'scale(1.05)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            },
          }}
          autoFocus
        >
          Excited!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComingSoonPopup;