import React from "react";
import { Save, X, RotateCcw } from "lucide-react";

const FormButtons = ({
    mode = "create",

    onCancel,
    onReset,

    loading = false,

    cancelText = "Cancel",
    resetText = "Reset",

    createText = "Save",
    updateText = "Update",

    showReset = false,

    disabled = false,
}) => {
    // VIEW MODE
    if (mode === "view") {
        return (
            <div className="flex justify-end pt-5 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-700
                        font-medium
                        hover:bg-gray-50
                        transition
                    "
                >
                    <X size={18} />
                    Close
                </button>
            </div>
        );
    }

    return (
        <div
            className="
                flex
                flex-col-reverse
                sm:flex-row
                sm:items-center
                sm:justify-end
                gap-3
                pt-5
                border-t
                border-gray-200
            "
        >
            {/* CANCEL */}

            <button
                type="button"
                onClick={onCancel}
                disabled={loading || disabled}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-700
                    font-medium
                    hover:bg-gray-50
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                <X size={18} />
                {cancelText}
            </button>

            {/* RESET */}

            {showReset && (
                <button
                    type="button"
                    onClick={onReset}
                    disabled={loading || disabled}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2 
                        px-5
                        py-2.5
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-600
                        font-medium
                        hover:bg-gray-50
                        transition
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    <RotateCcw size={17} />
                    {resetText}
                </button>
            )}

            {/* SAVE / UPDATE */}

            <button
                type="submit"
                disabled={loading || disabled}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    text-white
                    font-medium
                    hover:bg-indigo-700
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                <Save size={18} />

                {loading
                    ? "Saving..."
                    : mode === "edit"
                        ? updateText
                        : createText}
            </button>
        </div>
    );
};

export default FormButtons;