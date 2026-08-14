import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { BrandingLogo } from "./BrandingLogo";
import { MobileTopLogo } from "./MobileTopLogo";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/slices/authSlice";

export default function AuthContainerForms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showingRegister, setShowingRegister] = useState(true);
  const [fade, setFade] = useState(false);

  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Track whether we're on a mobile viewport (below md = 768px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => setIsMobile(e.matches);
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const toggleForm = () => {
    setFade(true);
    setTimeout(() => {
      setShowingRegister((prev) => !prev);
      setFade(false);
    }, 350);
  };

  const isLogin = !showingRegister;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginRequest(form));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed font-sans px-4 py-8 sm:px-6"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80&auto=format&fit=crop")',
      }}
    >
      <div
        className={`daf-card relative w-full max-w-[680px] md:h-[440px] bg-[#1c1a20] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,20,110,0.55),0_0_60px_rgba(255,20,110,0.25)] flex flex-col md:block ${
          // daf-login class (jo sliding transform CSS trigger karti hai) sirf desktop pe lagao
          isLogin && !isMobile ? "daf-login" : ""
          }`}
      >
        {/* MOBILE HEADER — rounded logo + heading, hidden on md+ */}
        <div className="flex md:hidden">
          <MobileTopLogo showingRegister={showingRegister} fade={fade} />
        </div>

        {/* DESKTOP DIAGONAL BRAND PANEL — hidden below md */}
        <div className="daf-diagonal hidden md:flex absolute top-0 left-0 w-[380px] h-full bg-gradient-to-br from-[#ff2e88] to-[#a8035f] flex-col items-center justify-center px-[30px] pt-10 pb-[30px] text-white z-[2] overflow-hidden">
          <BrandingLogo fade={fade} setFade={setFade} showingRegister={showingRegister} />
        </div>

        {/*
          FORM SIDE
          - Mobile: static box, fixed min-height, content swaps in place, no shift.
          - Desktop (md+): original absolute positioning + daf-login sliding behaviour.
        */}
        <div className="daf-form-side relative w-full min-h-[420px] sm:min-h-[440px] md:min-h-0 md:absolute md:top-0 md:left-[280px] md:w-[400px] md:h-full px-6 sm:px-10 md:px-[55px] md:pl-[90px] py-6 md:py-9 flex flex-col justify-center">
          {showingRegister ? (
            <RegisterForm
              toggleForm={toggleForm}
            />
          ) : (
            <LoginForm
              form={form}
              setForm={setForm}
              loading={loading}
              error={error}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}