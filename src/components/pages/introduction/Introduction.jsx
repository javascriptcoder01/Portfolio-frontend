import React, { useEffect, useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";

import FormField from "../../crud/FormField";
import PageContainer from "../../layouts/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
    createIntroductionRequest,
    fetchActiveIntroductionRequest,
    updateIntroductionRequest,
} from "../../../redux/slices/introductionSlice";
import IntroductionList from "./IntroductionList";

const initialForm = {
    name: "",
    designation: "",
    shortBio: "",
    profileImage: "",
    resume: "",
    email: "",
    socialLinks: {
        github: "",
        linkedin: "",
        twitter: "",
        portfolio: "",
        facebook: "",
        instagram: "",
        youtube: "",
    },
    isActive: true,
};

const Introduction = () => {
    const dispatch = useDispatch();
    const { active, loading, actionLoading, error } = useSelector((state) => state.introduction);

    // FIX: editing/creating alag states ki jagah ek "mode" — "view" | "edit" | "create"
    const [mode, setMode] = useState("view");
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        dispatch(fetchActiveIntroductionRequest());
    }, [dispatch]);

    // Active data aane par form fill karo — sirf tab jab hum "create" mode me na hon
    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                name: active.name || "",
                designation: active.designation || "",
                shortBio: active.shortBio || "",
                profileImage: active.profileImage || "",
                resume: active.resume || "",
                email: active.email || "",
                socialLinks: {
                    github: active.socialLinks?.github || "",
                    linkedin: active.socialLinks?.linkedin || "",
                    twitter: active.socialLinks?.twitter || "",
                    portfolio: active.socialLinks?.portfolio || "",
                    facebook: active.socialLinks?.facebook || "",
                    instagram: active.socialLinks?.instagram || "",
                    youtube: active.socialLinks?.youtube || "",
                },
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e) => {
        setForm({
            ...form,
            socialLinks: { ...form.socialLinks, [e.target.name]: e.target.value },
        });
    };

    // FIX: Create button — form empty karo, fields enable karo
    const handleCreateClick = () => {
        if (mode === "create") {
            // Cancel — wapas view mode, active ka data restore ho jayega (useEffect se)
            setMode("view");
        } else {
            setForm(initialForm); // FIX: form reset
            setMode("create");
        }
    };

    // Edit button — active ka data already form me hai, bas fields enable karo
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
            // FIX: hamesha CREATE call ho, "active" exist karta ho tab bhi
            dispatch(createIntroductionRequest(form));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateIntroductionRequest({ id: active._id, data: form }));
        }

        setMode("view");
    };

    const isFieldsEnabled = mode === "edit" || mode === "create"; // FIX

    return (
        <PageContainer title="Introduction">
            <IntroductionList />

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
                    disabled={mode === "create"} // FIX: create mode me edit disable
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
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={!isFieldsEnabled}
                    />
                    <FormField
                        label="Designation"
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        disabled={!isFieldsEnabled}
                    />
                </div>

                <FormField
                    label="Short Bio"
                    name="shortBio"
                    type="textarea"
                    value={form.shortBio}
                    onChange={handleChange}
                    disabled={!isFieldsEnabled}
                />

                <FormField
                    label="Profile Image URL"
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    disabled={!isFieldsEnabled}
                />
                <FormField
                    label="Resume URL"
                    name="resume"
                    value={form.resume}
                    onChange={handleChange}
                    disabled={!isFieldsEnabled}
                />
                <FormField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isFieldsEnabled}
                />

                <div className="grid md:grid-cols-2 gap-5">
                    <FormField label="Github" name="github" value={form.socialLinks.github} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Linkedin" name="linkedin" value={form.socialLinks.linkedin} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Twitter" name="twitter" value={form.socialLinks.twitter} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Portfolio" name="portfolio" value={form.socialLinks.portfolio} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Facebook" name="facebook" value={form.socialLinks.facebook} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Instagram" name="instagram" value={form.socialLinks.instagram} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                    <FormField label="Youtube" name="youtube" value={form.socialLinks.youtube} onChange={handleSocialChange} disabled={!isFieldsEnabled} />
                </div>

                {isFieldsEnabled && (
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

export default Introduction;