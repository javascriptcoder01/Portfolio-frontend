import React, { useEffect, useState } from "react";
import { Plus, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createProjectRequest,
    fetchActiveProjectRequest,
    updateProjectRequest,
} from "../../../redux/slices/projectSlice";
import ProjectList from "./ProjectList";

const initialState = {
    title: "",
    description: "",
    image: "", // comma-separated URLs, submit ke time array me convert hoga
    technologies: "", // comma-separated string
    githubUrl: "",
    liveUrl: "",
    order: 0,
    isActive: true,
};

const Project = () => {
    const dispatch = useDispatch();
    const { activeProjects, loading, actionLoading, error } = useSelector((state) => state.project);

    const [mode, setMode] = useState("view"); // "view" | "create" | "edit"
    const [form, setForm] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchActiveProjectRequest());
    }, [dispatch]);

    useEffect(() => {
        if (activeProjects.length > 0 && currentIndex >= activeProjects.length) {
            setCurrentIndex(activeProjects.length - 1);
        }
    }, [activeProjects, currentIndex]);

    const active = activeProjects?.[currentIndex];

    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                title: active.title || "",
                description: active.description || "",
                image: (active.image || []).join(", "),
                technologies: (active.technologies || []).join(", "),
                githubUrl: active.githubUrl || "",
                liveUrl: active.liveUrl || "",
                order: active.order ?? 0,
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "order" ? Number(value) : value,
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

        // FIX: comma-separated strings -> arrays, submit se pehle
        const payload = {
            ...form,
            image: form.image
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i !== ""),
            technologies: form.technologies
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== ""),
        };

        if (mode === "create") {
            dispatch(createProjectRequest(payload));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateProjectRequest({ id: active._id, data: payload }));
        }

        setMode("view");
    };

    const handlePrev = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === 0 ? activeProjects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === activeProjects.length - 1 ? 0 : prev + 1));
    };

    const isFieldEnabled = mode === "edit" || mode === "create";
    const showNavigation = activeProjects.length > 1;

    return (
        <PageContainer title="Projects / Work">
            <ProjectList />

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

            {activeProjects.length === 0 && mode !== "create" ? (
                <div className="text-center text-gray-500 py-8 border rounded-xl mb-6">
                    No active project selected
                </div>
            ) : (
                <div className="relative border rounded-xl p-5 mb-6">
                    {mode !== "create" && activeProjects.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                                Project {currentIndex + 1} of {activeProjects.length}
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
                        <FormField
                            label="Title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                            required
                        />

                        <FormField
                            label="Description"
                            name="description"
                            type="textarea"
                            value={form.description}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                            required
                        />

                        <FormField
                            label="Image URLs (comma-separated)"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                            placeholder="https://img1.jpg, https://img2.jpg"
                        />

                        <FormField
                            label="Technologies (comma-separated)"
                            name="technologies"
                            value={form.technologies}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                            placeholder="React, Node.js, MongoDB"
                        />

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="GitHub URL"
                                name="githubUrl"
                                value={form.githubUrl}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                            <FormField
                                label="Live URL"
                                name="liveUrl"
                                value={form.liveUrl}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                        </div>

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

export default Project;