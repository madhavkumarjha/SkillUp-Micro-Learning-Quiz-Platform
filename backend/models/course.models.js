import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lesson_name: { type: String, required: true },
  content: { type: String },
  resourse: { type: String, default: "" },
});

const coursesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
    category: {
      type: String,
      enum: ["programming", "design", "marketing", "business", "other"],
      default: "other",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    thumbnail: {
      type: String, // URL or file path
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", coursesSchema);
