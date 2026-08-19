import React, { useEffect, useState } from "react";
import { Pencil, Plus, Save, X, Trash2 } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import { createAboutRequest, fetchActiveAboutRequest, updateAboutRequest } from "../../../redux/slices/aboutSlice";
import AboutList from "./AboutList";

// FIX: ":" use kiya, "=" ki jagah
const initialState = {
    title: "",
    description: "",
    image: "",
    highlights: [{ title: "" }],
    isActive: true,
};

const About = () => {
    const dispatch = useDispatch();
    const { active, loading, actionLoading, error } = useSelector((state) => state.about);
    const [mode, setMode] = useState("view");
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        dispatch(fetchActiveAboutRequest());
    }, [dispatch]);

    // FIX: dependency me "active" honi chahiye, taaki backend se naya data aane par form update ho
    useEffect(() => {
        // console.log('Active About Data from About Component: ', active);  // Getting Undefined
        if (active && mode !== "create") {
            setForm({
                title: active.title || "",
                description: active.description || "",
                image: active.image || "",
                // FIX: active.highlights (poora array) copy karo, sirf active.title nahi
                highlights:
                    active.highlights && active.highlights.length > 0
                        ? active.highlights.map((h) => ({ title: h.title || "" }))
                        : [{ title: "" }],
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // FIX: specific index ka highlight update karo, poora array garbage nahi banao
    const handleHighlightChange = (index, value) => {
        const updatedHighlights = [...form.highlights];
        updatedHighlights[index] = { title: value };
        setForm({ ...form, highlights: updatedHighlights });
    };

    // Naya highlight field add karne ke liye
    const addHighlight = () => {
        setForm({ ...form, highlights: [...form.highlights, { title: "" }] });
    };

    // Highlight remove karne ke liye
    const removeHighlight = (index) => {
        const updatedHighlights = form.highlights.filter((_, i) => i !== index);
        setForm({ ...form, highlights: updatedHighlights.length > 0 ? updatedHighlights : [{ title: "" }] });
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
            setMode("view"); // FIX: setForm nahi, setMode
        } else {
            setMode("edit");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // FIX: bhejne se pehle khali highlights hata do
        const payload = {
            ...form,
            highlights: form.highlights.filter((h) => h.title.trim() !== ""),
        };

        if (mode === "create") {
            dispatch(createAboutRequest(payload));
        } else if (mode === "edit" && active?._id) {
            // FIX: active.id -> active._id
            dispatch(updateAboutRequest({ id: active._id, data: payload }));
        }

        setMode("view");
    };

    const isFieldEnabled = mode === "edit" || mode === "create";

    return (
        <PageContainer title="About Me">
            <AboutList />

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
                <FormField
                    label="Title"
                    name="title"
                    value={form.title}
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
                    label="About Image URL"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    disabled={!isFieldEnabled}
                />

                {/* FIX: Highlights ab dynamic list hai — multiple items add/remove ho sakte hain */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>

                    <div className="space-y-3">
                        {form.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={highlight.title}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    disabled={!isFieldEnabled}
                                    placeholder={`Highlight ${index + 1}`}
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                                />

                                {isFieldEnabled && form.highlights.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {isFieldEnabled && (
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                            <Plus size={16} />
                            Add Highlight
                        </button>
                    )}
                </div>

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

export default About;