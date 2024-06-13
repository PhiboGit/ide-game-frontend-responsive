import { JTDDataType } from "ajv/dist/jtd.js";
import { ajv } from "../ajvInstance.js";


const schemaGatheringNode = {
  "values": { "ref": "GatheringNode" },

  "definitions": {
    "GatheringNode": {
      "properties": {
        "id": { "type": "string" },
        "displayName": { "type": "string" },
        "description": { "type": "string" },
        "profession": { "type": "string" },
        "tier": { "type": "uint32" },
        "level": { "type": "uint32" },
        "time": { "type": "uint32" },
        "exp": { "type": "uint32" },
        "expChar": { "type": "uint32" },
        "resource": { "type": "string" },
        "minAmount": { "type": "uint32" },
        "maxAmount": { "type": "uint32" }
      },
      "optionalProperties": {},
      "additionalProperties": false
    }
  }
} as const

export type GatheringNodeData = JTDDataType<typeof schemaGatheringNode>
export type GatheringNode = GatheringNodeData['values']
const validate = ajv.compile<GatheringNodeData>(schemaGatheringNode)

export function validateGatheringNodeData (data: any): GatheringNodeData {
  if (validate(data)) {
    console.log("GatheringNodeData is valid")
    return data as GatheringNodeData
  } else{
    console.error("Error validating GatheringNodeData: ", validate.errors);
    throw new Error("Error validating GatheringNodeData");
  }
}
