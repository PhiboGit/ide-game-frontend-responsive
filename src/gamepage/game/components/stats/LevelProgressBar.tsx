import { Box, LinearProgress, Typography, linearProgressClasses, styled } from "@mui/material";

const StyledProgressBar = styled(LinearProgress, {
    shouldForwardProp: (prop) => prop !== "classes",
  })(({ theme }) => ({
    height: '1rem',
    borderRadius: 100,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[600],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 100,
      backgroundColor: theme.palette.primary.main,
    },
  
  }));

export default function LevelProgressBar({progress, levelUpInExp}:  {progress: number, levelUpInExp: number}){

    return (
      <Box width={'100%'} style={{ position: "relative"}}>
        <StyledProgressBar
          value={progress}
          variant="determinate"
        />
        <Box
          position="absolute"
          top="0"
          height={"100%"}
          width={"100%"}
          display = "flex"
          justifyContent='space-between'
          paddingLeft=".3rem"
          paddingRight=".3rem"
        >
          <Typography fontSize='.75rem'>
            {Math.floor(levelUpInExp)}Exp
          </Typography>
          <Typography 
            fontSize='.75rem'
          >
            {progress.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
    )
}