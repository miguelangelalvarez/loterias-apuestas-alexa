const Speech = require('ssml-builder');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);
    const result = json.combinacion.split(" - ");

    const numbers = result.slice(0, 5).map(x => parseInt(x, 10));
    const lastNumbers = result.slice(-1)[0].split(' ');

    numbers.push(parseInt(lastNumbers[0], 10));

    const complementary = parseInt(lastNumbers[1].substring(2, lastNumbers[1].length - 1), 10);
    const bonusNumber = parseInt(lastNumbers[2].substring(2, lastNumbers[2].length - 1), 10);

    console.log("Bonoloto", gameDate, numbers, complementary, bonusNumber);

    return {
        gameDate,
        numbers,
        complementary,
        bonusNumber
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        numbers,
        complementary,
        bonusNumber
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los números fueron`)
        .pause('300ms');

    numbers.slice(0, -2).forEach(x => speech.say(`${x},`).pause('300ms'));

    speech.say(`${numbers.slice(-2, -1)}`)
        .say(`y ${numbers.slice(-1)}.`)
        .pause('500ms')
        .say(`El complementario fue el ${complementary}`)
        .say(`y el reintegro el ${bonusNumber}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
