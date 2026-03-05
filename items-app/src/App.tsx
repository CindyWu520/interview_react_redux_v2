import React from 'react';
import { Box, Container, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ItemsTable from './components/ItemsTable/ItemsTable';
import ItemDetail from './components/ItemDetail/ItemDetail';

const theme = createTheme({
  palette: { primary: { main: '#1976d2' } },
  typography: { fontFamily: 'Inter, Roboto, sans-serif' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
          Items Explorer
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <ItemsTable />
          </Box>
          <Box sx={{ width: 380 }}>
            <ItemDetail />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;