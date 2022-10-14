const request = require('supertest') // Import supertest
const usersServer = require("./users") // Import the server object
const mainServer = require("../server")

beforeAll(done => {
    done()
})
  
afterAll(done => {
    //write code to close connection to database and server connection once the test is done
    mainServer.close()
    done()
})

describe("Test users get route", () => {
    it ("should return user if the user exists", (done) => {
        request(usersServer)
        .get("/")
        .expect(200)
        .then((response) => {
            expect(response.body.ok).toBe(true)
        })
        done()
    })
})

describe("Test users post route", () => {
    it ("should add new user", (done) => {
        request(usersServer)
        .post("/")
        .expect(200)
        .then((response) => {
            expect(response.body.ok).toBe(true)
        })
        done()
    })
})

describe("Test users put route", () => {
    it ("should add new user", (done) => {
        request(usersServer)
        .put("/")
        .expect(200)
        .then((response) => {
            expect(response.body.ok).toBe(true)
        })
        done()
    })
})

describe("Test users delete route", () => {
    it ("should add new user", (done) => {
        request(usersServer)
        .delete("/")
        .expect(200)
        .then((response) => {
            expect(response.body.ok).toBe(true)
        })
        done()
    })
})