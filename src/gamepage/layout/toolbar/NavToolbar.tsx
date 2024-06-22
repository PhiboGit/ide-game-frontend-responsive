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
import useServerData from '../../game/stateManagement/serverData/useServerData';
import ActionQueue from '../../game/components/actions/ActionQueue';



export default function NavToolbar() {
  const activePlayers = useServerData((data) => data.activePlayers)
  return (
    <Toolbar>
        <AcUnitIcon color='primary' fontSize='large' sx={{ display: { xs: "none", sm: "block"} }}/>
        <Typography noWrap variant="h4" sx={{ ml: ".5rem", display: { xs: "none", md: "block"} }}>My Idle Game</Typography>
        <Box display={"flex"} alignItems={"center"} gap={2} sx={{ mx: 'auto' }} >
          <ActionProgress />
          <ActionQueue />
        </Box>
        <Box display="flex" flexDirection={"column"} sx={{ display: { xs: "none", sm: "block"} }}>
          <Typography noWrap variant='body2'>Active Players: {activePlayers}</Typography>
          <CharacterName />
          <LevelCharacter />
        </Box>
    </Toolbar>
  )
}