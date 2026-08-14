// components/auth/MobileTopLogo.jsx

export const MobileTopLogo = ({ showingRegister, fade }) => {
    return (
        <div className="w-full bg-gradient-to-br from-[#ff2e88] to-[#a8035f] flex flex-col items-center justify-center gap-2 pt-7 pb-5 px-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_14px_rgba(255,20,110,0.6)] overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-none stroke-[#ff2e88] stroke-[1.6]">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            </div>

            <h1
                className="text-white text-base font-semibold text-center transition-opacity duration-300"
                style={{ opacity: fade ? 0 : 1 }}
            >
                {showingRegister ? "WELCOME BACK!" : "HELLO FRIEND!"}
            </h1>
        </div>
    );
};