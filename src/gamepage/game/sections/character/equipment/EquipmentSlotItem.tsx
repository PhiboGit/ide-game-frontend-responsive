import React from "react";
import ClickAwayPopper from "../../../components/common/ClickAwayPopper";
import ItemTile from "../../../components/tiles/ItemTile";
import ItemMenu from "./EquipmentSlotItemMenu";
import { EquipmentSlot, ProfessionId } from "../../../gameTypes";
import useCharacterState from "../../../stateManagement/CharacterData/useCharacterData";
import EquipmentSlotItemMenu from "./EquipmentSlotItemMenu";
import BaseTile from "../../../components/tiles/BaseTile";

export default function EquipmentSlotItem({ profession, equipmentSlot }: { profession: ProfessionId, equipmentSlot: EquipmentSlot }) {

  const itemId = useCharacterState((char) => char.professions[profession].equipment[equipmentSlot])

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
      {itemId ? <ItemTile 
        itemId={itemId} 
        onClick={openPopperItem}
        size={2.5}
      />
      : <BaseTile 
          size={2.5} 
          iconSizePercent={45}
          onClick={openPopperItem}
      />
      }
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <EquipmentSlotItemMenu profession={profession} equipmentSlot={equipmentSlot} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </>
  )
}