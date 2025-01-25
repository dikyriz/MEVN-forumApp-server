import express from "express";
import {authMiddleware, permisionUser} from "../middleware/authMiddleware.js";
import {addReport, getReport} from "../controllers/reportController.js";

const router = express.Router();

//create report
// post /api/v1/report/question/:idQuestion
router.post("/:idQuestion", authMiddleware, addReport);

//get all report
//get /api/v1/voting/question
router.get("/", authMiddleware, permisionUser('admin'), getReport);

export default router;
