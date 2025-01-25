import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "judul harus diinput"],
      unique: [true, "judul sudah ada"],
    },
    question: {
      type: String,
      required: [true, "pertanyaan harus diinput"],
    },
    category: {
      type: String,
      enum: ["javascript", "database", "nodejs", "vuejs"],
      required: [true, "pertanyaan harus memiliki kategori"],
    },
    userId: {
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
    toJSON: { virtuals:true},
    toObject: { virtuals:true}
  }
);

questionSchema.virtual("listAnswer", {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'question',
    justOne: false
})

questionSchema.pre("deleteOne", {document:true, query:false}, async function () {
    await this.model("Report").deleteMany({question: this._id});
    await this.model("Voting").deleteMany({question: this._id});
    await this.model("Answer").deleteMany({question: this._id});
})

const Question = mongoose.model("Question", questionSchema);

export default Question;
