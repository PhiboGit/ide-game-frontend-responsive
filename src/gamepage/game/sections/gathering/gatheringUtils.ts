import { ProfessionId } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData";


export function getProfessionNodes(profession: ProfessionId){
  const nodeData = useGameDataState(state => state.gatheringNodeData);

  const groupedNodes = new Map<ProfessionId, string[]>();
  
  Object.entries(nodeData).forEach(([nodeId, node]) => {
    if (!groupedNodes.has(node.profession)) {
      groupedNodes.set(node.profession, []);
    }
    groupedNodes.get(node.profession)?.push(nodeId);
  })

  return groupedNodes.get(profession)!
}