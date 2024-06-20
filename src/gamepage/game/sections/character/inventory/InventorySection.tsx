import { Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData';
import { ResourceId } from '../../../gameTypes';
import ItemTile from '../../../components/tiles/ItemTile';
import InventoryItem from './InventoryItem';

export default function InventorySection() {
  const gold = useCharacterState((char) => char.currency.gold)
  const resources = useCharacterState((char) => char.resources)
  const characterResources = Object.keys(resources) as ResourceId[]
  const itemIds = useCharacterState((char) => char.items)
  const itemMap = useCharacterState((char) => char.itemMap)

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h6" mb={1}>Currency:</Typography>
      <Grid container spacing={1}>
          <Grid item key={'gold'}>
            <Typography variant="body1">Gold: {gold}</Typography>
          </Grid>
      </Grid>
      <Divider sx={{my: 2}}/>
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
            <InventoryItem itemId={itemId}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}