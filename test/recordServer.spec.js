const dotenv = require("dotenv");
const fetch = require('node-fetch');
const MongooseDBConnector = require("../src/mongodb/mongooseDBConnector");
const RecordManager = require("../src/controller/RecordManager");
const Server = require("../src/Server");
const RESPONSE_CODES = require("../src/utils/RESPONSE_CODES.json");

let serverInstance;
let mongooseDBConnector;
let recordManager;
let serverHandle;

beforeAll(() => {
  dotenv.config();
  mongooseDBConnector = new MongooseDBConnector();
  return mongooseDBConnector.connectToDB().then(() => {
    recordManager = new RecordManager(mongooseDBConnector);
    serverInstance = new Server(recordManager);
    return serverInstance.listen();
  }).then(server => {
    serverHandle = server;
    return server;
  });
});

afterAll(() => {
  mongooseDBConnector.disconnect();

  return serverHandle.close();
});

describe("API tests", () => {
  test("valid case should return 2 records", () => {
    const postParams = {
      startDate: '2016-08-14',
      endDate: '2018-02-02',
      minCount: 2990,
      maxCount: 3000
    };

    return fetch("http://localhost:8090/v1/api/data", {
      method: "post",
      body: JSON.stringify(postParams),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(jsonData => {
        return expect(jsonData.records.length).toEqual(2);
      });
  });
  test("should get INVALID_REQUEST_PARAMETERS with missing params", () => {
    const postParams = {
      // startDate: '2016-08-14',
      endDate: '2018-02-02',
      minCount: 2990,
      maxCount: 3000
    };

    return fetch("http://localhost:8090/v1/api/data", {
      method: "post",
      body: JSON.stringify(postParams),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(jsonData => {
        return expect(jsonData.code).toEqual(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS.code);
      });
  });
  test("should get INVALID_REQUEST_PARAMETERS when minCount is greater than maxCount", () => {
    const postParams = {
      startDate: '2016-08-14',
      endDate: '2018-02-02',
      minCount: 3100,
      maxCount: 3000
    };

    return fetch("http://localhost:8090/v1/api/data", {
      method: "post",
      body: JSON.stringify(postParams),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(jsonData => {
        return expect(jsonData.code).toEqual(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS.code);
      });
  });
});