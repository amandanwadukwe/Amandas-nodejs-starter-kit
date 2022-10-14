const request = require('supertest') // Import supertest
const authServer = require("./auth") // Import the server object
const mainServer = require("../server")

beforeAll(done => {
    done()
})
  
afterAll(done => {
    //write code to close connection to database and server connection once the test is done
    mainServer.close()
    done()
})

describe("Test auth route", () => {
    it ("should return authentication token", (done) => {
        request(authServer)
        .post("/")
        .expect(200)
        .then((response) => {
            expect(response.body.ok).toBe(true)
        })
        done()
    })
})