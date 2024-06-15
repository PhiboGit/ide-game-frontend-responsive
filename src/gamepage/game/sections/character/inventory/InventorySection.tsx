import { Grid } from '@mui/material';
import React from 'react'
import ResourceTile from '../../../components/tiles/ResourceTile';
import InventoryResourceGridItem from './InventoryResourceGridItem';
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData';
import { ResourceId } from '../../../gameTypes';

export default function InventorySection() {

  const resources = useCharacterState((char) => char.resources)
  const characterResources = Object.keys(resources) as ResourceId[]

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