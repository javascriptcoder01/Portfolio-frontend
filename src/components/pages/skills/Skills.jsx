import React, { useEffect, useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";
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
    // FIX: slice me field ka naam "activeSkills" hai (array), "active" nahi
    const { activeSkills, loading, actionLoading, error } = useSelector((state) => state.skill);
    const active = activeSkills?.[0]; // FIX: array ka pehla item -> single active skill

    const [mode, setMode] = useState("view");
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        dispatch(fetchActiveSkillsRequest());
    }, [dispatch]);

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

    const isFieldEnabled = mode === "edit" || mode === "create";

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

export default Skills;