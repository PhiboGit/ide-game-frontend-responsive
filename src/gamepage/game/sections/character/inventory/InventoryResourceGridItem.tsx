import { Grid } from "@mui/material";
import React from "react";
import ResourceTile from "../../../components/tiles/ResourceTile";
import ClickAwayPopper from "../../../components/common/ClickAwayPopper";
import ResourceMenu from "./ResourceMenu";

const fakeInventoryEntries: [string, number][] = [
  ['woodT1', 10],
  ['woodT2', 4545],
  ['woodT3', 0],
  ['woodT4', 1],
  ['woodT5', 20],
  ['false', 20],
];
const fakeDataMap: Map<string, number> = new Map(fakeInventoryEntries);

export default function InventoryResourceGridItem({ resourceId }: { resourceId: string }) {

  const value = fakeDataMap.get(resourceId) || 0

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