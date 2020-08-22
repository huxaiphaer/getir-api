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
  return mongooseDBConnector.connectToDB().then(() => {
    recordManager = new RecordManager(mongooseDBConnector);
    return recordManager;
  });
});

// we need to close DB connections properly
// after all cases are completed
afterAll(() => {
  mongooseDBConnector.disconnect();
});

describe("RecordManager Bussiness Logic Layer tests", () => {
  test("valid case should return 2 records", () => {
    const startDate = '2016-08-14';
    const endDate = '2018-02-02';
    const minCount = 2990;
    const maxCount = 3000;

    return recordManager.getData(startDate, endDate, minCount, maxCount)
      .then(records => {
        return expect(records.length).toEqual(2);
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