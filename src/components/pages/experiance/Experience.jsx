import React, { useEffect, useState } from "react";
import { Plus, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createExperienceRequest,
    fetchActiveExperiencesRequest,
    updateExperienceRequest,
} from "../../../redux/slices/experienceSlice";
import ExperienceList from "./ExperienceList";

const initialState = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    location: "",
    technologies: "",
    order: 0,
    isActive: true,
};

const Experience = () => {
    const dispatch = useDispatch();
    const { activeExperiences, loading, actionLoading, error } = useSelector((state) => state.experience);

    const [mode, setMode] = useState("view"); // "view" | "create" | "edit"
    const [form, setForm] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0); // FIX: carousel ke liye

    useEffect(() => {
        dispatch(fetchActiveExperiencesRequest());
    }, [dispatch]);

    // FIX: currentIndex ko list ke bounds ke andar clamp karo (delete/status-off ke baad)
    useEffect(() => {
        if (activeExperiences.length > 0 && currentIndex >= activeExperiences.length) {
            setCurrentIndex(activeExperiences.length - 1);
        }
    }, [activeExperiences, currentIndex]);

    const active = activeExperiences?.[currentIndex]; // FIX: current slide ka experience

    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                company: active.company || "",
                position: active.position || "",
                startDate: active.startDate ? active.startDate.substring(0, 10) : "",
                endDate: active.endDate ? active.endDate.substring(0, 10) : "",
                isCurrent: active.isCurrent ?? false,
                description: active.description || "",
                location: active.location || "",
                technologies: (active.technologies || []).join(", "),
                order: active.order ?? 0,
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : name === "order" ? Number(value) : value,
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

        const payload = {
            ...form,
            technologies: form.technologies
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== ""),
            endDate: form.isCurrent ? null : form.endDate,
        };

        if (mode === "create") {
            dispatch(createExperienceRequest(payload));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateExperienceRequest({ id: active._id, data: payload }));
        }

        setMode("view");
    };

    // FIX: Prev/Next navigation
    const handlePrev = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === 0 ? activeExperiences.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === activeExperiences.length - 1 ? 0 : prev + 1));
    };

    const isFieldEnabled = mode === "edit" || mode === "create";
    const showNavigation = activeExperiences.length > 1; // FIX: sirf 2+ hone par dikhega

    return (
        <PageContainer title="Experience">
            <ExperienceList />

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

            {activeExperiences.length === 0 && mode !== "create" ? (
                <div className="text-center text-gray-500 py-8 border rounded-xl mb-6">
                    No active experience selected
                </div>
            ) : (
                <div className="relative border rounded-xl p-5 mb-6">
                    {mode !== "create" && activeExperiences.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                                Experience {currentIndex + 1} of {activeExperiences.length}
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
                                label="Company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="Position"
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={handleChange}
                                disabled={!isFieldEnabled || form.isCurrent}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isCurrent"
                                name="isCurrent"
                                checked={form.isCurrent}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                className="w-4 h-4"
                            />
                            <label htmlFor="isCurrent" className="text-sm text-gray-700">
                                I currently work here
                            </label>
                        </div>

                        <FormField
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                        />

                        <FormField
                            label="Description"
                            name="description"
                            type="textarea"
                            value={form.description}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                        />

                        <FormField
                            label="Technologies (comma-separated)"
                            name="technologies"
                            value={form.technologies}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                            placeholder="React, Node.js, MongoDB"
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

export default Experience;