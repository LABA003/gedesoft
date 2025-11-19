
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Pedido } from 'generated/prisma';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:4200', // Permite explícitamente tu app de Angular
        methods: ['GET', 'POST'],
        credentials: true,
    }
})
export class PedidosGateway {
    @WebSocketServer()
    server: Server; // Esta es la "antena" de radio

    //  NO es una ruta HTTP. Es una función simple
    emitirNuevoPedido(pedido: Pedido) {
        // 'emit' significa "transmitir"
        this.server.emit('nuevo_pedido', pedido);
    }

    // 2. Escuchar el evento 'pedido_listo' (enviado por la Cocina/Mesero)
    @SubscribeMessage('pedido_listo')
    handlePedidoListo(@MessageBody() data: { pedidoId: number, mesa: number | string }) {
        // Este evento se reemite a todos los meseros
        this.server.emit('pedido_listo_notificacion', data);
    }
}