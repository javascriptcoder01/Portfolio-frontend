import React from "react";
import PageContainer from "../../layouts/PageContainer";
import CrudPage from "../../crud/CrudPage";


const Events = () => (
    <PageContainer title="Talks / Events">

        <CrudPage
            title="Talks / Events"
            description="Manage speaking engagements and events."
            endpoint="/api/portfolio/events"

            columns={[
                { key: "event", label: "Event" },
                { key: "topic", label: "Topic" },
                { key: "date", label: "Date" },
            ]}

            fields={[
                {
                    label: "Event Name",
                    name: "event",
                    required: true,
                },
                {
                    label: "Topic",
                    name: "topic",
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
                    label: "Event URL",
                    name: "url",
                },
            ]}
        />

    </PageContainer>
);

export default Events;