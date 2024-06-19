import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ResourceId, SellResourceMsg } from "../../../gameTypes";
import websocketService from "../../../../../service/websocketService";
import useGameDataState from "../../../stateManagement/GameData/useGameData";


interface ResourceMenuProps { 
  resourceId: ResourceId, 
  closeMenu: () => void 
}

export default function ResourceMenu({ resourceId, closeMenu }: ResourceMenuProps) {
  const resourceData = useGameDataState((data) => data.resourceData)

  const resource = resourceData[resourceId]


  const [sellAmount, setSellAmount] = useState(1)

  const handleSell = () => {
    console.log("handleSell with amount", sellAmount)
    const msg: SellResourceMsg = {
      type: "sell_resource",
      resource: resourceId,
      amount: sellAmount
    }
    websocketService.send(msg)
    closeMenu()
  }

  return (
    <Paper
      sx={{
        p : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '175px'
      }}
    >
      <Typography>
        {resource.displayName}
      </Typography>
      <TextField 
        type='number' 
        defaultValue={sellAmount} 
        onChange={(event) => setSellAmount(parseInt(event.target.value))}
        size='small'/>
      <Button onClick={handleSell} key={"sell"} variant="contained">Sell</Button>
    </Paper>
  )
}