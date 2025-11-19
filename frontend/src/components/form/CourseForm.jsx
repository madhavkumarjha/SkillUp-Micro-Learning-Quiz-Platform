import React from "react";
import InputBox from '../InputFields'

function CourseForm({ courseDetails, setCourseDetails }) {
  console.log(courseDetails);
  
  const handleInputChange = (e) => {
    setCourseDetails({
      ...courseDetails,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };
  return (
    <fieldset className="flex flex-col gap-4 pl-20 pr-16">
      <h1 className="text-greenColor text-3xl font-semibold font-Montserrat">
        Course Details
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-6 py-8 rounded-md bg-green-300 w-full">
        <InputBox
          label="courseID"
          type="text"
          name="courseID"
          value={courseDetails.courseID}
          onChange={handleInputChange}
        />
        <InputBox
          label="Title"
          type="text"
          name="title"
          value={courseDetails.title}
          onChange={handleInputChange}
        />
      </div>
    </fieldset>
  );
}

export default CourseForm;
