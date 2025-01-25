import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {dislikeQuestion, getVoting, likeQuestion} from "../controllers/votingController.js"

const router = express.Router();

//create document
// post /api/v1/voting/:idQuestion
router.post("/:idQuestion", authMiddleware, likeQuestion);

//delete document
//delete /api/v1/voting/:idQuestion
router.delete("/:idQuestion", authMiddleware, dislikeQuestion);

//get detail voting by IdQuestion
//get /api/v1/voting/:idQuestion
router.get("/:idQuestion", getVoting);

export default router;
