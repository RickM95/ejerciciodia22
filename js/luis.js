const recibirPedido = (cliente, pedido, callback) =>{
    console.log(`${cliente} llegó y pidió: ${pedido}`);
    setTimeout(() => {
       return callback(pedido);
    }, 1000);
}

const  mostrarPedidoRecibido=(pedido)=>{
    console.log(`Pedido recibido: ${pedido}`);
    return pedido;
}

export { recibirPedido, mostrarPedidoRecibido };
