import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "admin", "instructor"],
    },
    avatar: {
      url:{type: String},
      fileId: { type: String },
    },
    phone: {
      type: String,
    },
    // ✅ Instructor-specific fields
    bio: { type: String },
    expertise: { type: [String], default: undefined },
    totalCourses: { type: Number },
    ratings: { type: Number },

    // ✅ Student-specific fields
    enrolledCourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: undefined,
    },
    completedLessons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lesson",
      default: undefined,
    },

    quizScores: {
      type: [
        {
          quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
          score: Number,
        },
      ],
      default: undefined,
    },

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
