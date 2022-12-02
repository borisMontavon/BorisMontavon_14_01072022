import { HOST } from "../config/hostConfig";
import { Routes } from "../config/routeConfig";

type ResponseData = {
    status: number;
    ok: Boolean;
}

export async function newEmployeePost(
    {
        firstName,
        lastName,
        serializedBirthDate,
        serializedStartDate,
        street,
        zipCode,
        city,
        state,
        department
    }:
    {
        firstName: string,
        lastName: string,
        serializedBirthDate: string,
        serializedStartDate: string,
        street: string,
        zipCode: string,
        city: string,
        state: string,
        department: string
    }) {
    try {
        const response = await fetch(HOST + Routes.NEW_EMPLOYEE_ROUTE, {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                serializedBirthDate,
                serializedStartDate,
                street,
                zipCode,
                city,
                state,
                department
            }),
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
            status: 501,
            message: "Sorry bro",
            body: {
                firstName: "",
                lastName: "",
                serializedBirthDate: "",
                serializedStartDate: "",
                street: "",
                zipCode: "",
                city: "",
                state: "",
                department: ""
            }
        };
    }
}
