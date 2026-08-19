import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";



const Education = () => {



    return (
        <PageContainer title="Education">

            <h1>This is Education page</h1>

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