import React from 'react'

function CourseCard({course}) {
    console.log(course);
    
  return (
<div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <img className="w-full h-48 object-cover" src={course.thumbnail} alt="Placeholder Image"/>
  <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4">
       {course.description}
      </p>
      <a href="#" className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition duration-200">see more</a>
  </div>
</div>
  )
}

export default CourseCard