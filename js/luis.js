const recibirPedido = (cliente, pedido, callback) => {
    setTimeout(() => {
        callback(pedido); 
    }, 1000);
}

const mostrarPedidoRecibido = (pedido) => {
    return pedido; 
}

export { recibirPedido, mostrarPedidoRecibido };
