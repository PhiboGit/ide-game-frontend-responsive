import { JTDSchemaType } from "ajv/dist/jtd"
import { ajv } from "../ajvInstance"
import { Character, UpdateCharacterMessage } from "../../../game/gameTypes"





export function validateUpdateCharacterMessage(message: any): UpdateCharacterMessage {
  if(true) {
    console.log('UpdateCharacterMessage is valid')
    return message
  } else {
    
  }
}