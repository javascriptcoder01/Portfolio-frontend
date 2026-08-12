import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { BrandingLogo } from "./BrandingLogo";

export default function AuthContainerForms() {
  const navigate = useNavigate();
  const [showingRegister, setShowingRegister] = useState(true);
  const [fade, setFade] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setFade(true);
    setTimeout(() => {
      setShowingRegister((prev) => !prev);
      setFade(false);
    }, 350);
  };

  const isLogin = !showingRegister;

  // Login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill the all details");
      return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed font-sans"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80&auto=format&fit=crop")',
      }}
    >
      <div
        className={`daf-card relative w-[680px] h-[440px] bg-[#1c1a20] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,20,110,0.55),0_0_60px_rgba(255,20,110,0.25)] ${isLogin ? "daf-login" : ""
          }`}>

        <div className="daf-diagonal absolute top-0 left-0 w-[380px] h-full bg-gradient-to-br from-[#ff2e88] to-[#a8035f] flex flex-col items-center justify-center px-[30px] pt-10 pb-[30px] text-white z-[2] overflow-hidden">
          <BrandingLogo fade={fade} setFade={setFade} showingRegister={showingRegister} />
        </div>

        {/* FORM SIDE - ab sirf conditional render, JSX yaha nahi hai */}
        <div className="daf-form-side absolute top-0 left-[280px] w-[400px] h-full px-[55px] pl-[90px] py-9 flex flex-col justify-center">
          {showingRegister ? (
            <RegisterForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              error={error}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm} />
          ) : (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}