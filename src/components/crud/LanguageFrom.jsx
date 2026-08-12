import React, { useState } from "react";

const LanguagesForm = ({
    item,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState({
        language: item?.language || "",
        proficiency: item?.proficiency || "",
        speaking: item?.speaking || "",
        listening: item?.listening || "",
        reading: item?.reading || "",
        writing: item?.writing || "",
        certification: item?.certification || "",
        description: item?.description || "",
    });

    // =========================================================
    // CHANGE
    // =========================================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div>

                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Language Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* LANGUAGE */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            required
                            placeholder="e.g. English"
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />
                    </div>

                    {/* OVERALL PROFICIENCY */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Overall Proficiency
                        </label>

                        <select
                            name="proficiency"
                            value={
                                formData.proficiency
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                bg-white
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Select proficiency
                            </option>

                            <option value="Native">
                                Native
                            </option>

                            <option value="Fluent">
                                Fluent
                            </option>

                            <option value="Professional">
                                Professional
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Basic">
                                Basic
                            </option>

                            <option value="Beginner">
                                Beginner
                            </option>
                        </select>
                    </div>

                </div>

            </div>

            {/* =================================================
                SKILLS
            ================================================= */}

            <div>

                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Language Skills
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* SPEAKING */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Speaking
                        </label>

                        <select
                            name="speaking"
                            value={
                                formData.speaking
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                bg-white
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Select level
                            </option>

                            <option value="Native">
                                Native
                            </option>

                            <option value="Fluent">
                                Fluent
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Basic">
                                Basic
                            </option>
                        </select>
                    </div>

                    {/* LISTENING */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Listening
                        </label>

                        <select
                            name="listening"
                            value={
                                formData.listening
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                bg-white
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Select level
                            </option>

                            <option value="Native">
                                Native
                            </option>

                            <option value="Fluent">
                                Fluent
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Basic">
                                Basic
                            </option>
                        </select>
                    </div>

                    {/* READING */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reading
                        </label>

                        <select
                            name="reading"
                            value={
                                formData.reading
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                bg-white
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Select level
                            </option>

                            <option value="Native">
                                Native
                            </option>

                            <option value="Fluent">
                                Fluent
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Basic">
                                Basic
                            </option>
                        </select>
                    </div>

                    {/* WRITING */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Writing
                        </label>

                        <select
                            name="writing"
                            value={
                                formData.writing
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                px-3
                                py-2.5
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                bg-white
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Select level
                            </option>

                            <option value="Native">
                                Native
                            </option>

                            <option value="Fluent">
                                Fluent
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Basic">
                                Basic
                            </option>
                        </select>
                    </div>

                </div>

            </div>

            {/* =================================================
                CERTIFICATION
            ================================================= */}

            <div>

                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Certification
                </h3>

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification / Exam
                    </label>

                    <input
                        type="text"
                        name="certification"
                        value={
                            formData.certification
                        }
                        onChange={handleChange}
                        placeholder="e.g. IELTS 8.0, TOEFL, JLPT N2"
                        className="
                            w-full
                            px-3
                            py-2.5
                            border
                            border-gray-200
                            rounded-xl
                            outline-none
                            focus:border-indigo-500
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    />

                </div>

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>

                <textarea
                    name="description"
                    value={
                        formData.description
                    }
                    onChange={handleChange}
                    rows={4}
                    placeholder="Add any additional information about your language proficiency..."
                    className="
                        w-full
                        px-3
                        py-2.5
                        border
                        border-gray-200
                        rounded-xl
                        outline-none
                        resize-none
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <FormButtons
                mode={item ? "edit" : "create"}
                onCancel={onCancel}
            />

        </form>
    );
};

export default LanguagesForm;