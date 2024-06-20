import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { EquipItemMsg, ProfessionId, ResourceId, SellResourceMsg } from "../../../gameTypes";
import websocketService from "../../../../../service/websocketService";
import useGameDataState from "../../../stateManagement/GameData/useGameData";
import useCharacterState from "../../../stateManagement/CharacterData/useCharacterData";


interface ItemMenuProps { 
  itemId: string, 
  closeMenu: () => void 
}

export default function ItemMenu({ itemId, closeMenu }: ItemMenuProps) {
  const itemMap = useCharacterState((char) => char.itemMap)

  const item = itemMap[itemId]

  const handleEquip = (profession: ProfessionId) => {
    const msg: EquipItemMsg = {
      type: "equip_item",
      itemId: itemId,
      profession: profession,
      equipmentSlot: item.equipmentSlot
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
      <Typography>
        {item.displayName}
      </Typography>
      {item.equipmentProfessions.map((profession) => (
        <Button onClick={() => handleEquip(profession)} key={profession} variant="contained">Equip {profession}</Button>
      ))}
    </Paper>
  )
}