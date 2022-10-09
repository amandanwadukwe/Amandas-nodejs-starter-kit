const supertest = require('supertest') // Import supertest
const userServer = require("./users") // Import the server object
const requestWithSupertest = supertest(userServer) // We will use this function to mock HTTP requests

afterEach(done => { // afterEach function is provided by Jest and executes once all tests are finished
    userServer.close() // We close the server connection once all tests have finished
    done()
})