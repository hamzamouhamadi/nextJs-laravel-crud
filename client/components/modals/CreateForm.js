import { useState } from "react";
import axios from "../../lib/axios";

export default function UpdateForm({ show, onClose }) {
  if (!show) {
    return null;
  }
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setCreating(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", user);
      console.log(response.data);
      console.log("User created");
      setCreating(false);
      onClose(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div class="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
      <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 class="text-gray-800 text-center uppercase font-bold tracking-normal leading-tight mb-4">
            Add user
          </h1>
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
              Email
            </label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Birthday Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
              class="text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Password
            </label>
            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-400 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <div class="flex items-center justify-start w-full">
              <button class="focus:outline-none   transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm">
                {creating ? "Creating..." : "Create"}
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
}
