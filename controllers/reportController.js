import Question from "../models/Question.js";
import Report from "../models/Report.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addReport = asyncHandler(async (req, res) => {
    const questionId = req.params.idQuestion;

    const questionData = await Question.findById(questionId);

    if(!questionData){
        res.status(404);
        throw new Error('Question not found');
    }

    const newReport = await Report.create({
        user: req.user._id,
        question: questionId,
        report: req.body.report,
    })

    return res.status(200).json({
        status: "success",
        data: newReport
    })
})

export const getReport = asyncHandler(async (req, res) => {
    const report = await Report.find().populate("user", "-password").populate("question")

    return res.status(200).json({
        message: "get detail report",
        data: report,
    })
})