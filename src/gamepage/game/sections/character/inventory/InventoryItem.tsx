import React from "react";
import ClickAwayPopper from "../../../components/common/ClickAwayPopper";
import ItemTile from "../../../components/tiles/ItemTile";
import ItemMenu from "./ItemMenu";

export default function InventoryItem({ itemId }: { itemId: string }) {

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const openPopperItem = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  return (
    <>
      <ItemTile 
        itemId={itemId} 
        onClick={openPopperItem}
      />
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ItemMenu itemId={itemId} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </>
  )
}