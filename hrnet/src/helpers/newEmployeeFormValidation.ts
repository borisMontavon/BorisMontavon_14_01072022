// Validate the form

// Validating first name input
export const isFirstNameValid = ({firstName}: {firstName: string}) => {
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
export const isLastNameValid = ({lastName}: {lastName: string}) => {
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
export const isBirthDateValid = ({birthDate}: {birthDate: string}) => {
    const todayDate = Date.parse(new Date().toLocaleDateString("en-US"));
    const birthDateParsed = Date.parse(birthDate);
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
export const isStartDateValid = ({startDate}: {startDate: string}) => {
    const todayDate = Date.parse(new Date().toLocaleDateString("en-US"));
    const startDateParsed = Date.parse(startDate);
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
export const isStreetValid = ({street}: {street: string}) => {
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
export const isZipCodeValid = ({zipCode}: {zipCode: string}) => {
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
export const isCityValid = ({city}: {city: string}) => {
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
export const isStateValid = (state: {label: string, value: string}) => {
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
export const isDepartmentValid = (department: {label: string, value: string}) => {
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
