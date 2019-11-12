const Speech = require('ssml-builder');

const { ORDINAL } = require('../constants');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);
    const result = json.combinacion.split(" - ");

    const horses = result.slice(0, 4).map(x => parseInt(x, 10));
    const lastRaceHorses = result.slice(-1)[0].split(' ');

    horses.push(parseInt(lastRaceHorses[0], 10));

    const secondClassified = parseInt(lastRaceHorses[1].substring(2, lastRaceHorses[1].length - 1), 10);

    console.log("Quintuple Plus", gameDate, horses, secondClassified);

    return {
        gameDate,
        horses,
        secondClassified
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        horses,
        secondClassified
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los clasificados fueron los siguientes.`)
        .pause('500ms');

    for (let i = 0; i < horses.length; i++) {
        speech.say(`En la ${ORDINAL[i]} carrera, el caballo número ${horses[i]}.`).pause('500ms');
    }

    speech.say(`Por último, en la quinta carrera, el segundo clasificado fue el caballo número ${secondClassified}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
