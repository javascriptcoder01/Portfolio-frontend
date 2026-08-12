import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";


const Volunteering = () => (
    <PageContainer title="Volunteering">

        <CrudPage
            title="Volunteering"
            description="Manage your volunteer experience."
            endpoint="/api/portfolio/volunteering"

            columns={[
                { key: "organization", label: "Organization" },
                { key: "role", label: "Role" },
                { key: "startDate", label: "Start" },
            ]}

            fields={[
                {
                    label: "Organization",
                    name: "organization",
                    required: true,
                },
                {
                    label: "Role",
                    name: "role",
                },
                {
                    label: "Start Date",
                    name: "startDate",
                    type: "date",
                },
                {
                    label: "End Date",
                    name: "endDate",
                    type: "date",
                },
                {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                },
            ]}
        />

    </PageContainer>
);

export default Volunteering;