
import React from 'react';
import { Container, Typography } from '@mui/material';

interface ContactProps {
  email: string;
}

const Contact: React.FC<ContactProps> = ({ email }) => {
  return (
    <Container id="contact" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body1">
        Email: {email}
      </Typography>
    </Container>
  );
};

export default Contact;
