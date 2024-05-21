import { Grid } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';

const fakeResourceEntries = ['woodT1', 'woodT2', 'woodT3', 'woodT4', 'woodT5', 'error'];

export default function InventorySection() {



  return (
    <div style={{ padding: "1rem" }}>
      Inventory
      <Grid container spacing={1}>
        {fakeResourceEntries.map((key) => (
          <InventoryResourceGridItem resourceId={key} />   
        ))}
      </Grid>
    </div>
  )
}