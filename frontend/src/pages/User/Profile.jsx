import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-8 shadow-premium">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password (leave blank to keep current)"
                className="w-full px-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loadingUpdateProfile}
              >
                {loadingUpdateProfile ? "Updating..." : "Update Profile"}
              </button>

              <Link
                to="/user-orders"
                className="flex-1 px-6 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-white rounded-lg font-medium transition-all duration-300 text-center"
              >
                View My Orders
              </Link>
            </div>

            {loadingUpdateProfile && (
              <div className="flex justify-center mt-4">
                <Loader />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
