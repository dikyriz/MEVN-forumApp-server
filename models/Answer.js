import mongoose, { Schema } from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        answer: {
          type: String,
          required: [true, "jawaban harus diinput"],
        },
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: [true, "Tujuan pertanyaan harus ada"],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "userId harus terisi"],
        },
        countVote: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
