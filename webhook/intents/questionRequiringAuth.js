"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const defaultWelcomeIntent = async (df, fishContextParams) => {
    try {
        df.setResponseText("Would you like to authenticate to get the answer to this question?");
        df.setOutputContext("fish_context", 50, fishContextParams)
        df.setOutputContext("question-requiring-authentication-followup",1);
        df.setOutputContext("not-authenticated",5)
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = defaultWelcomeIntent;