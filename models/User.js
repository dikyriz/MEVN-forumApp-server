import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user harus diinput"],
    unique: [true, "user sudah ada"],
  },
  email: {
    type: String,
    required: [true, "email harus diinput"],
    unique: [true, "email sudah ada"],
    validate: {
      validator: validator.isEmail,
      message: "harus format email",
    },
  },
  password: {
    type: String,
    required: [true, "password harus diinput"],
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  toJSON: { virtuals: true }, toObject: { virtuals: true }
});

userSchema.virtual('listQuestion', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'userId',
  justOne: false
});

userSchema.methods.comparePassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
