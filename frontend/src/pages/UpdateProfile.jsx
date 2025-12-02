import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../redux/features/api/helperApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function UpdateProfile() {
  const location = useLocation();
  const userId = location.state?.userId;
  const {data,isLoading,isError} = useGetUserProfileQuery(userId);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data?.user) {
      setFormData(data.user);
    }
  }, [data]);

  

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ id: formData._id, data: formData }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };
    if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-600 font-semibold ">Something went wrong</p>;

  return (
    <div className="">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              defaultValue={formData?.name || ""}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={formData?.email || ""}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formData?.bio && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                defaultValue={formData?.bio || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
          )}

          {formData?.phone && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <textarea
                id="phone"
                name="phone"
                defaultValue={formData?.phone || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
