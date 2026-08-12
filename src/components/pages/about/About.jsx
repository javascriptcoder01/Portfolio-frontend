import React, { useState } from "react";
import { Pencil, Save } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";



const About = () => {

    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        profileImage: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // PUT /api/portfolio/about

        console.log(form);

        setEditing(false);
    };

    return (
        <PageContainer title="About Me">

            <div className="flex justify-end mb-6">

                <button
                    type="button"
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl"
                >
                    <Pencil size={18} />
                    {editing ? "Cancel" : "Edit"}
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <FormField
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    disabled={!editing}
                />

                <FormField
                    label="Description"
                    name="description"
                    type="textarea"
                    value={form.description}
                    onChange={handleChange}
                    disabled={!editing}
                />

                <div className="grid md:grid-cols-2 gap-5">

                    <FormField
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <FormField
                        label="Profile Image"
                        name="profileImage"
                        value={form.profileImage}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                </div>

                {editing && (
                    <div className="flex justify-end pt-4 border-t">

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl"
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

export default About;