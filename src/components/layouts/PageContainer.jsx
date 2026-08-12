const PageContainer = ({ title, children }) => {
    return (
        // <main className="w-full min-h-[calc(100vh-20px)] p-6 pb-8">
        <main className="w-full min-h-screen p-6 pb-8">
            {/* PAGE HEADING OPTIONAL */}
            {title && (
                <h1 className="text-2xl font-bold text-pink-800 mb-6">{title}</h1>
            )}

            {/* CONTENT BOX - same height/width container for all pages */}
            {/* <div className="w-full h-full rounded-3xl shadow-md p-6"> */}
            <div className="w-full rounded-3xl shadow-md p-6">
                {children}
            </div>
        </main>
    )
}

export default PageContainer