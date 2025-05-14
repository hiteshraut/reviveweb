import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Container,
  Grid
} from '@mui/material';

const ProteinCalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'kg',
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  const [result, setResult] = useState(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little or no exercise)', multiplier: 0.8 },
    light: { label: 'Light Activity (1-3 days/week)', multiplier: 1.0 },
    moderate: { label: 'Moderate Activity (3-5 days/week)', multiplier: 1.2 },
    active: { label: 'Very Active (6-7 days/week)', multiplier: 1.4 },
    athlete: { label: 'Athlete (2x training/day)', multiplier: 1.6 }
  };

  const goals = {
    lose: { label: 'Lose Weight', multiplier: 1.2 },
    maintain: { label: 'Maintain Weight', multiplier: 1.0 },
    gain: { label: 'Gain Muscle', multiplier: 1.4 }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateProtein = () => {
    const weightInKg = formData.weightUnit === 'lbs' 
      ? parseFloat(formData.weight) * 0.453592 
      : parseFloat(formData.weight);

    const baseProtein = weightInKg * 0.8; // Base protein requirement (0.8g per kg)
    const activityMultiplier = activityLevels[formData.activityLevel].multiplier;
    const goalMultiplier = goals[formData.goal].multiplier;

    const recommendedProtein = Math.round(baseProtein * activityMultiplier * goalMultiplier);

    setResult({
      daily: recommendedProtein,
      perMeal: Math.round(recommendedProtein / 4)
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Protein Calculator
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Calculate your daily protein requirements based on your weight, activity level, and fitness goals.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Weight Unit</InputLabel>
              <Select
                name="weightUnit"
                value={formData.weightUnit}
                onChange={handleChange}
                label="Weight Unit"
              >
                <MenuItem value="kg">Kilograms (kg)</MenuItem>
                <MenuItem value="lbs">Pounds (lbs)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Activity Level</InputLabel>
              <Select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                label="Activity Level"
              >
                {Object.entries(activityLevels).map(([value, { label }]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Goal</InputLabel>
              <Select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                label="Goal"
              >
                {Object.entries(goals).map(([value, { label }]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={calculateProtein}
              disabled={!formData.weight}
            >
              Calculate
            </Button>
          </Grid>
        </Grid>

        {result && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom color="primary">
              Your Recommended Protein Intake
            </Typography>
            <Typography variant="h4" gutterBottom>
              {result.daily}g per day
            </Typography>
            <Typography variant="subtitle1">
              Aim for {result.perMeal}g of protein per meal (4 meals)
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProteinCalculator;