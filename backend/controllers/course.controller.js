import { Course } from "../models/course.models.js";
import { User } from "../models/user.models.js";

// create a new Course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, thumbnailUrl, thumbnailFileId, lessons } = req.body;
    const instructorId = req.user.id;
    
    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can create courses" });
    }

    const newCourse = new Course({
      title,
      description,
      category,
      thumbnail: {
        url: thumbnailUrl,
        fileId: thumbnailFileId,
      },
      lessons,
      instructor: instructorId,
    });

    await newCourse.save();
    res.status(201).json({ course: newCourse });
  } catch (error) {
    res.status(500).json({ message: error || "Server error" });
  }
};

// publish or unpublish a Course
export const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { isPublished } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.isPublished = isPublished;
    await course.save();
    res
      .status(200)
      .json({ message: `Course ${isPublished ? "published" : "unpublished"}` });
  } catch (error) {
    res.status(500).json({ message:error|| "Server error" });
  }
};

// update Course details
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, category, thumbnail, lessons, isPublished } =
      req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (thumbnail) course.thumbnail = thumbnail;
    if (lessons) course.lessons = lessons;
    if (isPublished !== undefined) course.isPublished = isPublished;
    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get Course details by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate(
      "instructor",
      "name email bio"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete a Course
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get all Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email bio");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get all published Courses
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "instructor",
      "name email bio"
    );
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
