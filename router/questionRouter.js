import express from "express";
import {
  CreateQuestion,
  QuestionsAll,
  DetailQuestion,
  UpdateQuestion,
  DeleteQuestion,
} from "../controllers/questionController.js";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";

const router = express.Router();

//create document
// post /api/v1/question
router.post("/", authMiddleware, CreateQuestion);

//read document
// get /api/v1/question
router.get("/", QuestionsAll);
//get /api/v1/question/:id
router.get("/:id", DetailQuestion);

//update document
//put /api/v1/question/:id
router.put("/:id", authMiddleware, UpdateQuestion);

//delete document
//delete /api/v1/question/:id
router.delete("/:id", authMiddleware, DeleteQuestion);

export default router;
