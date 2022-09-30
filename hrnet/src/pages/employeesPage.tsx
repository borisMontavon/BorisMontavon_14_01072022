import { ReactDataTable } from "@borisMontavon/react-data-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { employeesDataFetchHelper } from "../helpers/dataFetchHelper";

interface TableData {
    data: Array<any>;
    columns: Array<any>;
}

export function EmployeesPage() {
    const [employees, setEmployees] = useState<TableData>({"data": [], "columns": []});

    useEffect(() => {
        async function fetchOptions() {
            const optionsData = await employeesDataFetchHelper();

            setEmployees({
                "data": [...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees, ...optionsData.employees],
                "columns": [
                    { title: 'First Name', key: 'firstName' },
                    { title: 'Last Name', key: 'lastName' },
                    { title: 'Start Date', key: 'serializedStartDate' },
                    { title: 'Department', key: 'department' },
                    { title: 'Date of Birth', key: 'serializedBirthDate' },
                    { title: 'Street', key: 'street' },
                    { title: 'City', key: 'city' },
                    { title: 'State', key: 'state' },
                    { title: 'Zip Code', key: 'zipCode' }
                ]
            });
        }

        fetchOptions();
    }, []);

    let employeesCreated;

    if (employees.data.length) {
        employeesCreated = <ReactDataTable data={employees} />;
    } else {
        employeesCreated = <span>No employees created yet.</span>;
    }

    return (
        <>
            <div className="w-100 flex flex-col items-center">
                <h1 className="font-montserrat text-teal-700 text-6xl mt-8 mb-12">HRnet</h1>
                <Link
                    to="/"
                    className="bg-transparent py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all mb-8 hover:bg-teal-700 hover:text-white"
                >
                    Home
                </Link>
                <div className="bg-neutral-900 rounded-lg mb-8 p-8 flex flex-col w-11/12 md:w-7/12 lg:w-auto">
                    <h2 className="text-white text-xl self-center mb-8 font-medium">Current Employees</h2>
                    {employeesCreated}
                </div>
            </div>
        </>
    );
}
