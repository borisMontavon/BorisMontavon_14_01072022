import { HOST } from "../config/hostConfig";
import { Routes } from "../config/routeConfig";

type ResponseData = {
    status: number;
    employees: Array<any>;
}

export async function employeesGet() {
    try {
        const response = await fetch(HOST + Routes.EMPLOYEES_ROUTE, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        let result = (await response.json()) as ResponseData;

        result.status = response.status;
        
        return result;
    } catch (error) {
        // Another case of error, if database is not running or disconnected during the process for example
        console.log('unexpected error: ', error);

        return {
            status: 501
        };
    }
}
