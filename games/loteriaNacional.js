const Speech = require('ssml-builder');

const getGameAttributes = (json) => {
    const gameDate = json.fecha_sorteo.slice(0, 10);

    const firstPrize = parseInt(json.primerPremio.decimo, 10);
    const secondPrize = parseInt(json.segundoPremio.decimo, 10);
    const bonusNumbers = json.reintegros.map(x => parseInt(x.decimo, 10));

    console.log("Loteria Nacional", firstPrize, secondPrize, bonusNumbers);

    return {
        gameDate,
        firstPrize,
        secondPrize,
        bonusNumbers
    };
};

const getGameOutput = (json) => {
    const {
        gameDate,
        firstPrize,
        secondPrize,
        bonusNumbers
    } = getGameAttributes(json);

    const speech = new Speech();
    speech.say(`En el sorteo del día ${gameDate}, los resultados fueron los siguientes.`)
        .pause('500ms')
        .say(`Primer premio, ${firstPrize}.`)
        .pause('500ms')
        .say(`Segundo premio, ${secondPrize}.`)
        .pause('500ms')
        .say(`Reintegros, ${bonusNumbers[0]}, ${bonusNumbers[1]} y ${bonusNumbers[2]}.`);

    return speech.ssml(true);
};

module.exports = {
    getGameOutput
};
