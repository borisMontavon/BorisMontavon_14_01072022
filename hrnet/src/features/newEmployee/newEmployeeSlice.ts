import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { isBirthDateValid, isCityValid, isDepartmentValid, isFirstNameValid, isLastNameValid, isStartDateValid, isStateValid, isStreetValid, isZipCodeValid } from '../../helpers/newEmployeeFormValidation';


export interface NewEmployeeState {
    firstName: string;
    lastName: string;
    serializedBirthDate: string;
    serializedStartDate: string;
    street: string;
    zipCode: string;
    city: string;
    state: {label: string, value: string};
    department: {label: string, value: string};
    isFormValid: boolean;
}

const initialState: NewEmployeeState = {
    firstName: "",
    lastName: "",
    serializedBirthDate: new Date().toLocaleDateString("en-US"),
    serializedStartDate: new Date().toLocaleDateString("en-US"),
    street: "",
    zipCode: "",
    city: "",
    state: {label: "", value: ""},
    department: {label: "", value: ""},
    isFormValid: false
};

export const newEmployeeSlice = createSlice({
  name: 'newEmployee',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
        state.firstName = action.payload;
        isFirstNameValid({"firstName": state.firstName});
    },
    setLastName: (state, action: PayloadAction<string>) => {
        state.lastName = action.payload;
        isLastNameValid({"lastName": state.lastName});
    },
    setSerializedBirthDate: (state, action: PayloadAction<string>) => {
        state.serializedBirthDate = action.payload;
        isBirthDateValid({"birthDate": state.serializedBirthDate});
    },
    setSerializedStartDate: (state, action: PayloadAction<string>) => {
        state.serializedStartDate = action.payload;
        isStartDateValid({"startDate": state.serializedStartDate});
    },
    setStreet: (state, action: PayloadAction<string>) => {
        state.street = action.payload;
        isStreetValid({"street": state.street});
    },
    setZipCode: (state, action: PayloadAction<string>) => {
        state.zipCode = action.payload;
        isZipCodeValid({"zipCode": state.zipCode});
    },
    setCity: (state, action: PayloadAction<string>) => {
        state.city = action.payload;
        isCityValid({"city": state.city});
    },
    setState: (state, action: PayloadAction<object>) => {
        state.state = {...state.state, ...action.payload};
        isStateValid({label: state.state.label, value: state.state.value});
    },
    setDepartment: (state, action: PayloadAction<object>) => {
        state.department = {...state.department, ...action.payload};
        isDepartmentValid({label: state.department.label, value: state.department.value});
    },
    setIsFormValid: (state) => {
        state.isFormValid = true;

        if (!isFirstNameValid({"firstName": state.firstName})) {
            state.isFormValid = false;
        }
        if (!isLastNameValid({"lastName": state.lastName})) {
            state.isFormValid = false;
        }
        if (!isBirthDateValid({"birthDate": state.serializedBirthDate})) {
            state.isFormValid = false;
        }
        if (!isStartDateValid({"startDate": state.serializedStartDate})) {
            state.isFormValid = false;
        }
        if (!isStreetValid({"street": state.street})) {
            state.isFormValid = false;
        }
        if (!isZipCodeValid({"zipCode": state.zipCode})) {
            state.isFormValid = false;
        }
        if (!isCityValid({"city": state.city})) {
            state.isFormValid = false;
        }
        if (!isStateValid(state.state)) {
            state.isFormValid = false;
        }
        if (!isDepartmentValid(state.department)) {
            state.isFormValid = false;
        }
    }
  }
});

export const { setFirstName, setLastName, setSerializedBirthDate, setSerializedStartDate, setStreet, setZipCode, setCity, setState, setDepartment, setIsFormValid } = newEmployeeSlice.actions;

export const selectFirstName = (state: RootState) => state.newEmployee.firstName;
export const selectLastName = (state: RootState) => state.newEmployee.lastName;
export const selectSerializedBirthDate = (state: RootState) => state.newEmployee.serializedBirthDate;
export const selectSerializedStartDate = (state: RootState) => state.newEmployee.serializedStartDate;
export const selectStreet = (state: RootState) => state.newEmployee.street;
export const selectZipCode = (state: RootState) => state.newEmployee.zipCode;
export const selectCity = (state: RootState) => state.newEmployee.city;
export const selectState = (state: RootState) => state.newEmployee.state;
export const selectDepartment = (state: RootState) => state.newEmployee.department;
export const selectIsFormValid = (state: RootState) => state.newEmployee.isFormValid;

export default newEmployeeSlice.reducer;
