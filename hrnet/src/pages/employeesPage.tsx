import { ReactDataTable } from "@borisMontavon/react-data-table";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchEmployeesAsync, selectEmployees } from "../features/employees/employeesSlice";

export function EmployeesPage() {
    const employees = useAppSelector(selectEmployees);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchEmployees() {
            dispatch(fetchEmployeesAsync());
        }

        fetchEmployees();

    }, [dispatch]);

    let employeesCreated;

    if (employees.data.length) {
        employeesCreated = <ReactDataTable data={employees} />;
    } else {
        employeesCreated = <span className="text-white">No employees created yet.</span>;
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
