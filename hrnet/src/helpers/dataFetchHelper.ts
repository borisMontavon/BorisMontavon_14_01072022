export async function optionsFetchHelper() {
    try {
        let response = await fetch(
            "assets/resources/options.json",
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function employeesDataFetchHelper() {
    try {
        let response = await fetch(
            "assets/resources/employees.json",
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
