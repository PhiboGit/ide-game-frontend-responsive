import { validateInitCharacterMessage } from "./validation/messageValidation/initCharacterMessage";
import { validateInitGameMessage } from "./validation/messageValidation/initGameMessage";
import { validateInitStatusMessage } from "./validation/messageValidation/initStatusMessage";

class MessageMananager {

  onMessage(data: any) {
    const message = JSON.parse(data)
    if (!message) {
      console.log('Invalid message JSON received:', message);
      return
    }
    console.log('Message JSON received:', message);
    
    if(!message.type){
      console.log('Invalid message type received:', message);
      return
    }

    switch (message.type) {
      case 'init_status':
        this.onInitStatusMessage(message)
        break;
      case 'init_game':
        this.onInitGameMessage(message)
        break;
      case 'init_character':
        this.onInitCharacterMessage(message)
      default:
        console.log('Invalid message type received:', message);
        break;
    }
  }

  onInitStatusMessage(message: any) {
    const initStatusMessage = validateInitStatusMessage(message)
  }

  onInitGameMessage(message: any) {
    const initGameMessage = validateInitGameMessage(message)
  }

  onInitCharacterMessage(message: any) {
    const initCharacterMessage = validateInitCharacterMessage(message)
  }

}

export default new MessageMananager()