"use strict";

const getLogger = require("../../logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

/**
 * To send response to dialogflow for defaultWelcomeIntent
 * @param {Object} df The fullfillment object used to communicate with dialogflow
 * @param {Object} fishContextParams Global context to store data
 */
const missingPayment = async (df, fishContextParams) => {
    try {
        df.setResponseText('Payments usually show up 48-72 hours after the "payment issued date" reflecting in your MYUI payment history tab.  Please allow a few more days for payment to be deposited. Your payment was sent to the: <payment method>');
        df.setOutputContext("fish_context", 50, fishContextParams);
        return df;
    } catch (err) {
        logger.error(err, "Webhook call failed");
        throw err;
    }
};

module.exports = missingPayment;