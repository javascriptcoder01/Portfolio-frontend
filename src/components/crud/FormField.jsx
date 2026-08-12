import React from "react";

const FormField = ({
    label,
    name,
    type = "text",
    value = "",
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
}) => {

    const commonClass = `
        w-full
        px-3
        py-2.5
        border
        border-gray-200
        rounded-xl
        outline-none
        transition
        focus:ring-2
        focus:ring-indigo-500
        focus:border-indigo-500
        disabled:bg-gray-100
        disabled:text-gray-500
    `;

    return (
        <div className="w-full">

            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}

                {required && (
                    <span className="text-red-500 ml-1">
                        *
                    </span>
                )}
            </label>

            {type === "textarea" ? (

                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={5}
                    className={commonClass}
                />

            ) : (

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={commonClass}
                />

            )}

        </div>
    );
};

export default FormField;