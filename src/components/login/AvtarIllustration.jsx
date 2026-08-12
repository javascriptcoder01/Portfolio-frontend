
export const AvtarIllustration = () => {
    return (
        <div className="w-[210px] h-[150px] mb-2.5 relative">
            <svg
                viewBox="0 0 200 160"
                className="w-full h-full overflow-visible"
            >
                <ellipse
                    className="fill-black/[0.18]"
                    cx="100"
                    cy="148"
                    rx="55"
                    ry="8"
                />

                <g className="daf-briefcase">
                    <rect
                        x="48"
                        y="92"
                        width="26"
                        height="20"
                        rx="3"
                        fill="#7a3b12"
                    />
                    <rect
                        x="55"
                        y="86"
                        width="12"
                        height="8"
                        rx="2"
                        fill="none"
                        stroke="#7a3b12"
                        strokeWidth="3"
                    />
                    <rect x="48" y="99" width="26" height="4" fill="#5c2c0d" />
                </g>

                <g className="daf-figure">
                    <g className="daf-leg-left">
                        <rect
                            x="90"
                            y="108"
                            width="9"
                            height="34"
                            rx="4"
                            fill="#2b2b2b"
                        />
                        <ellipse cx="94.5" cy="145" rx="8" ry="4" fill="#f4f4f4" />
                    </g>
                    <g className="daf-leg-right">
                        <rect
                            x="101"
                            y="108"
                            width="9"
                            height="34"
                            rx="4"
                            fill="#2b2b2b"
                        />
                        <ellipse cx="105.5" cy="145" rx="8" ry="4" fill="#f4f4f4" />
                    </g>

                    <path
                        d="M82,78 Q100,68 118,78 L114,114 Q100,120 86,114 Z"
                        fill="#e9e9ea"
                    />
                    <path
                        d="M82,78 Q100,68 118,78 L116,90 Q100,84 84,90 Z"
                        fill="#ffffff"
                    />

                    <g className="daf-arm-left">
                        <rect
                            x="80"
                            y="78"
                            width="8"
                            height="30"
                            rx="4"
                            fill="#e9e9ea"
                        />
                        <circle cx="84" cy="110" r="4.5" fill="#f2c49b" />
                    </g>
                    <g className="daf-arm-right">
                        <rect
                            x="112"
                            y="78"
                            width="8"
                            height="30"
                            rx="4"
                            fill="#dcdcde"
                        />
                        <circle cx="116" cy="110" r="4.5" fill="#f2c49b" />
                    </g>

                    <g className="daf-head">
                        <circle cx="100" cy="58" r="16" fill="#f2c49b" />
                        <path
                            d="M84,54 Q100,36 116,54 Q116,44 100,42 Q84,44 84,54 Z"
                            fill="#caa15a"
                        />
                    </g>
                </g>
            </svg>
        </div>
    )
}