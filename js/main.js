import { recibirPedido, mostrarPedidoRecibido } from "./luis.js";
import { procesoRestaurante } from "./santiago.js";
import { cocinar } from "./edmund.js";

async function main() {
    try {
        const pedidoPromise = new Promise((resolve) => {
            recibirPedido("Cliente 1", "Pizza", (pedido) => {
                const pedidoProcesado = mostrarPedidoRecibido(pedido);
                resolve(pedidoProcesado);
            });
        });

        const pedido = await pedidoPromise;

        const pedidoCocinado = await cocinar(pedido);

        await procesoRestaurante(pedidoCocinado);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

main();