import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, LinearProgress, Typography, linearProgressClasses, styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ProgressBarTimer from "./ProgressBarTimer";


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
  const [totalTime, setTotalTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);

  const handleStartButtonClick = () => {
    setTotalTime((prev) => prev + 1000);
  };

  const cancelTimer = () => {
    setTotalTime(0);
  }

  const timerFormat = getDisplayTime(timeLeft);

  return (
    // need a width for the progress bar
    <Box width={"350px"} style={{ position: "relative"}}>
      <ProgressBarTimer msTime={totalTime} onTimeLeft={setTimeLeft}/>
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
        <Typography
          noWrap 
        >
          Current running action
        </Typography>
        <button 
          onClick={handleStartButtonClick}
        >
          Start
        </button>
        <div style={{ display: "flex"}}>
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
        </div>
      </Box>
    </Box>
  );
}
