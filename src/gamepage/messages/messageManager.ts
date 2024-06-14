import { InitCharacterMessage, InitGameMessage, InitStatusMessage, UpdateCharacterMessage } from "../game/gameTypes"
import { validateInitCharacterMessage } from "./validation/messageValidation/initCharacterMessage"
import { validateInitGameMessage } from "./validation/messageValidation/initGameMessage"
import { validateInitStatusMessage } from "./validation/messageValidation/initStatusMessage"
import { validateUpdateCharacterMessage } from "./validation/messageValidation/updateCharacterMessage"

type InitSubscriberCallback = (data: {
  initStatusMessage: InitStatusMessage
  initGameMessage: InitGameMessage
  initCharacterMessage: InitCharacterMessage
}) => void

type UpdateCharacterSubscriberCallback = (data: UpdateCharacterMessage) => void

export class MessageManager {
  private initStatusMessage: InitStatusMessage | null = null
  private initGameMessage: InitGameMessage | null = null
  private initCharacterMessage: InitCharacterMessage | null = null
  private initSubscribers: InitSubscriberCallback[] = []
  private updateCharacterSubscribers: UpdateCharacterSubscriberCallback[] = []
  onMessage(data: string) {
    const message = JSON.parse(data)
    if (!message) {
      console.log('Invalid message JSON received:', message)
      return
    }
    console.log('Message JSON received:', message)
    
    if (!message.type) {
      console.log('Invalid message type received:', message)
      return
    }

    switch (message.type) {
      case 'init_status':
        this.onInitStatusMessage(message)
        break
      case 'init_game':
        this.onInitGameMessage(message)
        break
      case 'init_character':
        this.onInitCharacterMessage(message)
        break
      case 'update_character':
        this.onUpdateCharacterMessage(message)
        break
      default:
        console.log('Invalid message type received:', message)
        break
    }

    this.checkIfAllInitMessagesReceived()
  }
  onUpdateCharacterMessage(message: any) {
    const updateCharacterMessage = validateUpdateCharacterMessage(message)
    if (updateCharacterMessage) {
      this.notifyUpdateCharacterSubscribers(updateCharacterMessage)
    }
  }

  subscribeUpdateCharacter(callback: UpdateCharacterSubscriberCallback) {
    this.updateCharacterSubscribers.push(callback)
    return () => {
      this.updateCharacterSubscribers = this.updateCharacterSubscribers.filter(subscriber => subscriber !== callback);
    };
  }

  private notifyUpdateCharacterSubscribers(updateCharacterMessage: UpdateCharacterMessage) {
    this.updateCharacterSubscribers.forEach(callback => callback(updateCharacterMessage))
  }

  private onInitStatusMessage(message: any) {
    const initStatusMessage = validateInitStatusMessage(message)
    if (initStatusMessage) {
      this.initStatusMessage = initStatusMessage
    }
  }

  private onInitGameMessage(message: any) {
    const initGameMessage = validateInitGameMessage(message)
    if (initGameMessage) {
      this.initGameMessage = initGameMessage
    }
  }

  private onInitCharacterMessage(message: any) {
    const initCharacterMessage = validateInitCharacterMessage(message)
    if (initCharacterMessage) {
      this.initCharacterMessage = initCharacterMessage
    }
  }

  subscribeInit(callback: InitSubscriberCallback) {
    this.initSubscribers.push(callback)
    return () => {
      this.initSubscribers = this.initSubscribers.filter(subscriber => subscriber !== callback);
    };
  }


  private notifyInitSubscribers() {
    if (this.initStatusMessage && this.initGameMessage && this.initCharacterMessage) {
      const data = {
        initStatusMessage: this.initStatusMessage,
        initGameMessage: this.initGameMessage,
        initCharacterMessage: this.initCharacterMessage,
      }
      this.initSubscribers.forEach(callback => callback(data))
    }
  }

  private checkIfAllInitMessagesReceived() {
    if (this.initStatusMessage && this.initGameMessage && this.initCharacterMessage) {
      this.notifyInitSubscribers()
    }
  }

  getInitData() {
    return {
      initStatusMessage: this.initStatusMessage,
      initGameMessage: this.initGameMessage,
      initCharacterMessage: this.initCharacterMessage
    }
  }
}

export default new MessageManager()
