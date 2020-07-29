"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const amountPaid = async (df, fishContextParams) => {
    try {
        df.setResponseText("Your weekly benefit amount is xxx.xx. This amount is determined from base period wages reported by employers you worked for during the last 12-18 months.  The base period is defined as the first four of the last five completed calendar quarters locked in at initial filing.");
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = amountPaid;