import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { isBirthDateValid, isCityValid, isDepartmentValid, isFirstNameValid, isLastNameValid, isStartDateValid, isStateValid, isStreetValid, isZipCodeValid } from '../../helpers/newEmployeeFormValidation';


export interface NewEmployeeState {
    data: {
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
    }
}

const initialState: NewEmployeeState = {
    data: {
        "firstName": "",
        "lastName": "",
        "serializedBirthDate": new Date().toLocaleDateString("en-US"),
        "serializedStartDate": new Date().toLocaleDateString("en-US"),
        "street": "",
        "zipCode": "",
        "city": "",
        "state": {
            "label": "",
            "value": ""
        },
        "department": {
            "label": "",
            "value": ""
        }
    }
};

export const newEmployeeSlice = createSlice({
    name: 'newEmployee',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "firstName": action.payload};
            isFirstNameValid({"firstName": state.data.firstName});
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "lastName": action.payload};
            isLastNameValid({"lastName": state.data.lastName});
        },
        setSerializedBirthDate: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "serializedBirthDate": action.payload};
            isBirthDateValid({"serializedBirthDate": state.data.serializedBirthDate});
        },
        setSerializedStartDate: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "serializedStartDate": action.payload};
            isStartDateValid({"serializedStartDate": state.data.serializedStartDate});
        },
        setStreet: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "street": action.payload};
            isStreetValid({"street": state.data.street});
        },
        setZipCode: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "zipCode": action.payload};
            isZipCodeValid({"zipCode": state.data.zipCode});
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.data = {...state.data, "city": action.payload};
            isCityValid({"city": state.data.city});
        },
        setState: (state, action: PayloadAction<object>) => {
            state.data.state = {...state.data.state, ...action.payload};
            isStateValid({label: state.data.state.label, value: state.data.state.value});
        },
        setDepartment: (state, action: PayloadAction<object>) => {
            state.data.department = {...state.data.department, ...action.payload};
            isDepartmentValid({label: state.data.department.label, value: state.data.department.value});
        },
        setModalData: (state, action: PayloadAction<object>) => {
            state.data = {...state.data, ...action.payload};
        }
    }
});

export const { setFirstName, setLastName, setSerializedBirthDate, setSerializedStartDate, setStreet, setZipCode, setCity, setState, setDepartment, setModalData } = newEmployeeSlice.actions;

export const selectFirstName = (state: RootState) => state.newEmployee.data.firstName;
export const selectLastName = (state: RootState) => state.newEmployee.data.lastName;
export const selectSerializedBirthDate = (state: RootState) => state.newEmployee.data.serializedBirthDate;
export const selectSerializedStartDate = (state: RootState) => state.newEmployee.data.serializedStartDate;
export const selectStreet = (state: RootState) => state.newEmployee.data.street;
export const selectZipCode = (state: RootState) => state.newEmployee.data.zipCode;
export const selectCity = (state: RootState) => state.newEmployee.data.city;
export const selectState = (state: RootState) => state.newEmployee.data.state;
export const selectDepartment = (state: RootState) => state.newEmployee.data.department;
export const selectModalData = (state: RootState) => state.newEmployee;

export default newEmployeeSlice.reducer;
