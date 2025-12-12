import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lesson_name: { type: String, required: true },
  content: { type: String },
  resourse: {
    url: { type: String },
    fileId: { type: String },
  },
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
      enum:["frontend", "backend", "database", "programming", "design", "business", "marketing", "other"],
      default: "other",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    resourses: [
      {
        title: { type: String },
        url: { type: String },
        fileId: { type: String },
      },
    ],
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    thumbnail: {
      url: { type: String },
      fileId: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", coursesSchema);
