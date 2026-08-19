import React, { useEffect, useMemo, useState } from "react";
import {
    Search
} from "lucide-react";

import FormField from "./FormField";
import FormButtons from "./FormButtons";

const Search = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

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

    return (


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

    );
};

export default Search;