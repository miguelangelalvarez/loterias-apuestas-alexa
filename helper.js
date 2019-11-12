const fetch = require('node-fetch');
const euromillon = require('./games/euromillon');
const quintuplePlus = require('./games/quintuplePlus');
const lototurf = require('./games/lototurf');
const gordo = require('./games/gordo');
const quinigol = require('./games/quinigol');
const primitiva = require('./games/primitiva');
const quiniela = require('./games/quiniela');
const bonoloto = require('./games/bonoloto');
const loteriaNacional = require('./games/loteriaNacional');

const { GAME } = require('./constants');

const getGameId = (gameName) => {
    const gameKey = Object.keys(GAME).find(key => GAME[key].NAME === gameName);

    return GAME[gameKey].ID;
}

const getGenderArticle = (gameName) => {
    switch (gameName) {
        case GAME.EUROMILLON.NAME:
        case GAME.QUINTUPLE_PLUS.NAME:
        case GAME.LOTOTURF.NAME:
        case GAME.GORDO.NAME:
        case GAME.QUINIGOL.NAME:
            return 'del';
        case GAME.PRIMITIVA.NAME:
        case GAME.QUINIELA.NAME:
        case GAME.BONOLOTO.NAME:
        case GAME.LOTERIA_NACIONAL.NAME:
            return 'de la';
    }
};

const formatNumber = (number) => (number < 10) ? `0${number}` : `${number}`;


const getDateFormat = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${formatNumber(month)}${formatNumber(day)}`;
};

const getGameOutput = (gameName, json) => {
    switch (gameName) {
        case GAME.EUROMILLON.NAME:
            return euromillon.getGameOutput(json);
        case GAME.QUINTUPLE_PLUS.NAME:
            return quintuplePlus.getGameOutput(json);
        case GAME.LOTOTURF.NAME:
            return lototurf.getGameOutput(json);
        case GAME.GORDO.NAME:
            return gordo.getGameOutput(json);
        case GAME.QUINIGOL.NAME:
            return quinigol.getGameOutput(json);
        case GAME.PRIMITIVA.NAME:
            return primitiva.getGameOutput(json);
        case GAME.QUINIELA.NAME:
            return quiniela.getGameOutput(json);
        case GAME.BONOLOTO.NAME:
            return bonoloto.getGameOutput(json);
        case GAME.LOTERIA_NACIONAL.NAME:
            return loteriaNacional.getGameOutput(json);
        default:
            return {};
    }
};

const getGameResult = async (gameName) => {
    const now = new Date();
    const before = new Date();
    before.setDate(before.getDate() - 7);

    const afterDate = getDateFormat(now);
    const beforeDate = getDateFormat(before);
    const gameId = getGameId(gameName);

    const response = await fetch(`https://www.loteriasyapuestas.es/servicios/buscadorSorteos?` +
        `game_id=${gameId}&celebrados=true&fechaInicioInclusiva=${beforeDate}&fechaFinInclusiva=${afterDate}&limiteMaxResultados=1`);
    const jsonResponse = await response.json();

    console.log("Game result (JSON)", gameName, jsonResponse);

    return getGameOutput(gameName, jsonResponse[0]);
};

module.exports = {
    getGenderArticle,
    getGameResult,
}
