import React, { useEffect, useState } from "react";
import background from "../assets/background_2.jpg";
import { getAllCourses } from "../utils/helper";
import OurTeam from "../components/OurTeam";
import CourseCard from "../components/cards/CourseCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import FileUpload from "../components/FileUpload";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses();
      //   console.log(response);
      setCourses(response);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
       
      }}
      className=" flex-col items-center justify-center"
    >
      <section className="text-center py-16 bg-linear-to-r from-indigo-50 to-indigo-100">
        <h1 className="text-4xl font-poppins font-bold mb-4">
          Learn Fast. Test Smarter.
        </h1>
        <p className="text-lg font-roboto text-gray-600 mb-6">
          Micro-courses & quizzes designed for quick, effective learning.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Start Learning
          </button>
          <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100">
            Join for Free
          </button>
        </div>
      </section>
      <section className="  bg-white" >
        <h2 className="text-3xl font-poppins font-bold text-center py-6  underline">
          Top Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-8 px-10 py-8 overflow-y-auto scroll-smooth"
        style={{
         backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
        >
          {courses?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </section>
      <section className="text-center py-16 bg-linear-to-r from-indigo-50 to-indigo-100">
        <h1 className="text-4xl font-poppins font-bold mb-4">
          Learn Fast. Test Smarter.
        </h1>
        <p className="text-lg font-roboto text-gray-600 mb-6">
          Micro-courses & quizzes designed for quick, effective learning.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Start Learning
          </button>
          <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100">
            Join for Free
          </button>
        </div>
      </section>
          {/* <FileUpload/> */}
      <OurTeam />
      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-poppins font-bold text-center mb-8">
          Why Choose SkillUp?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">⚡ Fast Learning</h3>
            <p>Complete bite-sized lessons anytime.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              🧩 Interactive Quizzes
            </h3>
            <p>Test your knowledge instantly.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">🎓 Certificates</h3>
            <p>Earn digital badges for each course.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">📈 Track Progress</h3>
            <p>Monitor your learning journey easily.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home;
