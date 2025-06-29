
import React from 'react';
import { Container, Typography } from '@mui/material';

interface AboutProps {
  about: string;
}

const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <Container id="about" sx={{ my: 4, maxWidth: 'md !important' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }}>
        {about}
      </Typography>
    </Container>
  );
};

export default About;
