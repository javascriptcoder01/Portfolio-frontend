import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";


const Hobbies = () => (
    <PageContainer title="Interests / Hobbies">

        <CrudPage
            title="Interests / Hobbies"
            description="Manage your personal interests and hobbies."
            endpoint="/api/portfolio/hobbies"

            columns={[
                { key: "name", label: "Interest" },
                { key: "description", label: "Description" },
            ]}

            fields={[
                {
                    label: "Interest / Hobby",
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
            ]}
        />

    </PageContainer>
);

export default Hobbies;