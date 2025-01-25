import express from "express";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";
import {addAnswer, deleteAnswer} from "../controllers/answerController.js";

const router = express.Router();

//create document
// post /api/v1/answer/:idQuestion
router.post("/:idQuestion", authMiddleware, addAnswer);

//delete document
//delete /api/v1/answer/:id
router.delete("/:id", authMiddleware, deleteAnswer);

export default router;
