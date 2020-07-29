"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const deleteClaim = async (df, fishContextParams) => {
    try {
        df.setResponseText("You filed your claim on <Date_Filed> If it's less than 12 days, system displays: You must request deleting your claim within 12 days of filing. Please request a call back. If it greater than or equal than 12 days: You are not eligible to delete your claim, please stop requesting payment to close your claim.");
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = deleteClaim;