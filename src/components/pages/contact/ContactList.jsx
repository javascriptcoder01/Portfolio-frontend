import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteContactRequest, fetchContactsRequest, statusContactRequest } from "../../../redux/slices/contactSlice";

const ContactList = () => {
    const dispatch = useDispatch();
    const { contacts, actionLoading } = useSelector((state) => state.contact);

    useEffect(() => {
        dispatch(fetchContactsRequest());
    }, [dispatch]);

    const handleStatusToggle = (item) => {
        dispatch(statusContactRequest({ id: item._id, isActive: !item.isActive }));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete")) {
            dispatch(deleteContactRequest(id));
        }
    };

    if (!contacts || contacts.length === 0) {
        return (
            <div className="mt-8 text-center text-gray-500 py-8 border rounded-xl">
                Contact not found
            </div>
        );
    }

    return (
        <div className="overflow-auto border rounded-xl mb-10">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">S.No</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item, index) => (
                        <tr key={item._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{item?.email || "-"}</td>
                            <td className="px-4 py-3">{item?.phone || "-"}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleStatusToggle(item)}
                                    disabled={actionLoading}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;