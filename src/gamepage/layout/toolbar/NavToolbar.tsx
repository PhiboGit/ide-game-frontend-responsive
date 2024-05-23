import React, { useRef, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, LinearProgress } from '@mui/material';
import ActionProgress from '../../game/components/actions/ActionProgress';
import CharacterName from '../../game/components/stats/CharacterName';
import LevelCharacter from '../../game/components/stats/LevelCharacter';



export default function NavToolbar() {

  return (
    <Toolbar>
        <AcUnitIcon color='primary' fontSize='large' sx={{ display: { xs: "none", sm: "block"} }}/>
        <Typography noWrap variant="h4" sx={{ ml: ".5rem", display: { xs: "none", md: "block"} }}>My Idle Game</Typography>
        <Box sx={{ mx: "auto" }}>
          <ActionProgress />
        </Box>
        <Box display="flex" flexDirection={"column"} sx={{ display: { xs: "none", sm: "block"} }}>
          <Typography noWrap variant='body2'>Active Player: 3381</Typography>
          <CharacterName />
          <LevelCharacter />
        </Box>
    </Toolbar>
  )
}