import React, { useEffect, useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createContactRequest,
    fetchActiveContactRequest,
    updateContactRequest,

} from "../../../redux/slices/contactSlice";
import ContactList from "./ContactList";

const initialState = {
    email: "",
    phone: "",
    address: "",
    location: "",
    availability: "",
    message: "",
    isActive: true,
};

const Contact = () => {
    const dispatch = useDispatch();
    const { active, loading, actionLoading, error } = useSelector((state) => state.contact);
    const [mode, setMode] = useState("view");
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        dispatch(fetchActiveContactRequest());
    }, [dispatch]);

    useEffect(() => {
        console.log('Active About Data from Contact Component: ', active);
        if (active && mode !== "create") {
            setForm({
                email: active.email || "",
                phone: active.phone || "",
                address: active.address || "",
                location: active.location || "",
                availability: active.availability || "",
                message: active.message || "",
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
            dispatch(createContactRequest(form));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateContactRequest({ id: active._id, data: form }));
        }

        setMode("view");
    };

    const isFieldEnabled = mode === "edit" || mode === "create";

    return (
        <PageContainer title="Social & Contact">
            <ContactList />

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
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isFieldEnabled}
                        required
                    />
                    <FormField
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={!isFieldEnabled}
                        required
                    />
                </div>

                <FormField
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!isFieldEnabled}
                />

                <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        disabled={!isFieldEnabled}
                    />
                    <FormField
                        label="Availability"
                        name="availability"
                        value={form.availability}
                        onChange={handleChange}
                        disabled={!isFieldEnabled}
                    />
                </div>

                <FormField
                    label="Message"
                    name="message"
                    type="textarea"
                    value={form.message}
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

export default Contact;