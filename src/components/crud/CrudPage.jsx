import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    X,
} from "lucide-react";

import FormField from "./FormField";
import FormButtons from "./FormButtons";

const CrudPage = ({
    title,
    description,

    endpoint = "",

    columns = [],
    fields = [],

    // Optional API functions
    fetchData,
    createData,
    updateData,
    deleteData,
}) => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [modalMode, setModalMode] = useState("create");

    const [editingItem, setEditingItem] = useState(null);

    const [viewingItem, setViewingItem] = useState(null);

    const [formData, setFormData] = useState({});

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    // =========================================================
    // INITIAL FORM
    // =========================================================

    const getInitialForm = () => {
        const initialData = {};

        fields.forEach((field) => {
            initialData[field.name] =
                field.defaultValue ?? "";
        });

        return initialData;
    };

    // =========================================================
    // FETCH DATA
    // =========================================================

    const loadData = async () => {
        try {
            setLoading(true);

            /*
             * If parent provides fetchData(), use it.
             */

            if (fetchData) {
                const result = await fetchData();

                setData(Array.isArray(result) ? result : []);

                return;
            }

            /*
             * Backend API example:
             *
             * const response = await fetch(endpoint);
             *
             * const result = await response.json();
             *
             * setData(result.data || result);
             *
             */

            // Temporary empty state
            setData([]);
        } catch (error) {
            console.error(
                `Failed to load ${title}:`,
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [endpoint]);

    // =========================================================
    // SEARCH
    // =========================================================

    const filteredData = useMemo(() => {
        if (!search.trim()) {
            return data;
        }

        const query = search.toLowerCase();

        return data.filter((item) =>
            JSON.stringify(item)
                .toLowerCase()
                .includes(query)
        );
    }, [data, search]);

    // =========================================================
    // ADD
    // =========================================================

    const handleAdd = () => {
        setModalMode("create");

        setEditingItem(null);

        setViewingItem(null);

        setFormData(getInitialForm());

        setModalOpen(true);
    };

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (item) => {
        setModalMode("edit");

        setEditingItem(item);

        setViewingItem(null);

        setFormData({
            ...getInitialForm(),
            ...item,
        });

        setModalOpen(true);
    };

    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (item) => {
        setModalMode("view");

        setViewingItem(item);

        setEditingItem(null);

        setFormData(item);

        setModalOpen(true);
    };

    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const closeModal = () => {
        if (saving) return;

        setModalOpen(false);

        setModalMode("create");

        setEditingItem(null);

        setViewingItem(null);

        setFormData({});
    };

    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // =========================================================
    // CREATE / UPDATE
    // =========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            // =================================================
            // CREATE
            // =================================================

            if (modalMode === "create") {
                let newItem = {
                    ...formData,
                    id: Date.now(),
                };

                /*
                 * If custom createData function provided
                 */

                if (createData) {
                    newItem = await createData(formData);
                }

                /*
                 * Backend API example:
                 *
                 * const response = await fetch(endpoint, {
                 *     method: "POST",
                 *     headers: {
                 *         "Content-Type":
                 *             "application/json",
                 *     },
                 *     body: JSON.stringify(formData),
                 * });
                 *
                 * newItem = await response.json();
                 */

                setData((prev) => [
                    newItem,
                    ...prev,
                ]);
            }

            // =================================================
            // UPDATE
            // =================================================

            if (modalMode === "edit") {
                let updatedItem = {
                    ...editingItem,
                    ...formData,
                };

                /*
                 * Custom update function
                 */

                if (updateData) {
                    updatedItem = await updateData(
                        editingItem.id,
                        formData
                    );
                }

                /*
                 * Backend API example:
                 *
                 * const response = await fetch(
                 *     `${endpoint}/${editingItem.id}`,
                 *     {
                 *         method: "PUT",
                 *         headers: {
                 *             "Content-Type":
                 *                 "application/json",
                 *         },
                 *         body:
                 *             JSON.stringify(formData),
                 *     }
                 * );
                 *
                 * updatedItem =
                 *     await response.json();
                 */

                setData((prev) =>
                    prev.map((item) =>
                        item.id === editingItem.id
                            ? updatedItem
                            : item
                    )
                );
            }

            closeModal();
        } catch (error) {
            console.error(
                `Failed to save ${title}:`,
                error
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete this ${title}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            if (deleteData) {
                await deleteData(id);
            }

            /*
             * Backend API example:
             *
             * await fetch(
             *     `${endpoint}/${id}`,
             *     {
             *         method: "DELETE",
             *     }
             * );
             */

            setData((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );
        } catch (error) {
            console.error(
                `Failed to delete ${title}:`,
                error
            );
        }
    };

    // =========================================================
    // RESET FORM
    // =========================================================

    const handleReset = () => {
        setFormData(getInitialForm());
    };

    // =========================================================
    // COLUMN VALUE
    // =========================================================

    const getColumnValue = (
        item,
        column
    ) => {
        if (column.render) {
            return column.render(item);
        }

        const value = item?.[column.key];

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return String(value);
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="w-full">

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-6
                "
            >

                <div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    )}

                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        bg-indigo-600
                        text-white
                        rounded-xl
                        hover:bg-indigo-700
                        transition
                    "
                >
                    <Plus size={18} />

                    Add New
                </button>

            </div>

            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="relative mb-5">

                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder={`Search ${title.toLowerCase()}...`}
                    className="
                        w-full
                        md:w-96
                        pl-10
                        pr-4
                        py-2.5
                        border
                        border-gray-200
                        rounded-xl
                        outline-none
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                "
            >

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">

                            <tr>

                                {columns.map(
                                    (column) => (
                                        <th
                                            key={
                                                column.key
                                            }
                                            className="
                                                text-left
                                                px-5
                                                py-4
                                                text-sm
                                                font-semibold
                                                text-gray-600
                                            "
                                        >
                                            {
                                                column.label
                                            }
                                        </th>
                                    )
                                )}

                                <th
                                    className="
                                        text-right
                                        px-5
                                        py-4
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan={
                                            columns.length +
                                            1
                                        }
                                        className="
                                            text-center
                                            py-12
                                            text-gray-500
                                        "
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : filteredData.length ===
                                0 ? (

                                <tr>

                                    <td
                                        colSpan={
                                            columns.length +
                                            1
                                        }
                                        className="
                                            text-center
                                            py-12
                                            text-gray-500
                                        "
                                    >
                                        No records found.
                                    </td>

                                </tr>

                            ) : (

                                filteredData.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                            className="
                                                border-b
                                                last:border-b-0
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >

                                            {columns.map(
                                                (
                                                    column
                                                ) => (

                                                    <td
                                                        key={
                                                            column.key
                                                        }
                                                        className="
                                                            px-5
                                                            py-4
                                                            text-sm
                                                            text-gray-700
                                                        "
                                                    >
                                                        {
                                                            getColumnValue(
                                                                item,
                                                                column
                                                            )
                                                        }
                                                    </td>

                                                )
                                            )}

                                            {/* ACTIONS */}

                                            <td className="px-5 py-4">

                                                <div
                                                    className="
                                                        flex
                                                        justify-end
                                                        gap-2
                                                    "
                                                >

                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(
                                                                item
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            text-blue-600
                                                            hover:bg-blue-50
                                                            rounded-lg
                                                        "
                                                        title="View"
                                                    >
                                                        <Eye
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </button>

                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                item
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            text-indigo-600
                                                            hover:bg-indigo-50
                                                            rounded-lg
                                                        "
                                                        title="Edit"
                                                    >
                                                        <Pencil
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </button>

                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            text-red-600
                                                            hover:bg-red-50
                                                            rounded-lg
                                                        "
                                                        title="Delete"
                                                    >
                                                        <Trash2
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* =================================================
                FORM / VIEW MODAL
            ================================================= */}

            {modalOpen && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        p-4
                    "
                >

                    <div
                        className="
                            bg-white
                            w-full
                            max-w-3xl
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-2xl
                            shadow-2xl
                            p-6
                        "
                    >

                        {/* MODAL HEADER */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-6
                            "
                        >

                            <div>

                                <h2 className="text-xl font-bold">
                                    {modalMode ===
                                        "view"
                                        ? `View ${title}`
                                        : modalMode ===
                                            "edit"
                                            ? `Edit ${title}`
                                            : `Add ${title}`}
                                </h2>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeModal
                                }
                                className="
                                    p-2
                                    rounded-lg
                                    text-gray-500
                                    hover:bg-gray-100
                                    hover:text-gray-900
                                "
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* =================================================
                            VIEW
                        ================================================= */}

                        {modalMode ===
                            "view" ? (

                            <div className="space-y-5">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {fields.map(
                                        (field) => (

                                            <div
                                                key={
                                                    field.name
                                                }
                                                className={
                                                    field.type ===
                                                        "textarea" ||
                                                        field.type ===
                                                        "richtext"
                                                        ? "md:col-span-2"
                                                        : ""
                                                }
                                            >

                                                <label
                                                    className="
                                                        block
                                                        text-sm
                                                        font-medium
                                                        text-gray-700
                                                        mb-2
                                                    "
                                                >
                                                    {
                                                        field.label
                                                    }
                                                </label>

                                                <div
                                                    className="
                                                        min-h-[42px]
                                                        px-3
                                                        py-2.5
                                                        bg-gray-50
                                                        border
                                                        border-gray-200
                                                        rounded-xl
                                                        text-sm
                                                        text-gray-700
                                                        whitespace-pre-wrap
                                                    "
                                                >
                                                    {formData?.[
                                                        field.name
                                                    ] || "—"}
                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                                <FormButtons
                                    mode="view"
                                    onCancel={
                                        closeModal
                                    }
                                />

                            </div>

                        ) : (

                            /* =================================================
                                CREATE / EDIT
                            ================================================= */

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="space-y-5"
                            >

                                {fields.map(
                                    (field) => (

                                        <FormField
                                            key={
                                                field.name
                                            }
                                            label={
                                                field.label
                                            }
                                            name={
                                                field.name
                                            }
                                            type={
                                                field.type ||
                                                "text"
                                            }
                                            value={
                                                formData[
                                                field.name
                                                ] ?? ""
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder={
                                                field.placeholder ||
                                                ""
                                            }
                                            required={
                                                field.required ||
                                                false
                                            }
                                            disabled={
                                                field.disabled ||
                                                false
                                            }
                                        />

                                    )
                                )}

                                <FormButtons
                                    mode={
                                        modalMode
                                    }
                                    onCancel={
                                        closeModal
                                    }
                                    onReset={
                                        handleReset
                                    }
                                    loading={
                                        saving
                                    }
                                    showReset={
                                        modalMode ===
                                        "create"
                                    }
                                />

                            </form>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default CrudPage;