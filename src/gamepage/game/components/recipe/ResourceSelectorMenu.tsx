import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import React, { useState } from "react";
import { Ingredient, ResourceId } from "../../gameTypes";
import BaseTile from "../tiles/BaseTile";
import ResourceTile from "../tiles/ResourceTile";




interface ResourceSelectorMenuProps { 
  values: ResourceId[]
  required: boolean
  onChange: (value: Ingredient) => void
  closeMenu: () => void 
}

export default function ResourceSelectorMenu({ values, required, onChange, closeMenu }: ResourceSelectorMenuProps) {
 
  function handleChange(ingredient: Ingredient) {
    onChange(ingredient)
    closeMenu()
  }



  return (
    <Paper
      elevation={10}
      sx={{
        p : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '175px'
      }}
    >
      <Grid container spacing={1}>
        { !required && <Grid item key={'empty'}>
          <BaseTile 
            size={2.5}
            elevation={1}
            TileIcon={BlockIcon}
            onClick={() => handleChange('empty')}            
          />
        </Grid>}
        {values.map((resourceId) => (
          <Grid item key={resourceId}>
            <ResourceTile 
              size={2.5}
              onClick={() => handleChange(resourceId)}
              resourceId={resourceId}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}