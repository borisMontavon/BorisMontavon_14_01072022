import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { employeesDataFetchHelper } from "../helpers/dataFetchHelper";

export function EmployeesPage() {
    const [employees, setEmployees] = useState({"employees": []});

    useEffect(() => {
        async function fetchOptions() {
            const optionsData = await employeesDataFetchHelper();

            setEmployees(optionsData);
        }

        fetchOptions();
    }, []);

    // function getEmployees() {
    //     $('#employee-table').DataTable({
    //         data: employees,
    //         columns: [
    //             { title: 'First Name', data: 'firstName' },
    //             { title: 'Last Name', data: 'lastName' },
    //             { title: 'Start Date', data: 'serializedStartDate' },
    //             { title: 'Department', data: 'department' },
    //             { title: 'Date of Birth', data: 'serializedBirthDate' },
    //             { title: 'Street', data: 'street' },
    //             { title: 'City', data: 'city' },
    //             { title: 'State', data: 'state' },
    //             { title: 'Zip Code', data: 'zipCode' },
    //         ]
    //     });
    // };

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
                <div className="bg-neutral-900 rounded-lg mb-8 p-8 flex flex-col w-11/12 md:w-7/12 lg:w-5/12">
                    <h2 className="text-white text-xl self-center mb-8 font-medium">Current Employees</h2>
                    <table id="employee-table" className="display"></table>
                </div>
            </div>
        </>
    );
}
