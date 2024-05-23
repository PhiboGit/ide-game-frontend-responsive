import React, { useState } from 'react'
import GatheringTile from '../../components/tiles/GatheringNodeTile'
import { Grid, Typography } from '@mui/material'
import StartActionController from '../../components/actions/StartActionController';
import useGameDataState from '../../stateManagement/GameData/useGameData';

export default function GatheringSection() {
  const nodeData = useGameDataState(state => state.gatheringNodeData);

  const [selectedAction, setSelectedAction] = useState<GatheringNodeId | null>(null);
  const [limit, setLimit] = useState(false);
  const [iterations, setIterations] = useState(1);

  const handleStartClick = () => {
    
  };


  const groupedNodes = new Map<Profession, GatheringNodeId[]>();

  Object.entries(nodeData).forEach(([nodeId, node]) => {
    if (!groupedNodes.has(node.profession)) {
      groupedNodes.set(node.profession, []);
    }
    groupedNodes.get(node.profession)?.push(nodeId as GatheringNodeId);
  })
 
  

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Array.from(groupedNodes.entries()).map(([profession, nodes]) => (
          <div key={profession}  >
            <Typography variant="h4">{profession}</Typography>
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
          </div>
          ))}
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