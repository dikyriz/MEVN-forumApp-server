import mongoose, { Schema } from "mongoose";

const reportSchema = new mongoose.Schema(
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
        report: {
            type: String,
            required: [true, "report harus diisi"]
        }
    },
);

reportSchema.index({
    question: 1,
    user: 1,
}, {
    unique: true
})

const Report = mongoose.model("Report", reportSchema);

export default Report;
