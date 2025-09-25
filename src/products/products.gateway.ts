import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway()
export class ProductsGateway {
  @WebSocketServer()
  private readonly server: Server;
  handleProductUpdated() {
    this.server.emit('productUpdated');
  }
}
