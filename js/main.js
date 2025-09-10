import { recibirPedido, mostrarPedidoRecibido } from "./luis.js";
import { procesoRestaurante } from "./santiago.js";
import { cocinar } from "./edmund.js";

const agregarLog = (mensaje, textColor='text-gray-300') => {
    const logConsola = document.getElementById('logConsola');
    const nuevoLog = document.createElement('div');
    nuevoLog.textContent = `> ${mensaje}`;
    nuevoLog.className =  `${textColor} font-mono text-sm`;
    logConsola.appendChild(nuevoLog);
    logConsola.scrollTop = logConsola.scrollHeight;
};

const actualizarOrdenes = (accion, cliente, pedido) => {
    const ordenesDiv = document.getElementById('ordenes');
    const parrafo = ordenesDiv.querySelector('p');
    
    if (accion === 'agregar') {
        if (parrafo.textContent.includes('No hay órdenes activas')) {
            parrafo.textContent = '';
        }
        const nuevaOrden = document.createElement('div');
        nuevaOrden.className = 'orden-item text-sm mb-1';
        nuevaOrden.innerHTML = `👨‍🍳 ${cliente}: ${pedido} <span class="text-amber-600">(en preparación)</span>`;
        nuevaOrden.id = `orden-${cliente}-${pedido}`;
        ordenesDiv.appendChild(nuevaOrden);
    } else if (accion === 'completar') {
        const orden = document.getElementById(`orden-${cliente}-${pedido}`);
        if (orden) {
            orden.innerHTML = `✅ ${cliente}: ${pedido} <span class="text-green-600">(completado)</span>`;
            setTimeout(() => {
                orden.remove();
                if (ordenesDiv.querySelectorAll('.orden-item').length === 0) {
                    parrafo.textContent = 'No hay órdenes activas';
                }
            }, 2000);
        }
    }
};

const procesarPedidoCompleto = async (cliente, pedido) => {
    try {
        agregarLog(`${cliente} llegó y pidió: ${pedido}`, 'text-gray-300');
        
        const pedidoRecibido = await new Promise((resolve) => {
            recibirPedido(cliente, pedido, (pedido) => {
                const pedidoProcesado = mostrarPedidoRecibido(pedido);
                agregarLog(`Pedido de ${cliente} recibido: ${pedidoProcesado}`, 'text-orange-300');
                resolve(pedidoProcesado);
            });
        });
        
        actualizarOrdenes('agregar', cliente, pedido);
        
        const pedidoCocinado = await cocinar(pedidoRecibido, agregarLog);
        
        await procesoRestaurante(cliente, pedidoCocinado, agregarLog);
        
        actualizarOrdenes('completar', cliente, pedido);
        
    } catch (error) {
        agregarLog(`Error: ${error.message}`, 'text-red-500');
    }
};

const procesarMultiplesPedidos = async () => {
    const pedidos = [
        { cliente: "Ana", comida: "pizza" },
        { cliente: "Carlos", comida: "hamburguesa" },
        { cliente: "Laura", comida: "ensalada" }
    ];
    
    agregarLog("🍽️ INICIANDO 3 PEDIDOS EN PARALELO...");
    
    try {
        await Promise.all(
            pedidos.map(pedido => procesarPedidoCompleto(pedido.cliente, pedido.comida))
        );
        
        agregarLog("¡Todos los pedidos completados!", 'text-green-300');
    } catch (error) {
        agregarLog(`Error en pedidos múltiples: ${error.message}`, 'text-red-500');
    }
};


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnPedido').addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value.trim();
        const comida = document.getElementById('comida').value;
        
        if (!nombre) {
            agregarLog("Por favor ingresa tu nombre", 'text-red-300');
            return;
        }
        
        if (comida === "Elige una opción del menú") {
            agregarLog("Por favor selecciona una comida", 'text-red-300');
            return;
        }
        
        procesarPedidoCompleto(nombre, comida);
    });
    
    
    document.getElementById('btnMultiple').addEventListener('click', () => {
        procesarMultiplesPedidos();
    });
    

    document.getElementById('btnLimpiar').addEventListener('click', () => {
        document.getElementById('logConsola').innerHTML = '';
        agregarLog("Log limpiado. Listo para nuevos pedidos...", 'text-green-500');
    });
    
    
    agregarLog("Sistema iniciado. Esperando pedidos...", 'text-green-500');
});

// Función main para ahcer testing
// async function main() {
//     try {
//         const pedidoPromise = new Promise((resolve) => {
//             recibirPedido("Cliente 1", "Pizza", (pedido) => {
//                 const pedidoProcesado = mostrarPedidoRecibido(pedido);
//                 resolve(pedidoProcesado);
//             });
//         });

//         const pedido = await pedidoPromise;
//         const pedidoCocinado = await cocinar(pedido);
//         await procesoRestaurante(pedidoCocinado);

//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// }

// main(); 