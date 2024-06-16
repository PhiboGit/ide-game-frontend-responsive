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

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
          overflow: 'auto',
          
        }}
        subheader={<li />}
      >
      <ListItemButton onClick={handleClick} sx={{ gap: 0.0, padding: 0 }}>
        {open ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
        <ListItemText secondary="Resources" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Array.from(resourceRecipes.entries()).map(([recipeId, resourceRecipe]) => (
             <ListItem
              key={recipeId}
              secondaryAction={
                <ResourceTile size={1.3} resourceId={resourceRecipe.resource} />
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
                <ListItemText primary={recipeId} />
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