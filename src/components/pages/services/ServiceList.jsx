import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteServiceRequest, fetchServicesRequest, statusServiceRequest } from "../../../redux/slices/serviceSlice";


const ServiceList = () => {
    const dispatch = useDispatch();
    const { services, actionLoading } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchServicesRequest());
        console.log("Data coming from Service List Component: ", services);
    }, [dispatch]);


    const handleStatusToggle = (item) => {
        dispatch(statusServiceRequest({ id: item._id, isActive: !item.isActive }));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete")) {
            dispatch(deleteServiceRequest(id));
        }
    };

    if (!services || services.length === 0) {
        return (
            <div className="mt-8 text-center text-gray-500 py-8 border rounded-xl">
                Service not found
            </div>
        );
    }

    return (
        <div className="overflow-auto border rounded-xl mb-10">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">S.No</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((item, index) => (
                        <tr key={item._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{item?.title || "-"}</td>
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

export default ServiceList;