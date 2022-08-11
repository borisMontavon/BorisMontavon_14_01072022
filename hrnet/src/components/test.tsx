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

    useEffect(() => {
        setSortedData(data.data);

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

    const customTH = columns.map((item, index) => {
        return <th key={index} className="p-3 border border-neutral-800 border-collapse cursor-pointer" onClick={(e) => sortByColumn(e, item)}>
            {item.title}
            <FontAwesomeIcon icon={item.arrowIcon} className="text-neutral-500 ml-2" />
        </th>;
    });

    const rows = sortedData.map((item, index) => {
        return <CustomTR key={index} item={item} columns={data.columns} />;
    });

    return (
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
    );
}

ReactDataTable.propTypes = {
    data: PropTypes.object.isRequired
}
