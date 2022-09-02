import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong, faArrowDownLong, faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";

import { CustomTR } from "./customTR";

interface ReactDataTableProps {
    data: {"data": Array<any>, "columns": Array<any>};
}

export function ReactDataTable({data}:ReactDataTableProps) {
    const [sortedData, setSortedData] = useState<Array<any>>([]);
    const [columns, setColumns] = useState<Array<any>>([]);
    const [maxRows, setMaxRows] = useState(10);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        const initData = data.data.map((item) => {
            return {
                ...item,
                "show": true
            };
        });

        setSortedData(initData);

        const initColumns = data.columns.map((column) => {
            return {
                ...column,
                "sortBy": "none",
                "arrowIcon": faArrowsUpDown
            };
        });

        setColumns(initColumns);
    }, [data]);

    // Returns a function responsible for sorting a specific column index 
    // (key = columnKey, asc = ascending order?).
    const comparer = function(key: string, asc: boolean) {
        // This is used by the array.sort() function...
        return function(item1: any, item2: any) {

            // This is a transient function, that is called straight away. 
            // It allows passing in different order of args, based on 
            // the ascending/descending order.
            return function(value1, value2) {

                // sort based on a numeric or localeCompare, based on type...
                return (value1 !== "" && value2 !== "" && !isNaN(value1) && !isNaN(value2))
                    ? value1 - value2
                    : value1.toString().localeCompare(value2);
            }(asc ? item1[key] : item2[key], asc ? item2[key] : item1[key]);
        }
    };

    const sortByColumn = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, column: any) => {
        e.preventDefault();
        e.stopPropagation();

        switch (column.sortBy) {
            case "asc":
                column.sortBy = "desc";
                column.arrowIcon = faArrowDownLong;
                break;
            case "desc":
            default:
                column.sortBy = "asc";
                column.arrowIcon = faArrowUpLong;
                break;
        }

        columns.forEach((item) => {
            if (item.key !== column.key) {
                item.sortBy = "none";
                item.arrowIcon = faArrowsUpDown;
            }
        });

        const newlySortedData = [...sortedData];
        
        newlySortedData.sort(comparer(column.key, column.sortBy === "asc"));
        
        setSortedData(newlySortedData);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value;

        if (searchString === "") {
            sortedData.forEach((item) => {
                item.show = true;
            });
            setIsSearched(false);
        } else {
            sortedData.forEach((item) => {
                item.show = columns.some((column) => item[column.key].toLowerCase().includes(searchString.toLowerCase()));
            });
            setIsSearched(true);
        }

        const newlySortedData = [...sortedData];

        setSortedData(newlySortedData);
    };

    const handleEntries = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMaxRows(Number(e.target.value));
    };

    const nbEntries = sortedData.filter((item) => item.show).length;

    const customTH = columns.map((item, index) => {
        return <th key={index} className="p-3 border border-neutral-800 border-collapse cursor-pointer" onClick={(e) => sortByColumn(e, item)}>
            {item.title}
            <FontAwesomeIcon icon={item.arrowIcon} className="text-neutral-500 ml-2" />
        </th>;
    });

    let nbRows = 0;

    const rows = sortedData.map((item, index) => {
        if (item.show && nbRows < maxRows) {
            nbRows++;

            return <CustomTR key={index} item={item} columns={data.columns} />;
        }

        return null;
    });

    const entriesSummary = isSearched ?
        <span className="text-white">Showing 1 to {nbRows} of {nbEntries} entries (filtered from {sortedData.length} total entries)</span> :
        <span className="text-white">Showing 1 to {nbRows} of {nbEntries} entries</span>;

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <div>
                    <span
                        className="text-white"
                    >
                        Show
                    </span>
                    <select
                        id="inputTableSearch"
                        className="mx-2 p-1 rounded outline-none outline-offset-1 focus-visible:outline-teal-700"
                        onChange={(e) => handleEntries(e)}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span
                        className="text-white"
                    >
                        entries
                    </span>
                </div>
                <div>
                    <label
                        htmlFor="inputTableSearch"
                        className="text-white"
                    >
                        Search :
                    </label>
                    <input
                        id="inputTableSearch"
                        type="text"
                        className="ml-3 p-1 rounded outline-none outline-offset-1 focus-visible:outline-teal-700"
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            </div>
            <div>
                <table className="border border-neutral-800 text-white">
                    <thead>
                        <tr>
                            {customTH}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div>
                    {entriesSummary}
                </div>
            </div>
        </div>
    );
}

ReactDataTable.propTypes = {
    data: PropTypes.object.isRequired
}
