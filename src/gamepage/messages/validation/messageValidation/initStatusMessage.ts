import { JTDSchemaType } from "ajv/dist/jtd.js";
import { ajv } from "../ajvInstance.js";


// TODO: validate time as a date
export type InitStatusMessage = {
  type: 'init_status',
  active_players: number,
  time: string
}

const schemaInitStatus: JTDSchemaType<InitStatusMessage> = {
  properties: {
    type: { enum: ['init_status'] },
    active_players: { type: 'int32' },
    time: { type: 'string' }
  }
}

const validate = ajv.compile<InitStatusMessage>(schemaInitStatus)


export function validateInitStatusMessage(message: any): InitStatusMessage {
  if(validate(message)) {
    console.log('InitStatusMessage is valid')
    return message
  } else {
    console.error('Error validating InitStatusMessage:', validate.errors)
    throw new Error('Error validating InitStatusMessage')
  }
}