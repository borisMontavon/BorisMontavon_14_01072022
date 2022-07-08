import { Link } from "react-router-dom";

export function EmployeesPage() {
    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>
                <table id="employee-table" className="display"></table>
                <Link to="/">Home</Link>
            </div>
        </>
    );
}
