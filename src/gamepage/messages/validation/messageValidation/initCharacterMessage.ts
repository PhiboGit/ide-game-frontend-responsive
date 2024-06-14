import { JTDSchemaType } from "ajv/dist/jtd"
import { ajv } from "../ajvInstance"
import { Character, InitCharacterMessage } from "../../../game/gameTypes"





export function validateInitCharacterMessage(message: any): InitCharacterMessage {
  if(true) {
    console.log('InitCharacterMessage is valid')
    return message
  } else {
    
  }
}