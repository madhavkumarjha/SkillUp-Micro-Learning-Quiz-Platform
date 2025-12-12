import React, { useState } from "react";
import InputBox from "../InputFields";

// import Dropdown from "../DropDown";
import { Upload,PlusSquare } from "lucide-react";
import { useUploadCourseMediaMutation } from "../../redux/features/api/helperApi";
import { toast } from "react-hot-toast";

function CourseForm({
  courseDetails,
  setCourseDetails,
  handleSubmit,
  isUpdate,
}) {
  const [uploadCourseMedia] = useUploadCourseMediaMutation();
  console.log(courseDetails);
  
  const handleInputChange = (e) => {
    setCourseDetails({
      ...courseDetails,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };

  const categories = [
    "frontend",
    "backend",
    "database",
    "programming",
    "design",
    "business",
    "marketing",
    "other",
  ];

  const addLesson = () => {
    setCourseDetails({
      ...courseDetails,
      lessons: [
        ...courseDetails.lessons,
        { lesson_name: "", content: "", resourse: {
          url: "", fileId: ""
        } },
      ],
    });
  };

  const removeLesson = (index) => {
    const updatedLessons = courseDetails.lessons.filter(
      (lesson, i) => i !== index
    );
    setCourseDetails({
      ...courseDetails,
      lessons: updatedLessons,
    });
  };

  const handleLessonChange = (index, e) => {
    const updatedLessons = courseDetails.lessons.map((lesson, i) => {
      if (i === index) {
        return { ...lesson, [e.target.name]: e.target.value };
      }
      return lesson;
    });
    setCourseDetails({
      ...courseDetails,
      lessons: updatedLessons,
    });
  };

  const handleFileUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", courseDetails.title.replace(/\s+/g, "_"));
    try {
      const response = await uploadCourseMedia(formData).unwrap();
      const updatedLessons = courseDetails.lessons.map((lesson, i) => {
        if (i === index) {
          return {
            ...lesson,
            resourse: {
              url: response.url,
              fileId: response.fileId,
            },
          };
        }
        return lesson;
      });
      setCourseDetails({
        ...courseDetails,
        lessons: updatedLessons,
      });
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(index, file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadThumbnail(file); // store temporarily
    }
  };

  const handleUploadThumbnail = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", "thumbnails");
    try {
      const response = await uploadCourseMedia(formData).unwrap();
      setCourseDetails({
        ...courseDetails,
        thumbnail: { url: response.url, fileId: response.fileId },
      });
      // setThumbnailFile(null);
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pl-20 pr-16">
      <h1 className="text-2xl">
        Course Details
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <InputBox
          label="Title"
          type="text"
          name="title"
          value={courseDetails?.title}
          onChange={handleInputChange}
        />
        <div className="flex my-2 items-center gap-4">
          {/* <label className="block text-gray-700 font-medium mb-2 mr-4">
            Thumbnail
          </label> */}
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            disabled
            value={courseDetails?.thumbnail?.url || ""}
            className="shadow-md rounded-lg px-4 py-2  focus:outline-none border-b text-gray-600 border-white  w-full"
            // onChange={(e) => handleLessonChange(index, e)}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            id={`file-upload-thumbnail`}
            onChange={handleFileSelect}
            className="shadow-md cursor-pointer focus:outline-none rounded-md p-2 w-full"
          />
          <label
            htmlFor={`file-upload-thumbnail`}
            className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <Upload className="cursor-pointer  " size={20} />
          </label>
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-medium mb-2 mr-4">
            Description
          </label>
          <textarea
            name="description"
            value={courseDetails?.description}
            onChange={handleInputChange}
            className="shadow-md focus:outline-none rounded-md p-2 w-full h-32"
          />
        </div>
        {/* <Dropdown/> */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-medium mb-2 mr-4">
            Category
          </label>
          <select
            name="category"
            value={courseDetails?.category}
            onChange={handleInputChange}
            className="shadow-md focus:outline-none rounded-md p-2 w-full"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label className="flex items-center  text-gray-700 font-medium mb-2 gap-4">
            Lessons
           <PlusSquare
              className="cursor-pointer border-none rounded-md text-white bg-green-500 hover:bg-green-600 hover:text-white"
              size={20}
              onClick={addLesson}

            />
          </label>
          {courseDetails?.lessons?.map((lesson, index) => (
            <div key={index}>
              <input
                type="text"
                name="lesson_name"
                placeholder="lesson_name"
                value={lesson?.lesson_name}
                onChange={(e) => handleLessonChange(index, e)}
                className="shadow-md rounded-lg px-4 py-2  focus:outline-none border-b text-gray-600 border-white  w-full"
              />
              <textarea
                type="text"
                name="content"
                placeholder="Content"
                value={lesson?.content}
                onChange={(e) => handleLessonChange(index, e)}
                className="shadow-md rounded-lg px-4 py-2  focus:outline-none border-b text-gray-600 border-white  w-full"
              />

              <div className="flex items-center gap-2">
                <input
                  // label="Resource"
                  type="text"
                  name="resourse"
                  placeholder="Resource URL"
                  disabled
                  value={lesson?.resourse?.url || ""}
                  className="shadow-md rounded-lg px-4 py-2  focus:outline-none border-b text-gray-600 border-white  w-full"
                  // onChange={(e) => handleLessonChange(index, e)}
                />
                <input
                  type="file"
                  accept="*/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-upload-${index}`}
                />
                <label
                  htmlFor={`file-upload-${index}`}
                  className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  <Upload className="cursor-pointer  " size={20} />
                </label>
              </div>
              <button
                type="button"
                onClick={() => removeLesson(index)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove Lesson
              </button>
            </div>
          ))}
          
        </div>
        <button
          type="submit"
          // onClick={handleSubmit}
          className="bg-green-500 lg:mx-[45%] md:mx-[30%] mx-[20%] text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          {isUpdate ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
