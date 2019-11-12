const Speech = require('ssml-builder');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);
    const result = json.combinacion.slice(1).split(" - ");

    const numbers = result.slice(0, 5).map(x => parseInt(x, 10));
    const stars = result.slice(-2).map(x => parseInt(x, 10));

    console.log("Euromillon", gameDate, numbers, stars);

    return {
        gameDate,
        numbers,
        stars
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        numbers,
        stars
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los números fueron`)
        .pause('300ms');

    numbers.slice(0, -2).forEach(x => speech.say(`${x},`).pause('300ms'));

    speech.say(`${numbers.slice(-2, -1)}`)
        .say(`y ${numbers.slice(-1)}.`)
        .pause('500ms')
        .say(`Las estrellas fueron ${stars[0]}`)
        .pause('300ms')
        .say(`y ${stars[1]}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
