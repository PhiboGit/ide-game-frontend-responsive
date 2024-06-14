import { JTDDataType } from "ajv/dist/jtd.js";
import { ajv } from "../ajvInstance.js";
import { ResourceData } from "../../../game/gameTypes.js";



const schemaResource = {
  "values": { "ref": "Resource" },

  "definitions": {
    "Resource": {
      "properties": {
        "id": { "type": "string" },
        "displayName": { "type": "string" },
        "description": { "type": "string" },
        "rarity": { "type": "string" },
        "tier": { "type": "uint32" },
        "sellValue": { "type": "uint32" },
      },
      "optionalProperties": {
        "bonusType": { "type": "string" },
        "craftingBonus": { "type": "uint32" },
        "gearScoreBonus": { "type": "uint32" },
      },
      "additionalProperties": false
    }
  }
} as const


const validate = ajv.compile<ResourceData>(schemaResource)

export function validateResourceData(data: any): ResourceData {
  if (validate(data)){
    console.log("ResourceData is valid")
    return data as ResourceData
  } else{
    console.error("Error validating ResourceData: ", validate.errors);
    throw new Error("Error validating ResourceData");
  }
}
