import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";



const Certifications = () => {

    return (
        <PageContainer title="Certifications">

            <CrudPage
                title="Certifications"
                description="Manage professional certifications."
                endpoint="/api/portfolio/certifications"

                columns={[
                    { key: "name", label: "Certification" },
                    { key: "organization", label: "Organization" },
                    { key: "issueDate", label: "Issue Date" },
                    { key: "credentialUrl", label: "Credential" },
                ]}

                fields={[
                    {
                        label: "Certification Name",
                        name: "name",
                        required: true,
                    },
                    {
                        label: "Issuing Organization",
                        name: "organization",
                    },
                    {
                        label: "Issue Date",
                        name: "issueDate",
                        type: "date",
                    },
                    {
                        label: "Expiry Date",
                        name: "expiryDate",
                        type: "date",
                    },
                    {
                        label: "Credential ID",
                        name: "credentialId",
                    },
                    {
                        label: "Credential URL",
                        name: "credentialUrl",
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
};

export default Certifications;