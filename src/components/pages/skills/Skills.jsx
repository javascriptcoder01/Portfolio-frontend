import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";
import FormField from "../../crud/FormField";



const Skills = () => {

    const [items, setItems] = useState([]);

    const create = async (data) => {
        // POST /api/portfolio/skills

        setItems([
            ...items,
            {
                ...data,
                id: Date.now(),
            },
        ]);
    };

    const update = async (id, data) => {
        // PUT /api/portfolio/skills/:id

        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        );
    };

    const remove = async (id) => {

        if (!confirm("Delete this skill?")) return;

        // DELETE /api/portfolio/skills/:id

        setItems(
            items.filter((item) => item.id !== id)
        );
    };

    return (
        <PageContainer title="Skills & Expertise">

            <CrudPage
                title="Skills & Expertise"
                description="Manage your professional and technical skills."
                data={items}

                columns={[
                    {
                        key: "name",
                        label: "Skill",
                    },
                    {
                        key: "category",
                        label: "Category",
                    },
                    {
                        key: "level",
                        label: "Level",
                    },
                ]}

                onCreate={create}
                onUpdate={update}
                onDelete={remove}

                renderForm={({ item, onSubmit, onCancel }) => (
                    <SkillForm
                        initialData={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
            />

        </PageContainer>
    );
};

const SkillForm = ({
    initialData,
    onSubmit,
    onCancel,
}) => {

    const [form, setForm] = useState(
        initialData || {
            name: "",
            category: "",
            level: "",
            icon: "",
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

            <FormField
                label="Skill Name"
                name="name"
                value={form.name}
                onChange={change}
                required
            />

            <div className="grid md:grid-cols-2 gap-5">

                <FormField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={change}
                />

                <FormField
                    label="Level"
                    name="level"
                    value={form.level}
                    onChange={change}
                    placeholder="Beginner / Intermediate / Expert"
                />

            </div>

            <FormField
                label="Icon"
                name="icon"
                value={form.icon}
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

export default Skills;