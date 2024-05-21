import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";


interface ResourceMenuProps { 
  resourceId: string, 
  closeMenu: () => void 
}

export default function ResourceMenu({ resourceId, closeMenu }: ResourceMenuProps) {



  const [sellAmount, setSellAmount] = useState(1)

  const handleSell = () => {
    console.log("handleSell with amount", sellAmount)
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
        {resourceId}
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