const dotenv = require("dotenv");
const MongooseDBConnector = require("../src/mongodb/MongooseDBConnector");
const RecordManager = require("../src/controller/RecordManager");
const RESPONSE_CODES = require("../src/utils/RESPONSE_CODES.json");

let mongooseDBConnector;
let recordManager;


beforeAll(() => {
  dotenv.config();
  mongooseDBConnector = new MongooseDBConnector();
  return mongooseDBConnector.connectToDB().then(() => {
    recordManager = new RecordManager(mongooseDBConnector);
    return recordManager;
  });
});

afterAll(() => {
  mongooseDBConnector.disconnect();
});

describe("RecordManager", () => {
  test("should validate case should return 2 records", () => {
    const startDate = '2016-08-14';
    const endDate = '2018-02-02';
    const minCount = 2990;
    const maxCount = 3000;

    return recordManager.getData(startDate, endDate, minCount, maxCount)
      .then(records => {
        return expect(records.length).toEqual(2);
      });
  });

  test("should get invalid request params", () => {
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

  test("should get invalid request params when minCount is greater than maxCount", () => {
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