import { useState, useEffect } from "react";
import axios from "../../lib/axios";
const UserForm = ({ userId, show, onClose }) => {
  if (!show) {
    return null;
  }
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
        setLoading(false);
      };

      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    setUpdating(true);
    e.preventDefault();

    try {
      await axios.put(`/api/user/${userId}`, user);
      setUpdating(false);
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div class="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
      <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 class="text-gray-800 text-center uppercase font-bold tracking-normal leading-tight mb-4">
            Update user
          </h1>
          {loading && (
            <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div class="border-t-transparent border-solid animate-spin  rounded-full border-black border-2 h-16 w-16"></div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              First Name
            </label>
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Last Name
            </label>
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Birthday
            </label>
            <input
              type="date"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Email
            </label>

            <input
              name="email"
              onChange={handleChange}
              value={user.email}
              type="text"
              class="text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            <label class="text-gray-800 mt-5 text-sm font-bold leading-tight tracking-normal">
              New Password
            </label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <div class="flex items-center justify-start w-full">
              <button class="focus:outline-none   transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm">
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <button
            class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
