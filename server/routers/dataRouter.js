const express = require("express");
const powerController = require('../controllers/powerController.js')

const dataRouter = express.Router();

dataRouter.post('/', powerController.loadState, (req, res)=>{
    res.status(200).json(res.locals.stateData);
});

module.exports = dataRouter;