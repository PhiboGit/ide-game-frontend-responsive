import { Box, Collapse, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { ProfessionId } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData"
import { getProfessionRecipes } from "./getProfessionRecipes";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import ResourceTile from "../../components/tiles/ResourceTile";


export default function SmeltingSection() {
  const gameData = useGameDataState((data) => data)

  const {resourceRecipes, rarityResourceRecipes, itemRecipes} = getProfessionRecipes('smelting', gameData);

  const [openResources, setOpenResources] = React.useState(true);
  const [openRarityResources, setOpenRarityResources] = React.useState(true);
  const [openItems, setOpenItems] = React.useState(true);


  const [selected, setSelected] = React.useState<string>('');
  const handleSelect = (recipeId: string) => {
    setSelected(recipeId);
  }

  return (
    <Box display='flex'>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 200,
          position: 'relative',
          overflow: 'hidden',
          
        }}
        subheader={<li />}
      >
      <ListItemButton onClick={() => setOpenResources(!openResources)} sx={{ gap: 0.0, padding: 0 }}>
        {openResources ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Resources" />
      </ListItemButton>
      <Collapse in={openResources} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Array.from(resourceRecipes.entries()).map(([recipeId, recipe]) => (
             <ListItem
              key={recipeId}
              secondaryAction={
                <ResourceTile size={1.3} elevation={0} resourceId={recipe.resource} />
              }
              disablePadding
              sx={{ 
                pl: 2.5,
                '& .MuiListItemSecondaryAction-root': {
                  right: 4
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect(recipeId)} sx={{ padding: 0 }}>
                <ListItemText primary={recipe.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={() => setOpenRarityResources(!openRarityResources)} sx={{ gap: 0.0, padding: 0 }}>
        {openRarityResources ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Quality Resources" />
      </ListItemButton>
      <Collapse in={openRarityResources} timeout="auto" unmountOnExit>
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
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect(recipeId)} 
                sx={{ padding: 0 }}
              >
                <ListItemText primary={recipe.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={() => setOpenItems(!openItems)} sx={{ gap: 0.0, padding: 0 }}>
        {openItems ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Items" />
      </ListItemButton>
      <Collapse in={openItems} timeout="auto" unmountOnExit>
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
                }
               }}
            >
              <ListItemButton 
                selected={selected === recipeId}
                onClick={() => handleSelect(recipeId)} sx={{ padding: 0 }}>
                <ListItemText primary={recipe.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
    <Divider orientation="vertical" flexItem/>
    </Box>
  )
}