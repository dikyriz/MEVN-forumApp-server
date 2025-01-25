import mongoose, { Schema } from "mongoose";

const votingSchema = new mongoose.Schema(
    {
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
    },
);

votingSchema.index({
    question: 1,
    user: 1,
}, {
    unique: true
})

const Voting = mongoose.model("Voting", votingSchema);

export default Voting;
