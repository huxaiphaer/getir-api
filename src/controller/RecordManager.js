const RESPONSE_CODES = require("../utils/RESPONSE_CODES.json");
const validators = require("../utils/JoiSchemaValidatorHelper");

module.exports = function (_dbConnector) {

    let dbConnector = _dbConnector;

    function main() { }

    this.getData = function (startDate, endDate, minCount, maxCount) {
        if (!validators.isValidGetDataParams({ startDate, endDate, minCount, maxCount })) {
            return Promise.reject(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS)
        }

        return dbConnector.getFilteredRecords(startDate, endDate, parseInt(minCount), parseInt(maxCount)).catch(() => {
            return Promise.reject(RESPONSE_CODES.DB_QUERY_FAILED);
        });
    };

    main();
};