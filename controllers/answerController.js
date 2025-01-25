import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {checkPermission} from "../middleware/checkPermission.js";

export const addAnswer = asyncHandler(async (req, res) => {
    const questionId = req.params.idQuestion;

    const questionData = await Question.findById(questionId);

    if(!questionData){
        res.status(404);
        throw new Error('Question not found');
    }

    const newAnswer = await Answer.create({
        answer: req.body.answer,
        question: questionId,
        user: req.user._id
    })

    return res.status(202).json({
        status: "success",
        data: newAnswer
    })
})

export const deleteAnswer = asyncHandler(async (req, res) => {
    const paramsId = req.params.id;

    const answerData = await Answer.findById(paramsId);

    checkPermission(req.user, answerData.user, res);

    await Answer.findByIdAndDelete(paramsId);

    res.status(200).json({
        message: "delete answer success"
    })

})