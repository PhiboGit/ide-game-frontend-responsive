// WebSocketService.js

import messageManager from "../gamepage/messages/messageManager";

const serverIP = "172.17.204.13:5000"


class WebsocketService {

  socket: WebSocket | null = null
  
  connect(onStateChange: (state: string) => void) {
    console.log('Connect WebSocket');
    // state closing or closed
    if (!this.socket || this.socket.readyState == 2 || this.socket.readyState == 3) {
      console.log('Setting up new socket...');
      const token = localStorage.getItem('token')
      const socketURL = `ws://${serverIP}?token=${token}`;
      this.socket = new WebSocket(socketURL);
  
      this.socket.onopen = () => {
        // You can send initial messages or perform other actions upon connection
        console.log('WebSocket connection opened');
        onStateChange('open');
      };

  
      this.socket.onmessage = (event) => {
        
        messageManager.onMessage(event.data);
      };
  
      this.socket.onclose = (event) => {
        // Handle WebSocket connection closure
        console.log('WebSocket connection closed:', event);
        onStateChange('closed');
      };
    }
  }

  close() {
    console.log('WebSocket close');
    if (this.socket) {
      this.socket.close();
    }
  }

  send(message: any) {
    if (this.socket && this.socket.readyState === 1) {
      const jsonString = JSON.stringify(message)
      this.socket.send(jsonString);
    }
  }
}

export default new WebsocketService()