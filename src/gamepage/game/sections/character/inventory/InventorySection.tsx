import { Grid } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';
import useCharacterDataState from '../../../stateManagement/CharacterData/useCharacterData';

export default function InventorySection() {

  const resources = useCharacterDataState((char) => char.resources)
  const characterResources = Object.keys(resources) as ResourceIdString[]

  return (
    <div style={{ padding: "1rem" }}>
      Inventory
      <Grid container spacing={1}>
        {characterResources.map((key) => (
          <InventoryResourceGridItem resourceId={key} key={key}/>   
        ))}
      </Grid>
    </div>
  )
}