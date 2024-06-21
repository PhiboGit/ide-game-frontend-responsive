import { Grid, Typography } from "@mui/material";
import React from "react";
import ResourceTile from "../../../components/tiles/ResourceTile";
import ClickAwayPopper from "../../../components/common/ClickAwayPopper";
import ResourceMenu from "./ResourceMenu";
import useCharacter from "../../../stateManagement/CharacterData/useCharacterData";
import { ResourceId } from "../../../gameTypes";

export default function InventoryResourceGridItem({ resourceId }: { resourceId: ResourceId }) {

  const units = useCharacter((char) => char.resources[resourceId])

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const openPopperResource = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  return (
    units > 0 && <Grid item key={resourceId} >
      <ResourceTile 
        resourceId={resourceId} 
        onClick={openPopperResource}
      >
        <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='end' 
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        {units ? units : ''}
      </Typography>
      </ResourceTile>
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ResourceMenu resourceId={resourceId} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </Grid>
  )
}