import { BorderBottom, BorderBottomOutlined } from '@mui/icons-material';
import { Box, Button, ButtonProps, Typography, styled } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import React, { useState } from 'react';

/**
 * added a new prop to the Button component
 */
interface NavButtonProps extends ButtonProps {
  active?: boolean;
}


/**
 * styled Button
 * no forwarded active prop
 * active is used to highlight the active button
 */
const NavButton = styled(Button, { 
  shouldForwardProp: (prop) => prop !== 'active' 
})<NavButtonProps>(({ theme, active }) => ({
    marginLeft: theme.spacing(3),
    textUnderlineOffset: ".3rem",
    textDecoration: active ? `underline ${theme.palette.text.primary}` : "none",
    textDecorationThickness: ".2rem",

    color: theme.palette.text.primary,

    '&:hover': {
      background: 'transparent',
      textDecoration: `underline ${theme.palette.text.primary}`,
      textDecorationThickness: ".2rem",
    }
  })
);

export default function Header({activeNav, handleNavButtonClick}: {activeNav: string, handleNavButtonClick: (navName: string) => void}) {
  

  return (
    <Box display='flex' alignItems='center' marginY="1rem">
      <AcUnitIcon color='primary' fontSize='large'/>
      <Typography noWrap variant="h4" sx={{ ml: ".5rem", display: { xs: "none", sm: "block"} }}>Idle Game</Typography>
      <NavButton sx={{ ml: 'auto'}} active={activeNav === 'Home'} onClick={() => handleNavButtonClick('Home')}>Home</NavButton>
      <NavButton active={activeNav === 'News'} onClick={() => handleNavButtonClick('News')}>News</NavButton>
      <NavButton active={activeNav === 'Patch Notes'} onClick={() => handleNavButtonClick('Patch Notes')}>Patch Notes</NavButton>
      <NavButton active={activeNav === 'Game Guide'} onClick={() => handleNavButtonClick('Game Guide')}>Game Guide</NavButton>
    </Box>
  );
}