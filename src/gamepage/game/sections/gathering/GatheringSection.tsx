import React, { useState } from 'react'
import GatheringTile from '../../components/tiles/GatheringNodeTile'
import { Box, Grid, Typography } from '@mui/material'
import StartActionController from '../../components/actions/StartActionController';
import useGameDataState from '../../stateManagement/GameData/useGameData';
import { GatheringMsg, ProfessionId } from '../../gameTypes';
import websocketService from '../../../../service/websocketService';
import LevelProgressBar from '../../components/stats/LevelProgressBar';
import { getLevel, getLevelProgress } from '../../gameUtils';
import useCharacterState from '../../stateManagement/CharacterData/useCharacterData';

export default function GatheringSection() {
  const nodeData = useGameDataState(state => state.gatheringNodeData);
  

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [limit, setLimit] = useState(false);
  const [iterations, setIterations] = useState(1);

  const handleStartClick = () => {
    if (selectedAction === null) {
      console.log('no action selected')
      return
    }
    const msg: GatheringMsg = {
      type: 'gathering',
      limit,
      iterations,
      args: {
        node: selectedAction
      }
    }

    websocketService.send(msg);
  };


  const groupedNodes = new Map<ProfessionId, string[]>();

  Object.entries(nodeData).forEach(([nodeId, node]) => {
    if (!groupedNodes.has(node.profession)) {
      groupedNodes.set(node.profession, []);
    }
    groupedNodes.get(node.profession)?.push(nodeId);
  })
 
  

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Array.from(groupedNodes.entries()).map(([profession, nodes]) => {
          const professionExp = useCharacterState((char) => char.professions[profession].exp)
          const {progress, levelUpInExp} = getLevelProgress(professionExp)
          const level = getLevel(professionExp)
          return(
          <Box key={profession} display="flex" flexDirection={"column"} gap="1rem"  >
            <Box width='200px' display='flex' flexDirection={'column'} alignSelf={'center'} alignItems='center'>
              <Typography variant="h5" noWrap textTransform={'capitalize'}>{profession} Lv. {level}</Typography>
              <LevelProgressBar progress={progress} levelUpInExp={levelUpInExp} />
            </Box>
            <Grid container spacing={2}>
              {nodes.map(nodeId => 
                <Grid item key={nodeId} xs='auto'>
                  <GatheringTile 
                    size={8} 
                    nodeId={nodeId}
                    onClick={() => setSelectedAction(nodeId)}
                    selected={selectedAction === nodeId}
                    />
                </Grid>
              )}
            </Grid>
          </Box>
          
          )})}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <StartActionController 
          limit={limit}
          setLimit={setLimit}
          iterations={iterations}
          setIterations={setIterations}
          startDisabled={selectedAction === null}
          onClickStart={handleStartClick}
        />        
      </div>
    </div>
  )
}