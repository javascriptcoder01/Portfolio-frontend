import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";


const Services = () => (
    <PageContainer title="Services">

        <CrudPage
            title="Services"
            description="Manage the services you offer."
            endpoint="/api/portfolio/services"

            columns={[
                { key: "name", label: "Service" },
                { key: "price", label: "Price" },
                { key: "ctaText", label: "CTA" },
            ]}

            fields={[
                {
                    label: "Service Name",
                    name: "name",
                    required: true,
                },
                {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                },
                {
                    label: "Icon",
                    name: "icon",
                },
                {
                    label: "Price",
                    name: "price",
                    type: "number",
                },
                {
                    label: "CTA Text",
                    name: "ctaText",
                },
                {
                    label: "CTA URL",
                    name: "ctaUrl",
                },
            ]}
        />

    </PageContainer>
);

export default Services;