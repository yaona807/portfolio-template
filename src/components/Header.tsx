
// ...existing code...
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import X from '@mui/icons-material/X';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../App';
interface SnsLink {
  name: string;
  url: string;
  icon: string;
}

interface HeaderProps {
  name: string;
}


const iconMap: { [key: string]: React.ReactNode } = {
  GitHub: <GitHubIcon />,
  X: <X />
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [sns, setSns] = useState<SnsLink[]>([]);
  const [icon, setIcon] = useState<string>("/my-icon.png");
  useEffect(() => {
    fetch('/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        setSns(data.sns || []);
        if (data.icon) setIcon(`/${data.icon}`);
      });
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar alt="icon" src={icon} sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {name}'s Portfolio
        </Typography>
        <Button color="inherit" href="#about">About</Button>
        <Button color="inherit" href="#work-experience">Work Experience</Button>
        <Button color="inherit" href="#contact">Contact</Button>
        {sns.map((item) => (
          <IconButton color="inherit" href={item.url} target="_blank" aria-label={item.name} key={item.name}>
            {iconMap[item.icon] || null}
          </IconButton>
        ))}
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" aria-label="toggle theme">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
