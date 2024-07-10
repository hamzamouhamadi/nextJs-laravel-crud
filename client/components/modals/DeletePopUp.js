import axios from "../../lib/axios";

export default function DeleteUser({ userId, show, onClose }) {
  if (!show) {
    return null;
  }
  const deleteUser = async () => {
    try {
      await axios.delete(`/api/user/${userId}`);
      onClose(true);
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };
  return (
    <div class="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
      <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 class="text-gray-800 text-2xl font-bold tracking-normal leading-tight mb-4 text-center">
            Are you sur you want to delete this User ?
          </h1>
          <div class="flex items-center justify-between w-full">
            <button
              class="focus:outline-none   transition duration-150 ease-in-out hover:bg-red-800 bg-red-700 rounded text-white px-8 py-2 text-sm"
              onClick={deleteUser}
            >
              Yes
            </button>
            <button
              class="focus:outline-none   ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
