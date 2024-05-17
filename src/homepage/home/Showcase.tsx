import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

type ShowcaseProps = {
  alternate?: boolean;
  children: [React.ReactNode, React.ReactNode]; // Specify that there should be exactly two children
};

export default function Showcase({ children, alternate }: ShowcaseProps) {
  const [firstChild, secondChild] = children;

  // mediaQuery for smaller screen size
  const theme = useTheme();
  const matches = useMediaQuery( theme.breakpoints.down('md'));

  const boxLarge = (
    <Box display="flex" flexDirection={'row'} alignItems={"flex-end"} gap="2rem" >
      <div style={{ flex: alternate ? '45%' : '55%' }}>{alternate? secondChild : firstChild}</div>
      <div style={{ flex: alternate ? '55%' : '45%' }}>{alternate? firstChild : secondChild}</div>
    </Box>
  )

  const boxSmall = (
    <Box display="flex" flexDirection={'column-reverse'} gap="2rem" >
      {firstChild}
      {secondChild}
    </Box>
  )

  return (
    matches ? boxSmall : boxLarge
  );
}