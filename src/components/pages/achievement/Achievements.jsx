import React from "react";
import PageContainer from "../../layouts/PageContainer";
import SimpleCrudPage from "../../crud/CrudPage";



const Achievements = () => (
    <PageContainer title="Achievements">

        <SimpleCrudPage
            title="Achievements"
            description="Manage your professional achievements."
            endpoint="/api/portfolio/achievements"

            columns={[
                { key: "title", label: "Achievement" },
                { key: "organization", label: "Organization" },
                { key: "date", label: "Date" },
            ]}

            fields={[
                {
                    label: "Title",
                    name: "title",
                    required: true,
                },
                {
                    label: "Organization",
                    name: "organization",
                },
                {
                    label: "Date",
                    name: "date",
                    type: "date",
                },
                {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                },
                {
                    label: "URL",
                    name: "url",
                },
            ]}
        />

    </PageContainer>
);

export default Achievements;