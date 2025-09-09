async function comerPedido() {
    console.log("Cliente está comiendo...");
    await new Promise(resolve => setTimeout(resolve, 2000));
}

function pagarCuenta() {
    console.log("Cuenta pagada ✅");
}

async function procesoRestaurante(pedidoCocinado) {
    console.log(`Sirviendo ${pedidoCocinado} al cliente...`);
    await comerPedido();
    pagarCuenta();
}
export { procesoRestaurante };
