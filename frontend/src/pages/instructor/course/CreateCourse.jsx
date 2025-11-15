import { useState } from "react"
import CourseForm from "../../../components/course/CourseForm";

function CreateCourse() {
  const initalData={
    title:"",
    description:"",
    category:"",
    thumbnail:{
      url:"",
      fileId:""
    },
    lessons:[
      {
        lesson_name:"",
        content:""
      }
    ]
  }
    const [courseDetails, setCourseDetails] = useState(initalData);
  return (
    <div>
      <CourseForm
      setCourseDetails={setCourseDetails}
      courseDetails={courseDetails}
      isUpdate={false}
      />
    </div>
  )
}

export default CreateCourse