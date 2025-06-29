
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} {name}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
