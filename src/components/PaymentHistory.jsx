import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';

// Mock data - in a real application, this would come from an API
const mockPayments = [
  {
    id: 1,
    date: '2024-03-15',
    taxType: 'Income Tax',
    amount: 2500.00,
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-02-28',
    taxType: 'Property Tax',
    amount: 1800.00,
    status: 'Completed',
  },
  {
    id: 3,
    date: '2024-01-10',
    taxType: 'Sales Tax',
    amount: 950.00,
    status: 'Completed',
  },
];

function PaymentHistory() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Tax Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.taxType}</TableCell>
                <TableCell align="right">
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PaymentHistory; 