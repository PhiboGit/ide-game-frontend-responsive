import { Box, Collapse, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { ProfessionId } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData"

import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import React, { useEffect } from "react";
import ResourceTile from "../../components/tiles/ResourceTile";
import { getProfessionRecipes } from "./getProfessionRecipes";


type RecipeListProps = {
    profession: ProfessionId
    onChange: (recipeType: 'resource' | 'rarityResource' | 'item' , recipeId: string) => void
}
export default function RecipeList({profession, onChange}: RecipeListProps) {
  const gameData = useGameDataState((data) => data)

  const {resourceRecipes, rarityResourceRecipes, itemRecipes} = getProfessionRecipes(profession, gameData);

  const [openResources, setOpenResources] = React.useState(true);
  const [openRarityResources, setOpenRarityResources] = React.useState(true);
  const [openItems, setOpenItems] = React.useState(true);


  const [selected, setSelected] = React.useState<string>('');
  const handleSelect = (recipeType: 'resource' | 'rarityResource' | 'item', recipeId: string) => {
    setSelected(recipeId);
    onChange(recipeType, recipeId);
  }

  // preselect first recipe
  useEffect(() => {
    if(resourceRecipes.size > 0) {
        handleSelect('resource', resourceRecipes.keys().next().value)
    } else if(rarityResourceRecipes.size > 0) {
        handleSelect('rarityResource', rarityResourceRecipes.keys().next().value)
    } else if(itemRecipes.size > 0) {
        handleSelect('item', itemRecipes.keys().next().value)
    }
  }, [])

  return (
    <Box display='flex'>
      <List
        dense
        sx={{
          width: 150,
          position: 'relative',
          overflow: 'hidden',
          
        }}
        subheader={<li />}
      >
      {resourceRecipes.size > 0 && <ListItemButton onClick={() => setOpenResources(!openResources)} sx={{ padding: 0 }}>
        {openResources ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Resources" />
      </ListItemButton>}
      {resourceRecipes.size > 0 && <Collapse in={openResources} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Array.from(resourceRecipes.entries()).map(([recipeId, recipe]) => (
             <ListItem
              key={recipeId}
              secondaryAction={
                <ResourceTile size={1.3} elevation={0} resourceId={recipe.resource} />
              }
              // no padding to be compact
              disablePadding
              sx={{ 
                // padding left, to align with the the headline + icon
                pl: 2.5,
                // overwrite to have the secendaryAction (icon) on the right
                '& .MuiListItemSecondaryAction-root': {
                  right: 4
                },
                // no padding bewteen the secondaryAction and the text of the ListItemButton
                '& .MuiListItemButton-root': {
                  padding: 0
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect("resource", recipeId)} 
                // no padding to be compact
                sx={{ padding: 0 }}
                >
                <ListItemText 
                    primary={recipe.displayName} 
                    // with the paddingRight and noWrap the text is never under the secondaryAction icon!
                    primaryTypographyProps={{ noWrap: true }} 
                    sx={{ paddingRight: 3.5 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>}

      {rarityResourceRecipes.size > 0 &&<ListItemButton onClick={() => setOpenRarityResources(!openRarityResources)} sx={{ padding: 0 }}>
        {openRarityResources ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Quality Resources" />
      </ListItemButton>}
      {rarityResourceRecipes.size > 0 &&<Collapse in={openRarityResources} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Array.from(rarityResourceRecipes.entries()).map(([recipeId, recipe]) => (
             <ListItem
              key={recipeId}
              secondaryAction={
                <ResourceTile size={1.3} elevation={0} resourceId={recipe.resource_rarity.common!} />
              }
              disablePadding
              sx={{ 
                pl: 2.5,
                '& .MuiListItemSecondaryAction-root': {
                  right: 4
                },
                '& .MuiListItemButton-root': {
                  padding: 0
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect("rarityResource", recipeId)} 
                sx={{ padding: 0 }}
              >
                <ListItemText primary={recipe.displayName} primaryTypographyProps={{ noWrap: true }} sx={{ paddingRight: 3.5 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>}

      {itemRecipes.size > 0 &&<ListItemButton onClick={() => setOpenItems(!openItems)} sx={{ padding: 0 }}>
        {openItems ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Items" />
      </ListItemButton>}
      {itemRecipes.size > 0 &&<Collapse in={openItems} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Array.from(itemRecipes.entries()).map(([recipeId, recipe]) => (
             <ListItem
              key={recipeId}
              secondaryAction={
                <></>
              }
              disablePadding
              sx={{ 
                pl: 2.5,
                '& .MuiListItemSecondaryAction-root': {
                  right: 4
                },
                '& .MuiListItemButton-root': {
                  padding: 0
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect("item", recipeId)} sx={{ padding: 0 }}>
                <ListItemText primary={recipe.displayName} primaryTypographyProps={{ noWrap: true }} sx={{ paddingRight: 3.5 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>}
    </List>
    </Box>
  )
}