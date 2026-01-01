import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 animate-fadeIn">
          {/* Left Column - Form */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-8 lg:p-10 shadow-premium-lg">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Sign In</h1>

              <form onSubmit={submitHandler} className="w-full">
                <div className="my-[2rem]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn-primary w-full my-[1rem] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {isLoading && (
                  <div className="flex justify-center mt-4">
                    <Loader />
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  New Customer?{" "}
                  <Link
                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                    className="text-primary hover:text-primary-600 font-medium transition-colors hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 w-full lg:w-1/2 hidden lg:block">
            <img
              src="/images/login_banner.jpg"
              alt="Login"
              className="w-full h-[600px] lg:h-[700px] rounded-2xl object-cover shadow-premium-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
