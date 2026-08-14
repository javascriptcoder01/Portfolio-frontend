import React, { useEffect, useRef, useState } from "react";
import {
    Upload,
    Trash2,
    Download,
    FileText,
    RefreshCw,
} from "lucide-react";

import PageContainer from "../../layouts/PageContainer";

const Resume = () => {
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    // =========================================================
    // FORMAT FILE SIZE
    // =========================================================

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 KB";

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // =========================================================
    // UPLOAD
    // =========================================================

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Only PDF, DOC and DOCX files are allowed.");

            e.target.value = "";
            return;
        }

        // Optional file size limit: 10 MB
        const maxSize = 10 * 1024 * 1024;

        if (file.size > maxSize) {
            alert("Resume file size must be less than 10 MB.");

            e.target.value = "";
            return;
        }

        try {
            setUploading(true);

            /*
             * FUTURE BACKEND:
             *
             * const formData = new FormData();
             * formData.append("resume", file);
             *
             * await fetch("/api/portfolio/resume", {
             *     method: "POST",
             *     body: formData,
             * });
             */

            const previewUrl = URL.createObjectURL(file);

            setResume({
                name: file.name,
                size: file.size,
                type: file.type,
                file,
                url: previewUrl,
            });

        } catch (error) {
            console.error("Resume upload failed:", error);

            alert("Failed to upload resume.");
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    // =========================================================
    // DOWNLOAD
    // =========================================================

    const handleDownload = () => {
        if (!resume?.url) return;

        const link = document.createElement("a");

        link.href = resume.url;
        link.download = resume.name;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete the current resume?"
        );

        if (!confirmed) return;

        /*
         * FUTURE BACKEND:
         *
         * await fetch("/api/portfolio/resume", {
         *     method: "DELETE",
         * });
         */

        if (resume?.url) {
            URL.revokeObjectURL(resume.url);
        }

        setResume(null);
    };

    // =========================================================
    // CLEANUP OBJECT URL
    // =========================================================

    useEffect(() => {
        return () => {
            if (resume?.url) {
                URL.revokeObjectURL(resume.url);
            }
        };
    }, []);

    return (
        <PageContainer title="Resume / CV">

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="mb-6">
                <p className="text-gray-500">
                    Upload and manage your current resume or CV.
                </p>
            </div>

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                {/* =================================================
                    NO RESUME
                ================================================= */}

                {!resume ? (
                    <div>

                        <label
                            htmlFor="resume-upload"
                            className="
                                border-2
                                border-dashed
                                border-gray-300
                                rounded-2xl
                                p-12
                                flex
                                flex-col
                                items-center
                                justify-center
                                cursor-pointer
                                transition
                                hover:border-indigo-500
                                hover:bg-indigo-50
                            "
                        >

                            <div className="
                                p-4
                                bg-indigo-50
                                text-indigo-600
                                rounded-2xl
                                mb-4
                            ">
                                <Upload size={32} />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Upload Resume
                            </h3>

                            <p className="text-sm text-gray-500 mt-2 text-center">
                                Upload your latest resume or CV
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                PDF, DOC or DOCX • Maximum 10 MB
                            </p>

                            <span className="
                                mt-5
                                px-5
                                py-2.5
                                bg-indigo-600
                                text-white
                                rounded-xl
                                text-sm
                                font-medium
                            ">
                                Choose File
                            </span>

                            <input
                                ref={fileInputRef}
                                id="resume-upload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleUpload}
                                disabled={uploading}
                                className="hidden"
                            />

                        </label>

                    </div>

                ) : (

                    /* =================================================
                       RESUME EXISTS
                    ================================================= */

                    <div>

                        {/* HEADER */}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Current Resume
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    This resume will be used on your portfolio.
                                </p>
                            </div>

                            {/* REPLACE BUTTON */}

                            <label
                                htmlFor="resume-replace"
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
                                    cursor-pointer
                                    hover:bg-indigo-700
                                    transition
                                    text-sm
                                    font-medium
                                "
                            >
                                <RefreshCw size={17} />

                                Replace Resume

                                <input
                                    id="resume-replace"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>

                        </div>

                        {/* FILE */}

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-4
                            p-5
                            border
                            border-gray-200
                            rounded-2xl
                            bg-gray-50
                        ">

                            {/* FILE INFO */}

                            <div className="flex items-center gap-4">

                                <div className="
                                    p-3
                                    bg-red-50
                                    text-red-600
                                    rounded-xl
                                ">
                                    <FileText size={28} />
                                </div>

                                <div className="min-w-0">

                                    <h3 className="
                                        font-semibold
                                        text-gray-900
                                        truncate
                                        max-w-[300px]
                                    ">
                                        {resume.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatFileSize(resume.size)}
                                    </p>

                                </div>

                            </div>

                            {/* ACTIONS */}

                            <div className="flex items-center gap-2">

                                {/* DOWNLOAD */}

                                <button
                                    type="button"
                                    onClick={handleDownload}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-3
                                        py-2
                                        text-blue-600
                                        hover:bg-blue-50
                                        rounded-lg
                                        transition
                                    "
                                    title="Download Resume"
                                >
                                    <Download size={19} />

                                    <span className="hidden sm:inline">
                                        Download
                                    </span>
                                </button>

                                {/* DELETE */}

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-3
                                        py-2
                                        text-red-600
                                        hover:bg-red-50
                                        rounded-lg
                                        transition
                                    "
                                    title="Delete Resume"
                                >
                                    <Trash2 size={19} />

                                    <span className="hidden sm:inline">
                                        Delete
                                    </span>
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </PageContainer>
    );
};

export default Resume;