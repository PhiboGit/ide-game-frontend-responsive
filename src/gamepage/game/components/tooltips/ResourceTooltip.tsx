import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import useGameData from "../../stateManagement/GameData/useGameData";
import { ResourceId } from "../../gameTypes";

export default function ResourceTooltip({resourceId}: {resourceId: ResourceId}) {
  const resource = useGameData((data) => data.resourceData[resourceId])

  return (
    <Box display='flex' flexDirection='column' >
      <Typography variant="h6" >{resource.displayName}</Typography>
      <Typography fontSize='.8rem' color='text.secondary'>{resource.description}</Typography>
      <Box display='flex' gap={.5} >
        {resource.tier > 0 && <Typography fontSize='.66rem' >T{resource.tier}</Typography>}
        <Typography fontSize='.66rem' color={`${resource.rarity}Rarity`}>{resource.rarity !== "none" ? resource.rarity : ""}</Typography>
      </Box>
      <Typography fontSize='.66rem' >Sell Price: {resource.sellValue}</Typography>
       { resource.bonusType !== undefined && <Typography fontSize='1rem' color={'text.primary'}>Bonus: {resource.bonusType}</Typography>}
       { resource.gearScoreBonus !== undefined && <Typography fontSize='1rem' color={'text.primary'}>gearScoreBonus: {resource.gearScoreBonus}</Typography>}
       { resource.craftingBonus !== undefined && <Typography fontSize='1rem' color={'text.primary'}>craftingBonus: {resource.craftingBonus}</Typography>}
    </Box>
  )
}