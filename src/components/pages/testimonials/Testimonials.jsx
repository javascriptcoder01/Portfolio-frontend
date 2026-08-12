import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";


const Testimonials = () => (
    <PageContainer title="Testimonials">

        <CrudPage
            title="Testimonials"
            description="Manage client and professional recommendations."
            endpoint="/api/portfolio/testimonials"

            columns={[
                { key: "person", label: "Person" },
                { key: "designation", label: "Designation" },
                { key: "company", label: "Company" },
            ]}

            fields={[
                {
                    label: "Person Name",
                    name: "person",
                    required: true,
                },
                {
                    label: "Designation",
                    name: "designation",
                },
                {
                    label: "Company",
                    name: "company",
                },
                {
                    label: "Photo URL",
                    name: "photo",
                },
                {
                    label: "Testimonial",
                    name: "testimonial",
                    type: "textarea",
                },
            ]}
        />

    </PageContainer>
);

export default Testimonials;