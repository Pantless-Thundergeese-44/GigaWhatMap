const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const dataRouter = require('./routers/dataRouter.js')
// const googleRouter = require('./routers/googleRouter.js')

//parse JSON incoming request
app.use(express.json());


// app.use('/auth/google', googleRouter);
app.use ('/data', dataRouter);


//Any unrouted traffic given a 404 error page
app.use("*", (req, res) =>
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"))
);

// global error handler (TODO)
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Global Error Handler Caught an Error",
    status: 500,
    message: { err: "An error occured on the server" },
  };
  console.log(err);
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  res.status(errorObj.status).json(errorObj.message);
});

//set the server up to listen for requests on
app.listen(PORT, () => {console.log(`Server listening on port: ${PORT}...`)});
