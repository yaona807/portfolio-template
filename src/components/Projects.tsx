
import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <Container id="projects" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Projects
      </Typography>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'center',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              flex: '1 1 320px',
              minWidth: 260,
              maxWidth: 400,
              margin: 8,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: 17, sm: 18, md: 20 } }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}>
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={project.link} target="_blank">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Projects;
