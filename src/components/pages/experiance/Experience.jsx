import React, { useEffect, useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";
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
    technologies: "", // comma-separated string, submit ke time array me convert hoga
    order: 0,
    isActive: true,
};

const Experience = () => {
    const dispatch = useDispatch();
    // FIX: slice me field ka naam "activeExperiences" hai (array), "active" nahi
    const { activeExperiences, loading, actionLoading, error } = useSelector((state) => state.experience);
    const active = activeExperiences?.[0]; // FIX: array ka pehla item -> single active experience

    const [mode, setMode] = useState("view");
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        dispatch(fetchActiveExperiencesRequest());
    }, [dispatch]);

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

        // FIX: comma-separated string -> array, submit se pehle
        const payload = {
            ...form,
            technologies: form.technologies
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== ""),
            endDate: form.isCurrent ? null : form.endDate, // FIX: current job ho to endDate mat bhejo
        };

        if (mode === "create") {
            dispatch(createExperienceRequest(payload));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateExperienceRequest({ id: active._id, data: payload }));
        }

        setMode("view");
    };

    const isFieldEnabled = mode === "edit" || mode === "create";

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

                <button
                    type="button"
                    onClick={handleEditClick}
                    disabled={mode === "create"}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mode === "edit" ? <X size={18} /> : <Pencil size={18} />}
                    {mode === "edit" ? "Cancel" : "Edit"}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

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
        </PageContainer>
    );
};

export default Experience;