import { Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData';
import { ResourceId, resourceIds } from '../../../gameTypes';
import ItemTile from '../../../components/tiles/ItemTile';
import InventoryItem from './InventoryItem';

export default function InventorySection() {
  const gold = useCharacterState((char) => char.currency.gold)

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h6" mb={1}>Currency:</Typography>
      <Grid container spacing={1}>
          <Grid item key={'gold'}>
            <Typography variant="body1">Gold: {gold}</Typography>
          </Grid>
      </Grid>
      <Divider sx={{my: 2}}/>
      <ResourcesSection/>
      <Divider sx={{my: 2}}/>
      <ItemSection/>
    </div>
  )
}

function ResourcesSection() {
  return (
    <div >
      <Typography variant="h6" mb={1}>Resources:</Typography>
      <Grid container spacing={1}>
        {resourceIds.map((key) => (
          <InventoryResourceGridItem resourceId={key} key={key}/>   
        ))}
      </Grid>
    </div>
  )
}

function ItemSection() {
  const items = useCharacterState((char) => char.items)
  return (
    <div>
      <Typography variant="h6"  mb={1}>Items:</Typography>
      <Grid container spacing={1} key={items.length}>
        {items.map((itemId) => (
          <Grid item key={itemId}>
            <InventoryItem itemId={itemId}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}