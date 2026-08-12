import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";



const Publications = () => (
    <PageContainer title="Publications & Articles">

        <CrudPage
            title="Publications & Articles"
            description="Manage articles, blogs and publications."
            endpoint="/api/portfolio/publications"

            columns={[
                { key: "title", label: "Title" },
                { key: "publisher", label: "Publisher" },
                { key: "date", label: "Date" },
            ]}

            fields={[
                {
                    label: "Title",
                    name: "title",
                    required: true,
                },
                {
                    label: "Publisher",
                    name: "publisher",
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
                    label: "Article URL",
                    name: "url",
                },
            ]}
        />

    </PageContainer>
);

export default Publications;