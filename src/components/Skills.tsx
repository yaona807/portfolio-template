import React from 'react';
import { Container, Typography, Box, Chip, Stack } from '@mui/material';


import { useEffect, useState } from 'react';



// スキル名から一意なパステルカラーを生成する関数
function stringToPastelColor(str: string) {
  // シンプルなハッシュ関数
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // 0-359の範囲でH（色相）を決定
  const hue = Math.abs(hash) % 360;
  // パステル調: S=60%, L=85%
  return `hsl(${hue}, 60%, 85%)`;
}


const Skills: React.FC = () => {
  const [skills, setSkills] = useState<{ name: string }[]>([]);

  useEffect(() => {
    fetch('/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills || []);
      });
  }, []);

  return (
    <Container id="skills" sx={{ my: 4, maxWidth: 'md !important' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Skills
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {skills.map((skill) => (
            <Chip
              key={skill.name}
              label={skill.name}
              color="default"
              sx={{ mb: 1, backgroundColor: stringToPastelColor(skill.name), color: '#333', fontWeight: 500 }}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Skills;
