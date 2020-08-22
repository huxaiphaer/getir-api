const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')

const {expect} = chai;
chai.use(chaiHttp)

describe("Records test", () => {

    it("should get all data", end => {
        chai
            .request(app)
            .get("/v1/api/allData")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                end();
            });
    }).timeout(30000);
    it("should fetch all info with valid input", done => {
        chai
            .request(app)
            .post("/v1/api/data")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('code', 0);
                expect(res.body).to.have.property('msg', 'Success');
                done();
            });
    });
});