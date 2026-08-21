import React, { useEffect, useState } from "react";
import { Plus, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../../layouts/PageContainer";
import FormField from "../../crud/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
    createTestimonialRequest,
    fetchActiveTestimonialsRequest,
    updateTestimonialRequest,
} from "../../../redux/slices/testimonialSlice";
import TestimonialList from "./TestimonialList";

const initialState = {
    name: "",
    message: "",
    designation: "",
    company: "",
    image: "",
    rating: 5,
    order: 0,
    isActive: true,
};

const Testimonial = () => {
    const dispatch = useDispatch();
    const { activeTestimonials, loading, actionLoading, error } = useSelector((state) => state.testimonial);

    const [mode, setMode] = useState("view"); // "view" | "create" | "edit"
    const [form, setForm] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchActiveTestimonialsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (activeTestimonials.length > 0 && currentIndex >= activeTestimonials.length) {
            setCurrentIndex(activeTestimonials.length - 1);
        }
    }, [activeTestimonials, currentIndex]);

    const active = activeTestimonials?.[currentIndex];

    useEffect(() => {
        if (active && mode !== "create") {
            setForm({
                name: active.name || "",
                message: active.message || "",
                designation: active.designation || "",
                company: active.company || "",
                image: active.image || "",
                rating: active.rating ?? 5,
                order: active.order ?? 0,
                isActive: active.isActive ?? true,
            });
        }
    }, [active, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: ["rating", "order"].includes(name) ? Number(value) : value,
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
            dispatch(createTestimonialRequest(form));
        } else if (mode === "edit" && active?._id) {
            dispatch(updateTestimonialRequest({ id: active._id, data: form }));
        }

        setMode("view");
    };

    const handlePrev = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === 0 ? activeTestimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setMode("view");
        setCurrentIndex((prev) => (prev === activeTestimonials.length - 1 ? 0 : prev + 1));
    };

    const isFieldEnabled = mode === "edit" || mode === "create";
    const showNavigation = activeTestimonials.length > 1;

    return (
        <PageContainer title="Testimonials">
            <TestimonialList />

            <div className="flex justify-end mb-6 gap-2">
                <button
                    type="button"
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700"
                >
                    {mode === "create" ? <X size={18} /> : <Plus size={18} />}
                    {mode === "create" ? "Cancel" : "Create"}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {activeTestimonials.length === 0 && mode !== "create" ? (
                <div className="text-center text-gray-500 py-8 border rounded-xl mb-6">
                    No active testimonial selected
                </div>
            ) : (
                <div className="relative border rounded-xl p-5 mb-6">
                    {mode !== "create" && activeTestimonials.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                                Testimonial {currentIndex + 1} of {activeTestimonials.length}
                            </span>
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700"
                            >
                                {mode === "edit" ? <X size={16} /> : null}
                                {mode === "edit" ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                                required
                            />
                            <FormField
                                label="Designation"
                                name="designation"
                                value={form.designation}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                            <FormField
                                label="Image URL"
                                name="image"
                                value={form.image}
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
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                label="Rating (1-5)"
                                name="rating"
                                type="number"
                                value={form.rating}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                            <FormField
                                label="Order"
                                name="order"
                                type="number"
                                value={form.order}
                                onChange={handleChange}
                                disabled={!isFieldEnabled}
                            />
                        </div>

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

                    {showNavigation && mode !== "create" && (
                        <div className="flex items-center gap-2 mt-5 pt-4 border-t">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </PageContainer>
    );
};

export default Testimonial;