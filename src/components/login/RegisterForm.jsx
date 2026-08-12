// components/auth/RegisterForm.jsx

import GoogleIcon from "./GoogleIcon";

const RegisterForm = ({ toggleForm, username, setUsername, email, setEmail, password, setPassword, error, handleSubmit }) => {

    // DEMO GOOGLE LOGIN HANDLER (testing purpose only)
    const handleGoogleLogin = () => {
        console.log("Google login clicked - demo only, real OAuth abhi wire nahi hai");
    };
    return (
        <form className="transition-opacity duration-300">
            <h2 className="text-white text-[23px] mb-5">Register</h2>

            <div className="mb-2">
                <label className="block text-xs text-[#ff5fa2] mb-1">Username</label>
                <div className="daf-input-wrap relative border-b border-[#555]">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-white text-sm pr-[26px] pb-2 pt-1"
                    />
                    <svg viewBox="0 0 24 24" className="absolute right-0 top-0.5 w-4 h-4 fill-none stroke-[1.6]">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                </div>
            </div>

            <div className="mb-2">
                <label className="block text-xs text-[#ff5fa2] mb-1">Email</label>
                <div className="daf-input-wrap relative border-b border-[#555]">
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-white text-sm pr-[26px] pb-2 pt-1"
                    />
                    <svg viewBox="0 0 24 24" className="absolute right-0 top-0.5 w-4 h-4 fill-none stroke-[1.6]">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                    </svg>
                </div>
            </div>

            <div className="mb-2">
                <label className="block text-xs text-transparent mb-1">Password</label>
                <div className="daf-input-wrap relative border-b border-[#555]">
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-white text-sm pr-[26px] pb-2 pt-1"
                    />
                    <svg viewBox="0 0 24 24" className="absolute right-0 top-0.5 w-4 h-4 fill-none stroke-[1.6]">
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                </div>
            </div>

            <button className="w-full mt-1.5 p-3 border-none rounded-full bg-gradient-to-r from-[#ff2e88] to-[#b3006b] text-white font-bold tracking-wide cursor-pointer shadow-[0_0_12px_rgba(255,20,110,0.7)] transition duration-300 hover:brightness-110">
                Register
            </button>

            {/* GOOGLE LOGIN BUTTON */}
            <div className="flex flex-col justify-center items-center gap-3 p-2">
                <p className="text-gray-400 tracking-tighter">----------- or -----------</p>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 p-2 rounded-full bg-white text-[#333] text-sm font-medium cursor-pointer transition hover:bg-gray-100"
                >
                    <GoogleIcon size={18} />
                    Sign in with Google
                </button>
            </div>
            <p className="text-center text-xs text-[#ccc]">
                Already have an account?{" "}
                <a onClick={toggleForm} className="text-[#ff2e88] font-bold cursor-pointer no-underline hover:tracking-wider">
                    Sign In
                </a>
            </p>
        </form>
    );
};

export default RegisterForm;