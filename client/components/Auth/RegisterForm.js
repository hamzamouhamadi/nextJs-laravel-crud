import { useState } from "react";
import axios from "../../lib/axios";
import Router, { useRouter } from "next/router";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 3 characters long"),
});
const RegisterForm = () => {
  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    try {
      userSchema.shape[name].parse(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.errors[0].message,
        }));
      }
    }
  };
  const validateUser = () => {
    try {
      userSchema.parse(user);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj = {};
        for (let err of error.errors) {
          errorObj[err.path[0]] = err.message;
        }
        setErrors(errorObj);
      }
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUser()) {
      console.log("Validation failed");
      return;
    }
    setCreating(true);
    try {
      const response = await axios.post("/api/register", user);
      console.log(response.data);
      console.log("User created");
      setCreating(false);
      onClose(true);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative flex flex-col rounded-md bg-transparent bg-clip-border text-black shadow-none border border-gray-400 p-8">
        <h4 className="block font-sans text-2xl font-semibold text-center leading-snug tracking-normal text-blue-gray-900 antialiased">
          Sign up
        </h4>
        <div className=" flex justify-center ml-32 mt-4 absolute">
          <img
            src="https://pngimg.com/d/mouth_smile_PNG5.png"
            className="w-24"
          />
        </div>
        <form
          className="mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <div className="relative h-11 w-full min-w-[200px]"></div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className={`peer h-full w-full rounded-md border ${
                  errors.firstName ? "border-red-600" : "border-blue-gray-200"
                }  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 `}
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                First Name
              </label>
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className={`peer h-full w-full rounded-md border ${
                  errors.lastName ? "border-red-600" : "border-blue-gray-200"
                }  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 `}
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Last Name
              </label>
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="date"
                name="birthDate"
                value={user.birthDate}
                onChange={handleChange}
                className={`peer h-full w-full rounded-md border ${
                  errors.birthDate ? "border-red-600" : "border-blue-gray-200"
                }  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 `}
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Birthday
              </label>
              {errors.birthDate && (
                <p className="text-xs text-red-600">{errors.birthDate}</p>
              )}
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={`peer h-full w-full rounded-md border ${
                  errors.email ? "border-red-600" : "border-blue-gray-200"
                }  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0`}
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={`peer h-full w-full rounded-md border ${
                  errors.password ? "border-red-600" : "border-blue-gray-200"
                }  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 `}
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            className="mt-6 block w-full select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85]"
            type="submit"
          >
            Sign Up
          </button>
          <p class="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Already have an account?
            <a
              class="font-semibold text-black transition-colors hover:underline"
              href="/login"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
