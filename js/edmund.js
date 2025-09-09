function cocinar(comida) {
    console.log(`Cocinando ${comida}...`);

    const tiempos = {
        'pizza': 3000,
        'hamburguesa': 2000,
        'ensalada': 1000
    };

    const tiempo = tiempos[comida.toLowerCase()];

    if (!tiempo) {
        return Promise.reject(new Error(`No podemos cocinar ${comida}`));
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${comida} lista en ${tiempo/1000} segundos`);
            resolve(comida);
        }, tiempo);
    });
}

export { cocinar };