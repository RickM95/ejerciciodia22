function cocinarPedido() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Pizza");
    }, 2000);
  });
}

function comerPedido() {
  return new Promise((resolve) => {
    console.log("Cliente está comiendo...");
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function pagarCuenta() {
  console.log("Cuenta pagada");
}

async function procesoRestaurante() {
  const pedido = await cocinarPedido();
  console.log(`Sirviendo ${pedido} al cliente...`);

  await comerPedido();
  pagarCuenta();
}

procesoRestaurante();
