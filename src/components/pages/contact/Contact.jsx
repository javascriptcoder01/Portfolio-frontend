import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";
import SimpleCrudPage from "../../crud/CrudPage";
import FormField from "../../crud/FormField";
import CrudPage from "../../crud/CrudPage";



const Contact = () => {

    const [items, setItems] = useState([]);

    const create = async (data) => {

        // POST /api/portfolio/contact

        setItems([
            ...items,
            {
                ...data,
                id: Date.now(),
            },
        ]);
    };

    const update = async (id, data) => {

        // PUT /api/portfolio/contact/:id

        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        );
    };

    const remove = async (id) => {

        if (!confirm("Delete this contact?")) return;

        // DELETE /api/portfolio/contact/:id

        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <PageContainer title="Social & Contact">

            <CrudPage
                title="Social & Contact"
                description="Manage contact information and social links."
                data={items}

                columns={[
                    {
                        key: "platform",
                        label: "Platform",
                    },
                    {
                        key: "username",
                        label: "Username",
                    },
                    {
                        key: "url",
                        label: "URL",
                    },
                ]}

                onCreate={create}
                onUpdate={update}
                onDelete={remove}

                renderForm={({ item, onSubmit, onCancel }) => (

                    <ContactForm
                        initialData={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />

                )}
            />

        </PageContainer>
    );
};

const ContactForm = ({
    initialData,
    onSubmit,
    onCancel,
}) => {

    const [form, setForm] = useState(
        initialData || {
            platform: "",
            username: "",
            url: "",
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
                label="Platform"
                name="platform"
                value={form.platform}
                onChange={change}
                placeholder="LinkedIn / GitHub / Email"
            />

            <FormField
                label="Username / Label"
                name="username"
                value={form.username}
                onChange={change}
            />

            <FormField
                label="URL"
                name="url"
                value={form.url}
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

export default Contact;