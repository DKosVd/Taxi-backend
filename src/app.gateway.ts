import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private users = [];
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('TAXI_GET_DRIVER')
  getDriver(client: Socket, payload: string): void {
    const user = this.users.filter((user) => {
      if (user.role === 'driver') {
        return user;
      }
    })[0];
    setTimeout(() => {
      this.server.emit('TAXI_SEND_DRIVER', JSON.stringify({ user, payload }));
    }, 2000);
  }

  @SubscribeMessage('TAXI_PRIVATE_MESSAGE')
  sendPrivateMessage(client: Socket, payload: string) {
    const { content, user } = JSON.parse(payload);
    this.server.emit('TAXI_PRIVATE_MESSAGE', {
      content,
      user,
    });
  }

  @SubscribeMessage('TAXI_CONNECT')
  connectionFirst(client: Socket, payload: string) {
    console.log(client.id);
    const user = JSON.parse(payload);
    this.users.push({ ...user, id: client.id });
  }

  @SubscribeMessage('TAXI_OPEN_CHAT')
  openChat() {
    this.server.emit('TAXI_OPEN_CHAT', {
      open: true,
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
