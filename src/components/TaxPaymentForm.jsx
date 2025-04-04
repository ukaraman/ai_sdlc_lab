import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';

const validationSchema = yup.object({
  taxType: yup.string().required('Tax type is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  taxYear: yup
    .number()
    .required('Tax year is required')
    .min(2000, 'Year must be after 2000')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  paymentMethod: yup.string().required('Payment method is required'),
});

const taxTypes = [
  { value: 'income', label: 'Income Tax' },
  { value: 'property', label: 'Property Tax' },
  { value: 'sales', label: 'Sales Tax' },
  { value: 'corporate', label: 'Corporate Tax' },
];

const paymentMethods = [
  { value: 'credit', label: 'Credit Card' },
  { value: 'debit', label: 'Debit Card' },
  { value: 'bank', label: 'Bank Transfer' },
];

function TaxPaymentForm() {
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      taxType: '',
      amount: '',
      taxYear: new Date().getFullYear(),
      paymentMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      setSuccess(true);
      formik.resetForm();
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Make Tax Payment
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment submitted successfully!
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              id="taxType"
              name="taxType"
              label="Tax Type"
              value={formik.values.taxType}
              onChange={formik.handleChange}
              error={formik.touched.taxType && Boolean(formik.errors.taxType)}
              helperText={formik.touched.taxType && formik.errors.taxType}
            >
              {taxTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="taxYear"
              name="taxYear"
              label="Tax Year"
              type="number"
              value={formik.values.taxYear}
              onChange={formik.handleChange}
              error={formik.touched.taxYear && Boolean(formik.errors.taxYear)}
              helperText={formik.touched.taxYear && formik.errors.taxYear}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              id="paymentMethod"
              name="paymentMethod"
              label="Payment Method"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
              helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
            >
              {paymentMethods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => formik.resetForm()}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit Payment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default TaxPaymentForm; 