import React, { useState } from "react";
import PageContainer from "../../layouts/PageContainer";
// import LanguagesForm from "../../crud/LanguageFrom";


const Languages = () => {
    const [languages, setLanguages] = useState([]);

    // =========================================================
    // CREATE
    // =========================================================

    // const handleCreate = async (formData) => {
    //     const newLanguage = {
    //         id: Date.now(),
    //         ...formData,
    //     };

    //     setLanguages((prev) => [
    //         ...prev,
    //         newLanguage,
    //     ]);
    // };

    // =========================================================
    // UPDATE
    // =========================================================

    // const handleUpdate = async (id, formData) => {
    //     setLanguages((prev) =>
    //         prev.map((language) =>
    //             language.id === id
    //                 ? {
    //                     ...language,
    //                     ...formData,
    //                 }
    //                 : language
    //         )
    //     );
    // };


    // =========================================================
    // FORM
    // =========================================================

    // const renderForm = ({
    //     item,
    //     onSubmit,
    //     onCancel,
    // }) => {
    //     return (
    //         <LanguagesForm
    //             item={item}
    //             onSubmit={onSubmit}
    //             onCancel={onCancel}
    //         />
    //     );
    // };

    return (
        <PageContainer title="Languages">

            <h1>This is Language page</h1>

            {/* <CrudPage
                title="Languages"
                description="Manage the languages you know and your proficiency levels."

                data={languages}

                columns={[
                    {
                        key: "language",
                        label: "Language",
                    },
                    {
                        key: "proficiency",
                        label: "Proficiency",
                    },
                    {
                        key: "speaking",
                        label: "Speaking",
                    },
                    {
                        key: "reading",
                        label: "Reading",
                    },
                    {
                        key: "writing",
                        label: "Writing",
                    },
                ]}

                renderForm={renderForm}

                onCreate={handleCreate}

                onUpdate={handleUpdate}

                onDelete={handleDelete}

                onView={handleView}
            /> */}

        </PageContainer>
    );
};

export default Languages;