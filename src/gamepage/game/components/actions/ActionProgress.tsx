import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ProgressBarTimer from "./ProgressBarTimer";
import { ActionObject, CancelActionMsg } from "../../gameTypes";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import websocketService from "../../../../service/websocketService";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import { getActionName } from "./actionUtils";


function getDisplayTime(millisec: number): string {
  if (millisec <= 0) return "0:00:00.000";
  const hours = Math.floor(millisec / 1000 / 60 / 60);
  const minutes = Math.floor(millisec / 1000 / 60) % 60;
  const seconds = Math.floor(millisec / 1000) % 60;
  const milliseconds = millisec % 1000;

  const displayTime = `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`
  // trim the first chars if they are zero. ( "0:" or "0:00:01.647")
  const heighestUnit = hours ? 0 : minutes >= 10 ? 2 : minutes >= 1 ? 3 : seconds >= 10 ? 5 : 6
  return displayTime.slice(heighestUnit)
}

export default function ActionProgress() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const activeAction = useCharacterState((char) => char.activeAction)
  const totalTime = activeAction?.actionTime ?? 0
  const counter = activeAction?.counter ?? 0
  

  const cancelTimer = () => {
    const msg: CancelActionMsg = {
      type: "cancel_action",
      index: -1
    } 
    websocketService.send(msg)
  }


  const timerFormat = getDisplayTime(timeLeft);

  return (
    // need a width for the progress bar
    <Box width={"350px"} style={{ position: "relative"}}>
      {/* Progress bar added key to trigger even when totalTime does not change. As counter does change with every action */}
      <ProgressBarTimer key={counter} msTime={totalTime} onTimeLeft={setTimeLeft}/>
      {/* A "hack" to display element over the progress bar
        
      */}
      <Box
        position="absolute"
        top="0"
        height={"100%"}
        width={"100%"}
        display = "flex"
        justifyContent='space-between'
        paddingLeft=".3rem"
      >
        <ActionProgressText activeAction={activeAction}/>
        <Box display="flex">
          <Typography
            noWrap 
            >
            {timerFormat}
          </Typography>
          <IconButton 
            onClick={cancelTimer}
            sx={{ padding: "0", paddingLeft: ".2rem"}}>
            <CancelRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

function ActionProgressText({activeAction}: {activeAction: ActionObject | null}) {

  const counter = activeAction?.counter ?? 0
  const actionName = getActionName(activeAction)

  const displayCounterText = () => {
    if (!activeAction){
      return ''
    }
    if(!activeAction.actionMsg.limit){
      return `(${counter +1})`
    } else {
      return `(${counter + 1}/${counter + activeAction.actionMsg.iterations})`
    }
  }


  return (
    <Box display ='flex' flexDirection='row' gap={'.5rem'}>
      <Typography noWrap>
        {displayCounterText()}
      </Typography>
      <Typography
        noWrap 
        textTransform='capitalize'
      >
        {actionName.profession}
      </Typography>
      <Typography
        noWrap 
      >
        {actionName.action}
      </Typography>
    </Box>
  )
}
