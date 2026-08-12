import React, { useState } from "react";
import { Pencil, Save } from "lucide-react";


import FormField from "../../crud/FormField";
import PageContainer from "../../layouts/PageContainer";


const Introduction = () => {

    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        name: "",
        headline: "",
        shortIntro: "",
        profileImage: "",
        primaryButtonText: "",
        primaryButtonUrl: "",
        secondaryButtonText: "",
        secondaryButtonUrl: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // PUT /api/portfolio/introduction

        console.log("SAVE", form);

        setEditing(false);
    };

    return (
        <PageContainer title="Introduction">

            <div className="flex justify-end mb-6">

                <button
                    type="button"
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700"
                >
                    <Pencil size={18} />
                    {editing ? "Cancel" : "Edit"}
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div className="grid md:grid-cols-2 gap-5">

                    <FormField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <FormField
                        label="Headline"
                        name="headline"
                        value={form.headline}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                </div>

                <FormField
                    label="Short Introduction"
                    name="shortIntro"
                    type="textarea"
                    value={form.shortIntro}
                    onChange={handleChange}
                    disabled={!editing}
                />

                <FormField
                    label="Profile Image URL"
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    disabled={!editing}
                />

                <div className="grid md:grid-cols-2 gap-5">

                    <FormField
                        label="Primary Button Text"
                        name="primaryButtonText"
                        value={form.primaryButtonText}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <FormField
                        label="Primary Button URL"
                        name="primaryButtonUrl"
                        value={form.primaryButtonUrl}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <FormField
                        label="Secondary Button Text"
                        name="secondaryButtonText"
                        value={form.secondaryButtonText}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <FormField
                        label="Secondary Button URL"
                        name="secondaryButtonUrl"
                        value={form.secondaryButtonUrl}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                </div>

                {editing && (
                    <div className="flex justify-end pt-4 border-t">

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>

                    </div>
                )}

            </form>

        </PageContainer>
    );
};

export default Introduction;