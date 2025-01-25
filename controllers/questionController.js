import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { checkPermission } from "../middleware/checkPermission.js";
import {populate} from "dotenv";

export const CreateQuestion = asyncHandler(async (req, res) => {
  const { title, question, category } = req.body;

  const newQuestion = await Question.create({
    title,
    question,
    category,
    userId: req.user._id,
  });

  return res.status(200).json({
    message: "berhasil input question",
    data: newQuestion,
  });
});
export const QuestionsAll = asyncHandler(async (req, res) => {
    //req query
    const queryObject = {...req.query};

    //fungsi mengabaikan pagination dan sort
    const excludeField = ["page", 'sort'];
    excludeField.forEach(e => delete queryObject[e]);

    // console.info(req.query, queryObject);

    let query = Question.find(queryObject).populate("userId", "-password");

    // console.info(req);
    //sort by field
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limitData = 5;
    const skipData = (page -1) * limitData;

    query = query.skip(skipData).limit(limitData);

    if(req.query.page){
      const numQuestion = await Question.countDocuments();
      if(skipData >= numQuestion){
        throw new Error("This page does not exist");
      }
    }

    const QuestionData = await query;

    const countQuestion = await Question.countDocuments(queryObject);

  return res.status(200).json({
    message: "data berhasil ditampilkan",
    data: QuestionData,
    total: countQuestion,
  });
});
export const DetailQuestion = asyncHandler(async (req, res) => {
  const idParams = req.params.id;

  const idQuestion = await Question.findById(idParams).populate("userId", "-password").populate({path:"listAnswer",
    populate:({ path: "user", select: "-password"})});

  if (!idQuestion) {
    return res.status(404).json({
      message: "data tidak ditemukan",
    });
  }

  return res.status(200).json({
    message: "data detail ditampilkan",
    data: idQuestion,
  });
});
export const UpdateQuestion = asyncHandler(async (req, res) => {
  const { title, question, category } = req.body;

  const idParams = req.params.id;

  const idQuestion = await Question.findById(idParams);

  if (!idQuestion) {
    res.status(404);
    throw new Error("pertanyaan tidak ditemukan");
  }

  checkPermission(req.user, idQuestion.userId, res);

  idQuestion.title = title;
  idQuestion.question = question;
  idQuestion.category = category;

  await idQuestion.save();

  return res.status(200).json({
    message: "data berhasil update",
    data: idQuestion,
  });
});
export const DeleteQuestion = asyncHandler(async (req, res) => {
  const idParams = req.params.id;

  const idQuestion = await Question.findById(idParams);

  if (!idQuestion) {
    res.status(404);
    throw new Error("pertanyaan tidak ditemukan");
  }

  checkPermission(req.user, idQuestion.userId, res);

  await idQuestion.deleteOne();

  return res.status(200).json({
    message: "delete success",
  });
});
