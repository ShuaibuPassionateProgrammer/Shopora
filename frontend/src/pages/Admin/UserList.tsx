import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success("User updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <AdminMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400 mt-2">Manage your platform users and their permissions</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl shadow-premium overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-[#333]">
              <p className="text-sm text-gray-400">Total Users: <span className="text-primary font-semibold">{users?.length}</span></p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-[#252525] transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400 font-mono">{user._id.substring(0, 8)}...</span>
                      </td>
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="px-3 py-2 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="p-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors"
                              title="Save"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => setEditableUserId(null)}
                              className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{user.username}</span>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-gray-400 hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="email"
                              value={editableUserEmail}
                              onChange={(e) => setEditableUserEmail(e.target.value)}
                              className="px-3 py-2 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                        ) : (
                          <a
                            href={`mailto:${user.email}`}
                            className="text-gray-300 hover:text-primary transition-colors"
                          >
                            {user.email}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                            <FaCheck className="mr-1" /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600">
                            <FaTimes className="mr-1" /> User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="inline-flex items-center px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 hover:border-red-600 rounded-lg font-medium transition-all duration-300"
                            title="Delete User"
                          >
                            <FaTrash className="mr-2" />
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {users?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No users found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
