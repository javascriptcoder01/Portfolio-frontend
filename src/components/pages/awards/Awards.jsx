import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";



const Awards = () => (
    <PageContainer title="Awards & Recognition">

        <CrudPage
            title="Awards & Recognition"
            description="Manage awards and professional recognition."
            endpoint="/api/portfolio/awards"

            columns={[
                { key: "name", label: "Award" },
                { key: "organization", label: "Organization" },
                { key: "date", label: "Date" },
            ]}

            fields={[
                {
                    label: "Award Name",
                    name: "name",
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
            ]}
        />

    </PageContainer>
);

export default Awards;