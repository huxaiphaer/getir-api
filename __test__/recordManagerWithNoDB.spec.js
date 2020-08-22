const dotenv = require("dotenv");
const MongooseDBConnector = require("../src/mongoosedb/MongooseDBConnector");
const RecordManager = require("../src/controller/RecordManager");
const RESPONSE_CODES = require("../src/utils/RESPONSE_CODES.json");

let mongooseDBConnector;
let recordManager;

// we need to initialize Mongo and Record Manager
// before starting the tests. We will use genuine classes
// not mockups.
beforeAll(() => {
  dotenv.config();
  mongooseDBConnector = new MongooseDBConnector();
  // I did not call mongooseDBConnector.connectToDB() intentionally
  // to test when DB connection is not successfull
  recordManager = new RecordManager(mongooseDBConnector);
  return recordManager;
});

describe("RecordManager Bussiness Logic Layer tests when DB disconnected", () => {
  test("valid case should return 2 records", () => {
    const startDate = '2016-08-14';
    const endDate = '2018-02-02';
    const minCount = 2990;
    const maxCount = 3000;

    return recordManager.getData(startDate, endDate, minCount, maxCount)
      .then(() => {
        throw new Error("This promise needs to throw exception")
      }).catch(error => {
        return expect(error.code).toEqual(RESPONSE_CODES.DB_QUERY_FAILED.code);
      });
  });

  test("should get INVALID_REQUEST_PARAMETERS with missing params", () => {
    const startDate = undefined;
    const endDate = '2018-02-02';
    const minCount = 2990;
    const maxCount = 3000;

    return recordManager.getData(startDate, endDate, minCount, maxCount)
      .then(() => {
        throw new Error("This promise needs to throw exception")
      }).catch(error => {
        return expect(error.code).toEqual(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS.code);
      });
  });

  test("should get INVALID_REQUEST_PARAMETERS when minCount is greater than maxCount", () => {
    const startDate = '2016-08-14';
    const endDate = '2018-02-02';
    const minCount = 3100;
    const maxCount = 3000;

    return recordManager.getData(startDate, endDate, minCount, maxCount)
      .then(() => {
        throw new Error("This promise needs to throw exception")
      }).catch(error => {
        return expect(error.code).toEqual(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS.code);
      });
  });
});