import React, { useEffect, useState } from "react";
import { Plus, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createEducationRequest,
    fetchActiveEducationRequest,
    updateEducationRequest,
} from "../../../redux/slices/educationSlice";
import EducationList from "./EducationList";

const initialState = {
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    grade: "",
    description: "",
    location: "",
    order: 0,
    isActive: true,
};

const Education = () => {
    const dispatch = useDispatch();
    const { activeEducations, loading, actionLoading, error } = useSelector((state) => state.education);

    const [mode, setMode] = useState("view"); // "view" | "create" | "edit"
    const [form, setForm] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchActiveEducationRequest());
    }, [dispatch]);

    useEffect(() => {
        if (activeEducations.length > 0 && currentIndex >= activeEducations.length) {
            setCurrentIndex(activeEducations.length - 1);
        }
    }, [activeEducations, currentIndex]);

    const active = activeEducations?.[currentIndex];

    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                degree: active.degree || "",
                institution: active.institution || "",
                startYear: active.startYear ?? "",
                endYear: active.endYear ?? "",
                grade: active.grade || "",
                description: active.description || "",
                location: active.location || "",
                order: active.order ?? 0,
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: ["startYear", "endYear", "order"].includes(name) ? Number(value) : value,
        });
    };

    const handleCreateClick = () => {
        if (mode === "create") {
            setMode("view");
        } else {
            setForm(initialState);
            setMode("create");
        }
    };

    const handleEditClick = () => {
        if (mode === "edit") {
            setMode("view");
        } else {
            setMode("edit");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            dispatch(createEducationRequest(form));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateEducationRequest({ id: active._id, data: form }));
        }

        setMode("view");
    };

    const handlePrev = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === 0 ? activeEducations.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === activeEducations.length - 1 ? 0 : prev + 1));
    };

    const isFieldEnabled = mode === "edit" || mode === "create";
    const showNavigation = activeEducations.length > 1;

    return (
        <PageContainer title="Education">
            <EducationList />

            <div className="flex justify-end mb-6 gap-2">
                <button
                    type="button"
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700"
                >
                    {mode === "create" ? <X size={18} /> : <Plus size={18} />}
                    {mode === "create" ? "Cancel" : "Create"}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {activeEducations.length === 0 && mode !== "create" ? (
                <div className="text-center text-gray-500 py-8 border rounded-xl mb-6">
                    No active education selected
                </div>
            ) : (
                <div className="relative border rounded-xl p-5 mb-6">
                    {mode !== "create" && activeEducations.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                                Education {currentIndex + 1} of {activeEducations.length}
                            </span>
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700"
                            >
                                {mode === "edit" ? <X size={16} /> : null}
                                {mode === "edit" ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Degree"
                                name="degree"
                                value={form.degree}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="Institution"
                                name="institution"
                                value={form.institution}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Start Year"
                                name="startYear"
                                type="number"
                                value={form.startYear}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="End Year"
                                name="endYear"
                                type="number"
                                value={form.endYear}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Grade"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                            <FormField
                                label="Location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                        </div>

                        <FormField
                            label="Description"
                            name="description"
                            type="textarea"
                            value={form.description}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                        />

                        <FormField
                            label="Order"
                            name="order"
                            type="number"
                            value={form.order}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                        />

                        {isFieldEnabled && (
                            <div className="flex justify-end pt-4 border-t">
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-60"
                                >
                                    <Save size={18} />
                                    {actionLoading ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </form>

                    {showNavigation && mode !== "create" && (
                        <div className="flex items-center gap-2 mt-5 pt-4 border-t">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </PageContainer>
    );
};

export default Education;