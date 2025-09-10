function cocinar(comida, callback) {
    callback(`Cocinando ${comida}...`, 'text-orange-300');
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
            callback(`${comida} lista en ${tiempo/1000} segundos`, 'text-orange-300');
            resolve(comida);
        }, tiempo);
    });
}

export { cocinar };