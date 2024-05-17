import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, LinearProgress, Typography, linearProgressClasses, styled } from "@mui/material";

interface ProgressBarProps {}

const StyledProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "classes",
})<ProgressBarProps>(({ theme }) => ({
  height: '1.5rem',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[600],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },

}));

type ActionProgressProps = {
  msTime: number,
  onTimeLeft?: (timeLeft: number) => void,
}
const PROGRESS_BAR_SIZE = 100;
const INTERVAL_MILLISECONDS = 20;
export default function ProgressBarTimer({msTime, onTimeLeft}: ActionProgressProps) {
  const totalTime = msTime
  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const timerRef = useRef<number | null>();

  useEffect(() => {
    if(onTimeLeft) onTimeLeft(timeLeft)
  }, [timeLeft, onTimeLeft]);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    cancelTimer();
    setProgress(0);
    setTimeLeft(totalTime);
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= totalTime) {
        cancelTimer();
        setProgress(0);
        setTimeLeft(0);
      } else {
        setProgress((elapsedTime / totalTime) * PROGRESS_BAR_SIZE);
        setTimeLeft(totalTime - elapsedTime);
      }
    }, INTERVAL_MILLISECONDS);
  }, [cancelTimer, totalTime]);

  useEffect(() => {
    startTimer();
    return cancelTimer;
  }, [startTimer, cancelTimer]);

  return (
      <StyledProgressBar variant="determinate" value={progress} />
  );
}
