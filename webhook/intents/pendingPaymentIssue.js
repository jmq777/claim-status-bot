"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const questionRequiringAuth = async (df, fishContextParams) => {
    try {
        df.setResponseText("In order to provide you with the information you requested, I need to authenticate you by getting your social security number and four digit PIN, do you want to continue?");
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = questionRequiringAuth;