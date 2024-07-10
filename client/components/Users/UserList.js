import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import DeleteUser from "../modals/DeletePopUp";
import ModalUpdate from "../modals/UpdateForm";
import CreateForm from "../modals/CreateForm";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [id, setId] = useState("");
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isOpen, setIsOpen] = useState(false);

  const showForm = () => {
    setUpdateForm(!updateForm);
    console.log("hello mee");
  };
  const showDeletePopUp = () => {
    setdeletePopUp(!deletePopUp);
  };
  const setIdOfUserToDelete = (id) => {
    setId(id);
    showDeletePopUp();
  };
  const setIdOfUserToUpdate = (id) => {
    setId(id);
    showForm();
  };
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log("hello");
  };
  useEffect(() => {
    fetchUsers();
  }, [sortBy, sortOrder]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user", {
        params: {
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      setUsers(response.data);
      console.log("users fetched");
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  const handleSort = (field) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(order);
    setIsOpen(!isOpen);
  };
  const handleOptionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between px-5 mt-6">
        <button
          className="bg-black text-white px-4 py-1 rounded"
          onClick={toggleModal}
        >
          create
        </button>
        <div>
          <button
            onClick={handleOptionClick}
            class="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Sort By{" "}
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isOpen && (
            <div class=" absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-28">
              <ul class="py-2 text-sm text-gray-700">
                <li onClick={() => handleSort("firstName")}>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Name
                  </a>
                </li>
                <li onClick={() => handleSort("birthDate")}>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Birthday
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                First Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Last Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Birthday
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-16 w-16"></div>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr class="hover:bg-gray-50" key={user.id}>
                  <td class="px-6 py-4">{user.firstName}</td>
                  <td class="px-6 py-4">{user.lastName}</td>
                  <td class="px-6 py-4">{user.email}</td>
                  <td class="px-6 py-4">{user.birthDate}</td>
                  <td class="px-6 py-4">
                    <div class="flex justify-end gap-4">
                      <button onClick={() => setIdOfUserToDelete(user.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button onClick={() => setIdOfUserToUpdate(user.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div></div>
      </div>
      <CreateForm show={showModal} onClose={toggleModal}></CreateForm>
      <ModalUpdate
        userId={id}
        show={updateForm}
        onClose={showForm}
      ></ModalUpdate>
      <DeleteUser
        userId={id}
        show={deletePopUp}
        onClose={showDeletePopUp}
      ></DeleteUser>
    </div>
  );
};

export default UserList;
