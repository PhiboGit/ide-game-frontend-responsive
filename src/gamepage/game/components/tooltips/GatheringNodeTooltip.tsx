import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import useGameData from "../../stateManagement/GameData/useGameData";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getLevel } from "../../gameUtils";
import ResourceTile from "../tiles/ResourceTile";
import ResourceChip from "../chips/ResourceChip";

export default function GatheringNodeTooltip({nodeId}: {nodeId: string}) {
    const node = useGameData((data) => data.gatheringNodeData[nodeId])
    const professionLevel = useCharacterState((char) => getLevel(char.professions[node.profession].exp))
    const resource = useGameData((data) => data.resourceData[node.resource])

  return (
    <Box display='flex' flexDirection='column' >
      <Typography variant="h6">{node.displayName}</Typography>
      <Box display='flex' gap={.5} alignItems={'center'}>
        <Typography fontSize='1rem' >{node.minAmount}-{node.maxAmount}</Typography>
        <ResourceChip resourceId={node.resource}/>
      </Box>
      <Typography fontSize='.8rem' color='text.secondary'>{node.description}</Typography>
      <Grid container mt={2}>
        <Grid item xs={6}>
          <Typography 
            fontSize='.66rem' 
            color={professionLevel < node.level ? 'error' : 'success'} 
            textTransform={'capitalize'}
          >
            {node.profession} Lv. {node.level}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize='.66rem'>{node.time}ms</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize='.66rem'>Exp. {node.exp}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize='.66rem'>Char. Exp. {node.exp}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}