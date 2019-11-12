const Speech = require('ssml-builder');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);
    const result = json.combinacion.split(" - ");

    const numbers = result.slice(0, 4).map(x => parseInt(x, 10));
    const lastNumbers = result.slice(-1)[0].split(' ');

    numbers.push(parseInt(lastNumbers[0], 10));

    const keyNumber = parseInt(lastNumbers[1].substring(2, lastNumbers[1].length - 1), 10);

    console.log("Gordo", gameDate, numbers, keyNumber);

    return {
        gameDate,
        numbers,
        keyNumber
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        numbers,
        keyNumber
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los números fueron`)
        .pause('300ms');

    numbers.slice(0, -2).forEach(x => speech.say(`${x},`).pause('300ms'));

    speech.say(`${numbers.slice(-2, -1)}`)
        .say(`y ${numbers.slice(-1)}.`)
        .pause('500ms')
        .say(`El número clave fue el ${keyNumber}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
