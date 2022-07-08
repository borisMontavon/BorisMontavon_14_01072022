import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { dataFetchHelper } from "../helpers/dataFetchHelper";
import ReactSelect from "react-select";

export function HomePage() {
    const [options, setOptions] = useState({"states": [], "departments": []});

    useEffect(() => {
        async function fetchOptions() {
            const optionsData = await dataFetchHelper();

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

    return (
        <div className="w-100 flex flex-col items-center">
            <h1 className="font-montserrat text-teal-700 text-6xl mt-8 mb-12">HRnet</h1>
            <Link to="/employees" className="bg-transparent py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all mb-8 hover:bg-teal-700 hover:text-white">View Current Employees</Link>
            <div className="bg-neutral-900 rounded-lg mb-8 p-8 flex flex-col w-11/12 md:w-7/12 lg:w-5/12">
                <h2 className="text-white text-xl self-center mb-8 font-medium">Create Employee</h2>
                <form action="#" id="create-employee">
                    <CustomInput inputId="first-name" labelTitle="First Name" type="text" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="last-name" labelTitle="Last Name" type="text" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="date-of-birth" labelTitle="Date of Birth" type="text" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="start-date" labelTitle="Start Date" type="text" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="street" labelTitle="Street" type="text" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="zip-code" labelTitle="Zip Code" type="number" onChangeInput={(e) => console.log(e.target.value)}/>
                    <CustomInput inputId="city" labelTitle="City" type="text" onChangeInput={(e) => console.log(e.target.value)}/>

                    <div>
                        <label htmlFor="state" className="text-white block mt-4 mb-2">State</label>
                        <ReactSelect styles={customStyles} id="state" options={options.states} menuPlacement="auto" />
                    </div>
                    <div>
                        <label htmlFor="department" className="text-white block mt-4 mb-2">Department</label>
                        <ReactSelect styles={customStyles} id="department" options={options.departments} menuPlacement="auto" />
                    </div>
                </form>

                <button className="bg-transparent self-center py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all mt-8 hover:bg-teal-700 hover:text-white">Save</button>
            </div>
            {/* <div id="confirmation" className="modal">Employee Created!</div> */}
        </div>
    );
}
