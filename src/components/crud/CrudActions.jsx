import React from "react";
import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

const CrudActions = ({
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex items-center gap-2">

            {onView && (
                <button
                    type="button"
                    onClick={onView}
                    title="View"
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                >
                    <Eye size={18} />
                </button>
            )}

            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    title="Edit"
                    className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition"
                >
                    <Pencil size={18} />
                </button>
            )}

            {onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    title="Delete"
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                    <Trash2 size={18} />
                </button>
            )}

        </div>
    );
};

export default CrudActions;