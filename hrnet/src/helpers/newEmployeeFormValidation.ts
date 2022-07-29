// Validate the form

// Validating first name input
export const isFirstNameValid = ({firstName}: {"firstName": string}) => {
    const firstNameSpan = document.getElementById("firstNameSpan");
    const hasNumber = /\d/.test(firstName);

    if (hasNumber || firstName.length < 2) {
        firstNameSpan?.classList.add("block");
        firstNameSpan?.classList.remove("hidden");

        return false;
    }
    
    firstNameSpan?.classList.add("hidden");
    firstNameSpan?.classList.remove("block");

    return true;
};

// Validating last name input
export const isLastNameValid = ({lastName}: {"lastName": string}) => {
    const lastNameSpan = document.getElementById("lastNameSpan");
    const hasNumber = /\d/.test(lastName);

    if (hasNumber || lastName.length < 2) {
        lastNameSpan?.classList.add("block");
        lastNameSpan?.classList.remove("hidden");

        return false;

    }
    
    lastNameSpan?.classList.add("hidden");
    lastNameSpan?.classList.remove("block");

    return true;
};

// Validating birth date input
export const isBirthDateValid = ({serializedBirthDate}: {"serializedBirthDate": string}) => {
    const todayDate = Date.parse(new Date().toLocaleDateString("en-US"));
    const birthDateParsed = Date.parse(serializedBirthDate);
    const birthDateSpan = document.getElementById("birthDateSpan");

    if (birthDateParsed >= todayDate) {
        birthDateSpan?.classList.add("block");
        birthDateSpan?.classList.remove("hidden");

        return false;
    }

    birthDateSpan?.classList.add("hidden");
    birthDateSpan?.classList.remove("block");
    
    return true;
};

// Validating start date input
export const isStartDateValid = ({serializedStartDate}: {"serializedStartDate": string}) => {
    const todayDate = Date.parse(new Date().toLocaleDateString("en-US"));
    const startDateParsed = Date.parse(serializedStartDate);
    const startDateSpan = document.getElementById("startDateSpan");

    if (startDateParsed < todayDate) {
        startDateSpan?.classList.add("block");
        startDateSpan?.classList.remove("hidden");

        return false;
    }

    startDateSpan?.classList.add("hidden");
    startDateSpan?.classList.remove("block");
    
    return true;
};

// Validating street input
export const isStreetValid = ({street}: {"street": string}) => {
    const streetSpan = document.getElementById("streetSpan");

    if (street.length < 2) {
        streetSpan?.classList.add("block");
        streetSpan?.classList.remove("hidden");

        return false;
    }
    
    streetSpan?.classList.add("hidden");
    streetSpan?.classList.remove("block");

    return true;
};

// Validating zip code input
export const isZipCodeValid = ({zipCode}: {"zipCode": string}) => {
    const zipCodeSpan = document.getElementById("zipCodeSpan");

    if (zipCode.length < 1 || zipCode === "0") {
        zipCodeSpan?.classList.add("block");
        zipCodeSpan?.classList.remove("hidden");

        return false;
    }
    
    zipCodeSpan?.classList.add("hidden");
    zipCodeSpan?.classList.remove("block");

    return true;
};

// Validating city input
export const isCityValid = ({city}: {"city": string}) => {
    const citySpan = document.getElementById("citySpan");

    if (city.length < 2) {
        citySpan?.classList.add("block");
        citySpan?.classList.remove("hidden");

        return false;
    }
    
    citySpan?.classList.add("hidden");
    citySpan?.classList.remove("block");

    return true;
};

// Validating city input
export const isStateValid = (state: {"label": string, "value": string}) => {
    const stateSpan = document.getElementById("stateSpan");

    if (!state.label) {
        stateSpan?.classList.add("block");
        stateSpan?.classList.remove("hidden");

        return false;
    }
    
    stateSpan?.classList.add("hidden");
    stateSpan?.classList.remove("block");

    return true;
};

// Validating city input
export const isDepartmentValid = (department: {"label": string, "value": string}) => {
    const departmentSpan = document.getElementById("departmentSpan");

    if (!department.label) {
        departmentSpan?.classList.add("block");
        departmentSpan?.classList.remove("hidden");

        return false;
    }

    departmentSpan?.classList.add("hidden");
    departmentSpan?.classList.remove("block");

    return true;
};

export const isFormValidCheck = (data: {
    "firstName": string,
    "lastName": string,
    "serializedBirthDate": string,
    "serializedStartDate": string,
    "street": string,
    "zipCode": string,
    "city": string,
    "state": {
        "label": string,
        "value": string
    },
    "department": {
        "label": string,
        "value": string
    }
}) => {
    let isFormValid = true;

    if (!isFirstNameValid({"firstName": data.firstName})) {
        isFormValid = false;
    }
    if (!isLastNameValid({"lastName": data.lastName})) {
        isFormValid = false;
    }
    if (!isBirthDateValid({"serializedBirthDate": data.serializedBirthDate})) {
        isFormValid = false;
    }
    if (!isStartDateValid({"serializedStartDate": data.serializedStartDate})) {
        isFormValid = false;
    }
    if (!isStreetValid({"street": data.street})) {
        isFormValid = false;
    }
    if (!isZipCodeValid({"zipCode": data.zipCode})) {
        isFormValid = false;
    }
    if (!isCityValid({"city": data.city})) {
        isFormValid = false;
    }
    if (!isStateValid(data.state)) {
        isFormValid = false;
    }
    if (!isDepartmentValid(data.department)) {
        isFormValid = false;
    }

    return isFormValid;
};
