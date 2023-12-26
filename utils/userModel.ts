import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Plese enter your name!"],
      minLength: [6, "Name must be at least 6 characters long!"],
      maxLength: [20, "Name must be less than 20 charecters!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Plese enter your email address!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Plese enter your Password!"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
