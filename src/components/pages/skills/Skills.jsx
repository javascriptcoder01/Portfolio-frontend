import React, { useEffect, useState } from "react";
import { Plus, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createSkillRequest,
    fetchActiveSkillsRequest,
    updateSkillRequest,
} from "../../../redux/slices/skillSlice";
import SkillList from "./SkillList";

const initialState = {
    name: "",
    category: "",
    level: 0,
    icon: "",
    order: 0,
    isActive: true,
};

const Skills = () => {
    const dispatch = useDispatch();
    const { activeSkills, loading, actionLoading, error } = useSelector((state) => state.skill);

    const [mode, setMode] = useState("view"); // "view" | "create" | "edit"
    const [form, setForm] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0); // FIX: carousel ke liye

    useEffect(() => {
        dispatch(fetchActiveSkillsRequest());
    }, [dispatch]);

    // FIX: agar currentIndex list se bahar chala jaye (jaise delete ke baad), clamp kar do
    useEffect(() => {
        if (activeSkills.length > 0 && currentIndex >= activeSkills.length) {
            setCurrentIndex(activeSkills.length - 1);
        }
    }, [activeSkills, currentIndex]);

    const active = activeSkills?.[currentIndex]; // FIX: current slide ki skill

    // Jab active skill change ho (slide badle ya naya data aaye), form fill karo
    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                name: active.name || "",
                category: active.category || "",
                level: active.level ?? 0,
                icon: active.icon || "",
                order: active.order ?? 0,
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "level" || name === "order" ? Number(value) : value,
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
            dispatch(createSkillRequest(form));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateSkillRequest({ id: active._id, data: form }));
        }

        setMode("view");
    };

    // FIX: Prev/Next navigation
    const handlePrev = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === 0 ? activeSkills.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === activeSkills.length - 1 ? 0 : prev + 1));
    };

    const isFieldEnabled = mode === "edit" || mode === "create";
    const showNavigation = activeSkills.length > 1; // FIX: sirf 2+ hone par dikhega

    return (
        <PageContainer title="Skills & Expertise">
            <SkillList />

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

            {activeSkills.length === 0 && mode !== "create" ? (
                <div className="text-center text-gray-500 py-8 border rounded-xl mb-6">
                    No active skill selected
                </div>
            ) : (
                <div className="relative border rounded-xl p-5 mb-6">
                    {/* FIX: slide indicator + Edit button top-right */}
                    {mode !== "create" && activeSkills.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                                Skill {currentIndex + 1} of {activeSkills.length}
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
                                label="Skill Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="Category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Level (0-100)"
                                name="level"
                                type="number"
                                value={form.level}
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
                        </div>

                        <FormField
                            label="Icon (name or URL)"
                            name="icon"
                            value={form.icon}
                            onChange={handleChange}
                            disabled={!isFieldEnabled}
                        />

                        {isFieldEnabled && (
                            <div className="flex justify-end pt-4">
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

                    {/* FIX: Prev/Next — bottom-left, sirf 2+ active skills hone par */}
                    {showNavigation && mode !== "create" && (
                        <div className="flex items-center gap-2 mt-5 pt-4">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-green-200 text-sm"
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-200 text-sm"
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

export default Skills;