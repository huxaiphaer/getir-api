const MongooseDBConnector = require("./src/mongodb/mongooseDBConnector");
const RecordManager = require("./src/controller/RecordManager");
const Server = require("./src/Server");
const dotenv = require("dotenv");

let serverInstance;
let mongooseDBConnector;
let recordManager;

function main() {
  dotenv.config();

  mongooseDBConnector = new MongooseDBConnector();

  mongooseDBConnector.connectToDB().then(() => {
    recordManager = new RecordManager(mongooseDBConnector);
    serverInstance = new Server(recordManager);
    return serverInstance.listen();
  });
}

main();