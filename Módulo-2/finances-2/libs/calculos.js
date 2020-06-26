function somatorio(numeros) {
    const sum = numeros.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    return sum;
}

function media(numeros) {
    const sum = somatorio(numeros);
    const media = sum / numeros.length;
    return media;
}

async function teste(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(number);
        }, Math.random() * 1000);
    });
}

export default {somatorio, media, teste};