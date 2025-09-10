async function comerPedido(cliente, callback) {
    callback(`Cliente ${cliente} está comiendo...`, 'text-orange-300');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

function pagarCuenta(cliente, callback) {
    callback(`Cuenta de cliente ${cliente} pagada`, 'text-green-300');
}

async function procesoRestaurante(cliente, pedidoCocinado, callback) {
    callback(`Sirviendo ${pedidoCocinado} al cliente ${cliente} ...`, 'text-orange-300');
    await comerPedido(cliente, callback);
    pagarCuenta(cliente, callback);
}
export { procesoRestaurante };
