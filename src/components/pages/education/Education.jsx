import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";
import FormField from "../../crud/FormField";


const Education = () => {

    const [items, setItems] = useState([]);

    const create = async (data) => {
        setItems([
            ...items,
            {
                ...data,
                id: Date.now(),
            },
        ]);
    };

    const update = async (id, data) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        );
    };

    const remove = async (id) => {

        if (!confirm("Delete this education?")) return;

        setItems(
            items.filter((item) => item.id !== id)
        );
    };

    return (
        <PageContainer title="Education">

            <CrudPage
                title="Education"
                description="Manage your academic background."
                data={items}

                columns={[
                    { key: "degree", label: "Degree" },
                    { key: "institution", label: "Institution" },
                    { key: "field", label: "Field" },
                    { key: "startDate", label: "Start" },
                    { key: "endDate", label: "End" },
                ]}

                onCreate={create}
                onUpdate={update}
                onDelete={remove}

                renderForm={({ item, onSubmit, onCancel }) => (
                    <EducationForm
                        initialData={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
            />

        </PageContainer>
    );
};

const EducationForm = ({
    initialData,
    onSubmit,
    onCancel,
}) => {

    const [form, setForm] = useState(
        initialData || {
            degree: "",
            institution: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
            grade: "",
            description: "",
        }
    );

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
            className="space-y-5"
        >

            <div className="grid md:grid-cols-2 gap-5">

                <FormField
                    label="Degree"
                    name="degree"
                    value={form.degree}
                    onChange={change}
                />

                <FormField
                    label="Institution"
                    name="institution"
                    value={form.institution}
                    onChange={change}
                />

                <FormField
                    label="Field of Study"
                    name="field"
                    value={form.field}
                    onChange={change}
                />

                <FormField
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={change}
                />

                <FormField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={change}
                />

                <FormField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={change}
                />

                <FormField
                    label="Grade / CGPA"
                    name="grade"
                    value={form.grade}
                    onChange={change}
                />

            </div>

            <FormField
                label="Description"
                name="description"
                type="textarea"
                value={form.description}
                onChange={change}
            />

            <FormButtons onCancel={onCancel} />

        </form>
    );
};

const FormButtons = ({ onCancel }) => (
    <div className="flex justify-end gap-3 pt-4 border-t">

        <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border rounded-xl"
        >
            Cancel
        </button>

        <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl"
        >
            Save
        </button>

    </div>
);

export default Education;