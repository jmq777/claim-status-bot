"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const whenToRequestPayment = async (df, fishContextParams) => {
    try {
        df.setResponseText("Please request payment every two weeks on your next scheduled biweekly request. Your next date to request payment is: <Open_Benefit_week_end>");
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = whenToRequestPayment;