import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";
import FormField from "../../crud/FormField";


const Projects = () => {

    const [items, setItems] = useState([]);

    const create = async (data) => {
        // POST /api/portfolio/projects

        setItems([
            ...items,
            {
                ...data,
                id: Date.now(),
            },
        ]);
    };

    const update = async (id, data) => {
        // PUT /api/portfolio/projects/:id

        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        );
    };

    const remove = async (id) => {

        if (!confirm("Delete this project?")) return;

        // DELETE /api/portfolio/projects/:id

        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <PageContainer title="Projects / Work">

            <CrudPage
                title="Projects / Work"
                description="Manage your projects and professional work."
                data={items}

                columns={[
                    { key: "title", label: "Project" },
                    { key: "role", label: "Role" },
                    { key: "technologies", label: "Technologies" },
                ]}

                onCreate={create}
                onUpdate={update}
                onDelete={remove}

                renderForm={({ item, onSubmit, onCancel }) => (
                    <ProjectForm
                        initialData={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
            />

        </PageContainer>
    );
};

const ProjectForm = ({
    initialData,
    onSubmit,
    onCancel,
}) => {

    const [form, setForm] = useState(
        initialData || {
            title: "",
            description: "",
            role: "",
            technologies: "",
            image: "",
            liveUrl: "",
            githubUrl: "",
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
                label="Project Title"
                name="title"
                value={form.title}
                onChange={change}
                required
            />

            <FormField
                label="Description"
                name="description"
                type="textarea"
                value={form.description}
                onChange={change}
            />

            <div className="grid md:grid-cols-2 gap-5">

                <FormField
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={change}
                />

                <FormField
                    label="Technologies"
                    name="technologies"
                    value={form.technologies}
                    onChange={change}
                />

                <FormField
                    label="Live URL"
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={change}
                />

                <FormField
                    label="GitHub URL"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={change}
                />

            </div>

            <FormField
                label="Project Image"
                name="image"
                value={form.image}
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

export default Projects;