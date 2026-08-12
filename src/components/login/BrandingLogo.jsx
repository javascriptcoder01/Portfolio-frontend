import { AvtarIllustration } from "./AvtarIllustration"

export const BrandingLogo = ({ fade, showingRegister }) => {
    return (
        <>
            <h1
                className="text-2xl leading-tight mb-2 text-center transition-opacity duration-300"
                style={{ opacity: fade ? 0 : 1 }}
            >
                {showingRegister ? (
                    <>WELCOME<br />BACK!</>
                ) : (
                    <>HELLO<br />FRIEND!</>
                )}
            </h1>
            <p
                className="text-xs opacity-90 leading-relaxed max-w-[210px] mx-auto text-center transition-opacity duration-300"
                style={{ opacity: fade ? 0 : 1 }}
            >
                {showingRegister
                    ? "Aapki details surakshit hain — apna safar hamare saath shuru karein."
                    : "Apni details daaliye aur aaj hi apna safar shuru kijiye."}
            </p>

            <AvtarIllustration />
        </>
    )
}