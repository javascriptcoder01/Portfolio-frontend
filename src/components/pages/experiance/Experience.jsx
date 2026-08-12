import React, { useState } from "react";

import CrudPage from "../../crud/CrudPage";
import FormField from "../../crud/FormField";

const Experience = () => {

    const [experiences, setExperiences] = useState([]);

    const handleCreate = async (data) => {
        console.log("CREATE", data);

        // API:
        // await api.post("/experiences", data)

        setExperiences((prev) => [
            ...prev,
            {
                ...data,
                id: Date.now(),
            },
        ]);
    };

    const handleUpdate = async (id, data) => {
        console.log("UPDATE", id, data);

        setExperiences((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        );
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this experience?")) {
            return;
        }

        // await api.delete(`/experiences/${id}`)

        setExperiences((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <CrudPage

            title="Experience"

            description="Manage your professional experience."

            data={experiences}

            columns={[
                {
                    key: "position",
                    label: "Position",
                },
                {
                    key: "company",
                    label: "Company",
                },
                {
                    key: "employmentType",
                    label: "Type",
                },
                {
                    key: "startDate",
                    label: "Start Date",
                },
                {
                    key: "endDate",
                    label: "End Date",
                },
            ]}

            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}

            renderForm={({ item, onSubmit, onCancel }) => (

                <ExperienceForm
                    initialData={item}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />

            )}

        />
    );
};

const ExperienceForm = ({
    initialData,
    onSubmit,
    onCancel,
}) => {

    const [form, setForm] = useState(
        initialData || {
            position: "",
            company: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            location: "",
            description: "",
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <FormField
                    label="Position"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                />

                <FormField
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                />

                <FormField
                    label="Employment Type"
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    placeholder="Full-time / Freelance / Contract"
                />

                <FormField
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                />

                <FormField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                />

                <FormField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                />

            </div>

            <FormField
                label="Description"
                name="description"
                type="textarea"
                value={form.description}
                onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 rounded-xl border border-gray-200"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Save
                </button>

            </div>

        </form>
    );
};

export default Experience;