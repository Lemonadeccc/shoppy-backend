import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({ cors: { origin: '*' } })
export class ProductsGateway {
  @WebSocketServer()
  private readonly server: Server;
  handleProductUpdated() {
    this.server.emit('productUpdated');
  }
}
