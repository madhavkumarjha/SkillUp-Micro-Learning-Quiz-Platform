import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "instructor"],
    },
    avatar: {
      type: String,
      default: "",
    },
    phone:{
      type: String,
      default: "",
    },
     // ✅ Instructor-specific fields
    bio: { type: String },
    expertise: [{ type: String }],
    totalCourses: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },

// ✅ Student-specific fields
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    quizScores: [
      {
        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
        },
        score: { type: Number },
      },
    ],

    // ✅ Password reset fields
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//hash password before saving (you can implement this with bcrypt in future)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
