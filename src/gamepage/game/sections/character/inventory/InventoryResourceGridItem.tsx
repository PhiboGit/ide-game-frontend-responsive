import { Grid } from "@mui/material";
import React from "react";
import ResourceTile from "../../../components/tiles/ResourceTile";
import ClickAwayPopper from "../../../components/common/ClickAwayPopper";
import ResourceMenu from "./ResourceMenu";
import useCharacter from "../../../stateManagement/CharacterData/useCharacterData";

export default function InventoryResourceGridItem({ resourceId }: { resourceId: ResourceIdString }) {

  const value = useCharacter((char) => char.resources[resourceId])

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
    value > 0 && <Grid item key={resourceId} >
      <ResourceTile 
        resourceId={resourceId} 
        count={value} 
        onClick={openPopperResource}
      />
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ResourceMenu resourceId={resourceId} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </Grid>
  )
}