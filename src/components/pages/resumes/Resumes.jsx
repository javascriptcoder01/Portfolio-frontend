import React, { useState } from "react";
import {
    Upload,
    Trash2,
    Download,
    FileText,
} from "lucide-react";
import PageContainer from "../../layouts/PageContainer";



const Resume = () => {

    const [resume, setResume] = useState(null);

    const handleUpload = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setResume({
            name: file.name,
            size: file.size,
            file,
        });

        // POST /api/portfolio/resume
    };

    const handleDelete = () => {

        if (!confirm("Delete current resume?")) {
            return;
        }

        // DELETE /api/portfolio/resume

        setResume(null);
    };

    return (
        <PageContainer title="Resume / CV">

            <p className="text-gray-500 mb-6">
                Upload and manage your current resume.
            </p>

            <div className="bg-white border rounded-2xl p-6">

                {!resume ? (

                    <label className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">

                        <Upload
                            size={35}
                            className="text-indigo-600 mb-3"
                        />

                        <h3 className="font-semibold">
                            Upload Resume
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            PDF, DOC or DOCX
                        </p>

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleUpload}
                            className="hidden"
                        />

                    </label>

                ) : (

                    <div className="flex items-center justify-between p-4 border rounded-xl">

                        <div className="flex items-center gap-4">

                            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                                <FileText size={25} />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    {resume.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {Math.round(resume.size / 1024)} KB
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-2">

                            <button
                                type="button"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Download"
                            >
                                <Download size={19} />
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Delete"
                            >
                                <Trash2 size={19} />
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </PageContainer>
    );
};

export default Resume;