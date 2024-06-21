import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import React, { useState } from "react";
import { Ingredient, ResourceId } from "../../gameTypes";
import BaseTile from "../tiles/BaseTile";
import ResourceTile from "../tiles/ResourceTile";
import ResourceIngredientTile from "./ResourceIngredientTile";




interface ResourceSelectorMenuProps { 
  values: { resource: ResourceId, amount: number }[]
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
    <Box
      sx={{
        p : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '265px'
      }}
    >
      <Grid container spacing={1}>
        { !required && <Grid item key={'empty'}>
          <BaseTile 
            size={3.5}
            elevation={1}
            TileIcon={BlockIcon}
            onClick={() => handleChange('empty')}            
          />
        </Grid>}
        {values.map(({resource, amount}) => (
          <Grid item key={resource}>
            <ResourceIngredientTile
              size={3.5} 
              resourceId={resource}
              amount={amount}
              onClick={() => handleChange(resource)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}