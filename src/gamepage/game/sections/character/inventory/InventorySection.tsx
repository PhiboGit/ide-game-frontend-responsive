import { Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData';
import { ResourceId } from '../../../gameTypes';

export default function InventorySection() {

  const resources = useCharacterState((char) => char.resources)
  const characterResources = Object.keys(resources) as ResourceId[]
  const itemIds = useCharacterState((char) => char.items)
  const itemMap = useCharacterState((char) => char.itemMap)

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h6" mb={1}>Resources:</Typography>
      <Grid container spacing={1}>
        {characterResources.map((key) => (
          <InventoryResourceGridItem resourceId={key} key={key}/>   
        ))}
      </Grid>
      <Divider sx={{my: 2}}/>
      <Typography variant="h6"  mb={1}>Items:</Typography>
      <Grid container spacing={1}>
        {itemIds.map((itemId) => (
          <Grid item key={itemId}>
            {JSON.stringify(itemMap[itemId], null, 2)}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}