import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';

interface Project {
  title: string;
  description: string;
  link: string;
}

interface Job {
  company: string;
  title: string;
  duration: string;
  description: string;
}

interface PortfolioData {
  name: string;
  about: string;
  projects?: Project[];
  workExperience: Job[];
  contact: {
    email: string;
  };
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    fetch('/portfolio.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header name={data.name} />
          <main>
            <About about={data.about} />
            <Skills />
            <WorkExperience workExperience={data.workExperience} />
            <Contact email={data.contact.email} />
          </main>
          <Footer name={data.name} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;