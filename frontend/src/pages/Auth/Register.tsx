import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 animate-fadeIn">
          {/* Left Column - Image */}
          <div className="flex-1 w-full lg:w-1/2 hidden lg:block">
            <img
              src="/images/register_banner.jpg"
              alt="Register"
              className="w-full h-[600px] lg:h-[700px] rounded-2xl object-cover shadow-premium-lg"
            />
          </div>

          {/* Right Column - Form */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-8 lg:p-10 shadow-premium-lg">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-400 mb-8">Join us and start shopping today!</p>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                      value={username}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaCheckCircle className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                {isLoading && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    className="text-primary hover:text-primary-600 font-medium transition-colors hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
