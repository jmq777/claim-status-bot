"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const whereIsMyPin = async (df, fishContextParams) => {
    try {
        df.setResponseText("You filed your claim on <file_Date>. Your pin was mailed  to this address: <address>, please allow at least 7 days before requesting a new pin. To request a new PIN please go online");
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = whereIsMyPin;