import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswerIndex: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0 && value < this.options.length;
        },
        message: "Correct answer index must be a valid index in options array",
      },
    },
    marks: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [questionSchema],
    totalMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    passingMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    timeLimit: {
      type: Number, // in minutes
      required: true,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);
export const Quiz = mongoose.model("Quiz", quizSchema);
