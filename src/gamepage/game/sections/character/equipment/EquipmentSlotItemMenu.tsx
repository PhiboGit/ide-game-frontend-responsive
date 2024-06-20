import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import React, { useState } from "react";
import { EquipItemMsg, EquipmentSlot, ProfessionId, ResourceId, SellResourceMsg } from "../../../gameTypes";
import websocketService from "../../../../../service/websocketService";
import useGameDataState from "../../../stateManagement/GameData/useGameData";
import useCharacterState from "../../../stateManagement/CharacterData/useCharacterData";
import ItemTile from "../../../components/tiles/ItemTile";
import BaseTile from "../../../components/tiles/BaseTile";


interface ItemMenuProps { 
  profession: ProfessionId,
  equipmentSlot: EquipmentSlot,
  closeMenu: () => void 
}

export default function EquipmentSlotItemMenu({ profession, equipmentSlot, closeMenu }: ItemMenuProps) {
  const items = useCharacterState((char) => char.items)
  const itemMap = useCharacterState((char) => char.itemMap)

  const validItems = items.filter(itemId => itemMap[itemId].equipmentProfessions.includes(profession) && itemMap[itemId].equipmentSlot === equipmentSlot)

  const handleEquip = (itemId: string | null) => {
    const msg: EquipItemMsg = {
      type: "equip_item",
      itemId: itemId,
      profession: profession,
      equipmentSlot: equipmentSlot
    }
    websocketService.send(msg)
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
        <Grid item key={'unequip'}>
          <BaseTile 
            size={2.5}
            elevation={1}
            TileIcon={BlockIcon}
            onClick={() => handleEquip(null)}            
          />
        </Grid>
        {validItems.map((itemId) => (
          <Grid item key={itemId}>
            <ItemTile 
              size={2.5}
              onClick={() => handleEquip(itemId)}
              itemId={itemId}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}