"use strict";

const intents = (intent) => {
    const mappedIntent = mapper[intent];
    if (mappedIntent)
        return mappedIntent;
    else
        return undefined;
};

const mapper = {
    "Default Welcome Intent": require("./intents/defaultWelcomeIntent"),
    "Default Fallback Intent": require("./intents/defaultFallbackIntent"),
    "dol.amountPaid": require("./intents/amountPaid"),
    "dol.deleteClaim": require("./intents/deleteClaim"),
    "dol.missingPayment": require("./intents/missingPayment"),
    "dol.pendingPaymentIssue": require("./intents/pendingPaymentIssue"),
    "dol.questionRequiringAuth": require("./intents/questionRequiringAuth"),
    "dol.remainingBalance": require("./intents/remainingBalance"),
    "dol.whenToRequestPayment": require("./intents/whenToRequestPayment"),
    "dol.whereIsMyPin": require("./intents/whereIsMyPin"),

    "dol.authenticateSSN": require("./intents/authenticateSSN"),
    "dol.authenticatePIN": require("./intents/authenticatePIN"),

};

module.exports = intents;
