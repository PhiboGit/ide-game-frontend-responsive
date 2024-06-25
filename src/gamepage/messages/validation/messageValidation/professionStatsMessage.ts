import { JTDSchemaType } from "ajv/dist/jtd.js";
import { ajv } from "../ajvInstance.js";
import {  ProfessionStatsMessage, professionIds } from "../../../game/gameTypes.js";



const schemaProfessionStats: JTDSchemaType<ProfessionStatsMessage> = {
  properties: {
    type: { enum: ['request_professionStats'] },
    profession: { enum: [...professionIds] },
    stats: { 
      properties: {
        level: { type: 'int32' },
        luck: { type: 'int32' },
        speed: { type: 'float32' },
        expBonus: { type: 'float32' },
        yieldMax: { type: 'float32' },
        yieldMin: { type: 'float32' }
      }
    }
  }
}

const validate = ajv.compile<ProfessionStatsMessage>(schemaProfessionStats)


export function validateProfessionStatsMessage(message: any): ProfessionStatsMessage {
  if(validate(message)) {
    console.log('ProfessionStatsMessage is valid')
    return message
  } else {
    console.error('Error validating ProfessionStatsMessage:', validate.errors)
    throw new Error('Error validating ProfessionStatsMessage')
  }
}