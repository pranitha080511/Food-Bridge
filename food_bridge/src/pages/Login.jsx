import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role");

  const handleLogin = () => {
    if (role === "donator") navigate("/donator");
    if (role === "volunteer") navigate("/volunteer");
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md border border-zinc-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-400">
          {role ? `${role.toUpperCase()} LOGIN` : "LOGIN"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-black border border-zinc-700 rounded text-gray-200"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-black border border-zinc-700 rounded text-gray-200"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-400 text-black py-3 rounded-lg font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
