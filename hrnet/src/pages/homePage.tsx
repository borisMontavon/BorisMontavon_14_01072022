import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { CustomInput } from "../components/customInput";
import { optionsFetchHelper } from "../helpers/dataFetchHelper";
import { isFormValidCheck } from "../helpers/newEmployeeFormValidation";

import ReactSelect from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomModal } from "../components/customModal";
import {
    setSerializedBirthDate,
    setCity,
    setDepartment,
    setFirstName,
    setLastName,
    setSerializedStartDate,
    setState,
    setStreet,
    setZipCode,
    setdisplayModal,
    SelectInterface,
    selectNewEmployee,
    createNewEmployeeAsync
} from "../features/newEmployee/newEmployeeSlice";

export function HomePage() {
    const selectStateInputRef = useRef<any>();
    const selectDepartmentInputRef = useRef<any>();

    const [options, setOptions] = useState({"states": [], "departments": []});
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    const newEmployee = useAppSelector(selectNewEmployee);

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchOptions() {
            const optionsData = await optionsFetchHelper();

            setOptions(optionsData);
        }

        fetchOptions();
    }, []);

    const customStyles = {
        option: (provided: object, state: {isSelected: boolean, isFocused: boolean}) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "var(--primary)"
                : state.isFocused
                ? "var(--primary-opac)"
                : undefined,
            color: state.isSelected
            ? "white"
            : state.isFocused
            ? "white"
            : "black",
        }),
        control: (provided: object, state: {isFocused: boolean}) => ({
            ...provided,
            backgroundColor: "white",
            padding: "0",
            borderRadius: "0.25rem",
            border: "none",
            boxShadow: "none",
            outlineOffset: "1px",
            outline: state.isFocused ? "2px solid #0f766e" : "2px solid transparent"
        }),
        valueContainer: (provided: object) => ({
            ...provided,
            padding: "0 0.5rempx 0 0",
            marginLeft: "0.5rem"
        }),
        dropdownIndicator: (provided: object) => ({
            ...provided,
            padding: "0 0.5rem"
        }),
        input: (provided: object) => ({
            ...provided,
            padding: "0.5rem 0.5rem 0.5rem 0",
            margin: "0"
        }),
    }

    function onNewBirthDate(date: Date) {
        setBirthDate(date);
        dispatch(setSerializedBirthDate(date.toLocaleDateString("en-US")));
    }

    function onNewStartDate(date: Date) {
        setStartDate(date);
        dispatch(setSerializedStartDate(date.toLocaleDateString("en-US")));
    }

    function onValueSelected(inputValue: any): SelectInterface {
        return {
            label: inputValue.label,
            value: inputValue.value
        }
    }

    function onFormValidate(e: React.SyntheticEvent): void {
        e.preventDefault();
        e.stopPropagation();

        const newData = getNewEmployeeData();
        const isFormValid: boolean = isFormValidCheck(newData);

        if (isFormValid) {
            dispatch(createNewEmployeeAsync({...newEmployee, ...newData}));
        }
    }

    function closeModal() {
        // Closing the modal
        dispatch(setdisplayModal(false));
        // Resetting the form inputs
        (document.getElementById("create-employee") as HTMLFormElement).reset();
        // Resetting the datepickers components
        setBirthDate(new Date());
        setStartDate(new Date());
        // Resetting the ReactSelect components
        selectStateInputRef.current.setValue({"label": "", "value": ""});
        selectDepartmentInputRef.current.setValue({"label": "", "value": ""});
    }

    function getNewEmployeeData() {
        return {
            "firstName": newEmployee.firstName,
            "lastName": newEmployee.lastName,
            "serializedBirthDate": newEmployee.serializedBirthDate,
            "serializedStartDate": newEmployee.serializedStartDate,
            "street": newEmployee.street,
            "zipCode": newEmployee.zipCode,
            "city": newEmployee.city,
            "state": newEmployee.state,
            "department": newEmployee.department
        };
    }

    const error = newEmployee.error.length ?
        <span className="text-red-600">{newEmployee.error}</span> :
        <></>;

    return (
        <div className="w-100 flex flex-col items-center">
            <h1 className="font-montserrat text-teal-700 text-6xl mt-8 mb-12">HRnet</h1>
            <Link to="/employees" className="bg-transparent py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all mb-8 hover:bg-teal-700 hover:text-white">View Current Employees</Link>
            <div className="bg-neutral-900 rounded-lg mb-8 p-8 flex flex-col w-11/12 md:w-7/12 lg:w-5/12">
                <h2 className="text-white text-xl self-center mb-8 font-medium">Create Employee</h2>
                {error}
                <form onSubmit={onFormValidate} id="create-employee">
                    <CustomInput
                        inputId="first-name"
                        inputPattern="^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$"
                        min=""
                        labelTitle="First Name"
                        type="text"
                        errorSpanId="firstNameSpan"
                        errorSpanMessage="The first name is invalid (at least 2 characters long)."
                        onChangeInput={(e) => dispatch(setFirstName(e.target.value))}
                    />
                    <CustomInput
                        inputId="last-name"
                        inputPattern="^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$"
                        min=""
                        labelTitle="Last Name"
                        type="text"
                        errorSpanId="lastNameSpan"
                        errorSpanMessage="The last name is invalid (at least 2 characters long)."
                        onChangeInput={(e) => dispatch(setLastName(e.target.value))}
                    />
                    <div>
                        <label htmlFor="date-of-birth" className="text-white block mt-4 mb-2">Date of Birth</label>
                        <DatePicker
                            id="date-of-birth"
                            selected={birthDate}
                            onChange={(date: Date) => onNewBirthDate(date)}
                            dateFormat="MM/dd/yyyy"
                            showPopperArrow={false}
                            className="w-full p-2 rounded outline-none outline-offset-1 focus-visible:outline-teal-700"
                        />
                        <span
                            id="birthDateSpan"
                            className="hidden text-red-600 mt-1"
                        >
                            The birth date is invalid.
                        </span>
                    </div>
                    <div>
                        <label htmlFor="start-date" className="text-white block mt-4 mb-2">Start Date</label>
                        <DatePicker
                            id="start-date"
                            selected={startDate}
                            onChange={(date: Date) => onNewStartDate(date)}
                            dateFormat="MM/dd/yyyy"
                            showPopperArrow={false}
                            className="w-full p-2 rounded outline-none outline-offset-1 focus-visible:outline-teal-700"
                        />
                        <span
                            id="startDateSpan"
                            className="hidden text-red-600 mt-1"
                        >
                            The start date is invalid.
                        </span>
                    </div>
                    <CustomInput
                        inputId="street"
                        inputPattern="^[ 0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*$"
                        min=""
                        labelTitle="Street"
                        type="text"
                        errorSpanId="streetSpan"
                        errorSpanMessage="The street is invalid (at least 2 characters long)."
                        onChangeInput={(e) => dispatch(setStreet(e.target.value))}
                    />
                    <CustomInput
                        inputId="zip-code"
                        inputPattern="[0-9]+"
                        min="1"
                        labelTitle="Zip Code"
                        type="text"
                        errorSpanId="zipCodeSpan"
                        errorSpanMessage="The zip code is invalid (at least 1 character long)."
                        onChangeInput={(e) => dispatch(setZipCode(e.target.value))}
                    />
                    <CustomInput
                        inputId="city"
                        inputPattern="^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$"
                        min=""
                        labelTitle="City"
                        type="text"
                        errorSpanId="citySpan"
                        errorSpanMessage="The city's name is invalid (at least 2 characters long)."
                        onChangeInput={(e) => dispatch(setCity(e.target.value))}
                    />

                    <div>
                        <label htmlFor="state" className="text-white block mt-4 mb-2">State</label>
                        <ReactSelect
                            ref={selectStateInputRef}
                            styles={customStyles}
                            id="state"
                            options={options.states}
                            menuPlacement="auto"
                            onChange={(inputValue) => dispatch(setState(onValueSelected(inputValue)))}
                        />
                        <span
                            id="stateSpan"
                            className="hidden text-red-600 mt-1"
                        >
                            Please fill in this field.
                        </span>
                    </div>
                    <div>
                        <label htmlFor="department" className="text-white block mt-4 mb-2">Department</label>
                        <ReactSelect
                            ref={selectDepartmentInputRef}
                            styles={customStyles}
                            id="department"
                            options={options.departments}
                            menuPlacement="auto"
                            onChange={(inputValue) => dispatch(setDepartment(onValueSelected(inputValue)))}
                        />
                        <span
                            id="departmentSpan"
                            className="hidden text-red-600 mt-1"
                        >
                            Please fill in this field.
                        </span>
                    </div>
                    <button
                        className="bg-transparent self-center py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all mt-8 hover:bg-teal-700 hover:text-white"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
            <CustomModal show={newEmployee.displayModal} title={"Employee created !"} employeeData={newEmployee} onClose={() => closeModal()} />
        </div>
    );
}
