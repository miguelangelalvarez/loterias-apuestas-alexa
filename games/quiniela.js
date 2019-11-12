const Speech = require('ssml-builder');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);
    const matches = json.partidos;

    const results = matches.map(match => ({
        local: match.local,
        visitor: match.visitante,
        firstSign: match.signo.split('-')[0],
        secondSign: match.signo.split('-')[1]
    }));

    console.log("Quiniela", gameDate, results);

    return {
        gameDate,
        results
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        results
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los resultados fueron los siguientes.`)
        .pause('500ms');

    results.slice(0, -1).forEach(x => speech.say(`${x.local} ${x.visitor}, ${x.firstSign}.`).pause('500ms'));

    const lastResult = results[results.length - 1];

    speech.say(`Por último, ${lastResult.local} ${lastResult.visitor}, ${lastResult.firstSign} ${lastResult.secondSign}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
