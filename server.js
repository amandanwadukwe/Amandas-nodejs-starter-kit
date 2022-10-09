const express = require("express");

const app = express();
const port = 3000;

//Middleware
app.use(express.json({limit:"100mb"}));

// app.use(app.router);
// routes.initialize(app);

//Import routes
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

//Setup all the routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

