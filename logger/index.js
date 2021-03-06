const winston = require("winston");
/**
 * This module @returns Log class which can be use to add json formated logs with timestamp and file in which the log is required
 * this can be helpfull for debugging on production
 * @module class Log
 */
class Log {
    constructor() {
        const enviroment = process.env.NODE_ENV || "development";
        this.logger;
        this.file;
        this.options = {};

        if (enviroment === "local") {
            this.logger = winston.createLogger({
                format: winston.format.combine(
                    winston.format.json(),
                    winston.format.prettyPrint(),
                ),
                transports: [new winston.transports.Console({ stderrLevels: ["error"] })],
            });
        } else {
            this.logger = winston.createLogger({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                ),
                transports: [new winston.transports.Console({ stderrLevels: ["error"] })],
            });
        }
    }

    setOption(key, value) {
        this.options[key] = value;
    }

    /**
     * @param  {} message : String
    */
    info(message) {
        this.options["severity"] = "INFO";
        this.logger.info(message, this.options);
    }

    /**
     * @param  {} fileName
    */
    setFile(fileName) {
        this.file = fileName;
    }

    /**
     * @param  {} id
    */
    setSessionId(id) {
        this.sessionId = id;
    }

    /**
     * @param  {} message
    */
    error(errorObj, message, customOption) {
        let option = this.options;
        if (customOption) {
            option = Object.assign(customOption, option);
        }
        const enviroment = process.env.NODE_ENV || "development";
        if (errorObj instanceof Error && typeof errorObj.message !== "undefined") {
            // error object
            option["status"] = errorObj.status || 500;
            option["errorDetails"] = errorObj.details || "Error details not found";
            option["stackTrace"] = (enviroment === "development") ? errorObj.stack : "";
            option["errorMessage"] = errorObj.message || "Internal server error";
        }
        else {
            // simple error message is provided in place of error object
            message = errorObj;
        }

        this.options["severity"] = "ERROR";
        this.logger.error(message, option);
    }
}

module.exports.expressLogConfig = {
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute() { return false; }, // optional: allows to skip some log messages based on request and/or response
};
module.exports.Log = Log;
