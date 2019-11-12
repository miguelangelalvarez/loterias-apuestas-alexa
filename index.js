const Alexa = require('ask-sdk-core');
const Speech = require('ssml-builder');
const helper = require('./helper');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = '¿Qué es lo que quieres saber?';
        const repromptOutput = 'Quizás te gustaría conocer algún resultado reciente.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const CaptureGameNameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureGameNameIntent';
    },
    async handle(handlerInput) {
        const gameName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'gameName');
        const genderGameName = helper.getGenderArticle(gameName);

        const speech = new Speech();
        speech.say(`Entendido. Voy a consultar el resultado ${genderGameName} ${gameName}.`)
            .pause('1500ms');

        const speakOutput = speech.ssml(true);
        const speakGameResult = await helper.getGameResult(gameName);

        console.log('speakOutput', speakOutput);
        console.log('speakGameResult', speakGameResult);

        return handlerInput.responseBuilder
            .speak(speakOutput + speakGameResult)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speech = new Speech();
        speech.say('Puedes consultar los resultados del euromillón, el quíntuple plus, el loto turf, el gordo, el quinigol, la primitiva, la quiniela, la bonoloto y la lotería nacional.')
            .pause('1s')
            .say('Para ello, di, por ejemplo, quiero saber el resultado de la primitiva.');

        const speakOutput = speech.ssml(true);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'De acuerdo';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .withShouldEndSession(true)
            .getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¡De nada!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .withShouldEndSession(true)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log('ERROR', error.stack);

        const speakOutput = 'Lo siento. No he entendido lo que quieres consultar. Si necesitas ayuda, di, ayuda.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CaptureGameNameIntentHandler,
        HelpIntentHandler,
        CancelIntentHandler,
        StopIntentHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
