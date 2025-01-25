import Question from "../models/Question.js";
import Voting from "../models/Voting.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const likeQuestion = asyncHandler(async (req, res) => {
    const questionId = req.params.idQuestion;

    const questionData = await Question.findById(questionId);

    if(!questionData){
        res.status(404);
        throw new Error('Question not found');
    }

    const newVoting = await Voting.create({
        user: req.user._id,
        question: questionId,
    })

    await Question.findByIdAndUpdate(questionData._id, {
        countVote: questionData.countVote + 1
    });

    return res.status(200).json({
        status: "success",
        data: newVoting
    })
})

export const dislikeQuestion = asyncHandler(async (req, res) => {
    const questionId = req.params.idQuestion;

    await Voting.findOneAndDelete({user: req.user._id, question: questionId})

    const questionData = await Question.findById(questionId);

    if(!questionData){
        res.status(404);
        throw new Error('Question not found');
    }

    await Question.findByIdAndUpdate(questionData._id, {
        countVote: questionData.countVote - 1
    });

    res.status(200).json({
        message: "delete success"
    })

})

export const getVoting = asyncHandler(async (req, res) => {
    const voting = await Voting.findOne({question:  req.params.idQuestion})

    return res.status(200).json({
        message: "get detail voting",
        data: voting,
    })
})