import React, { useState } from "react"
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { Paper } from "@mui/material";
import HtmlTooltip from "../common/HtmlTooltip";


interface StartActionControllerProps {
  limit: boolean
  setLimit: React.Dispatch<React.SetStateAction<boolean>>
  iterations: number
  setIterations: React.Dispatch<React.SetStateAction<number>>
  startDisabled: boolean
  onClickStart: () => void
}
const StartActionController = ({limit, setLimit, iterations, setIterations, startDisabled, onClickStart }: StartActionControllerProps) => {

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // let only digits be entered
    if (/^\d*$/.test(inputValue)) {
      const value = parseInt(inputValue) || 1
      setIterations(value);
    }
  }

  return (
    <Paper elevation={1}>
      <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
        >
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <HtmlTooltip title="unlimted iterations">
              <AllInclusiveIcon fontSize="small" />
            </HtmlTooltip>
            <FormControlLabel label="Limit Iterations" control={<Switch checked={limit} onChange={(event) => setLimit(event.target.checked)}/>}/>
            <VerticalAlignTopIcon fontSize="small" />
          </Stack>
        
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          value= {iterations}
          size="small"
          onChange={handleInput}          
        />)}
        <Button disabled={startDisabled} onClick={onClickStart} variant="contained">Start</Button>
      </Box>
    </Paper>
  )
}

export default StartActionController