import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { isBirthDateValid, isCityValid, isDepartmentValid, isFirstNameValid, isLastNameValid, isStartDateValid, isStateValid, isStreetValid, isZipCodeValid } from '../../helpers/newEmployeeFormValidation';
import { newEmployeePost } from '../../services/newEmployeePost';


interface NewEmployeeState {
    "firstName": string,
    "lastName": string,
    "serializedBirthDate": string,
    "serializedStartDate": string,
    "street": string,
    "zipCode": string,
    "city": string,
    "state": string,
    "department": string,
    "error": string,
    "displayModal": boolean
}

export interface SelectInterface {
    label: string;
    value: string;
}

const initialState: NewEmployeeState = {
    "firstName": "",
    "lastName": "",
    "serializedBirthDate": new Date().toLocaleDateString("en-US"),
    "serializedStartDate": new Date().toLocaleDateString("en-US"),
    "street": "",
    "zipCode": "",
    "city": "",
    "state": "",
    "department": "",
    "error": "",
    "displayModal": false
};

export const createNewEmployeeAsync = createAsyncThunk(
    'createNewEmployee',
    async (
        {
            firstName, lastName, serializedBirthDate, serializedStartDate, street, zipCode, city, state, department
        }:
        {
            firstName: string,
            lastName: string,
            serializedBirthDate: string,
            serializedStartDate: string,
            street: string,
            zipCode: string
            city: string,
            state:string,
            department: string
        }) => {
            const response = await newEmployeePost({firstName, lastName, serializedBirthDate, serializedStartDate, street, zipCode, city, state, department});
            
            return response;
    }
)

export const newEmployeeSlice = createSlice({
    name: 'newEmployee',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state = {...state, "firstName": action.payload};
            isFirstNameValid({"firstName": state.firstName});
            return state;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state = {...state, "lastName": action.payload};
            isLastNameValid({"lastName": state.lastName});
            return state;
        },
        setSerializedBirthDate: (state, action: PayloadAction<string>) => {
            state = {...state, "serializedBirthDate": action.payload};
            isBirthDateValid({"serializedBirthDate": state.serializedBirthDate});
            return state;
        },
        setSerializedStartDate: (state, action: PayloadAction<string>) => {
            state = {...state, "serializedStartDate": action.payload};
            isStartDateValid({"serializedStartDate": state.serializedStartDate});
            return state;
        },
        setStreet: (state, action: PayloadAction<string>) => {
            state = {...state, "street": action.payload};
            isStreetValid({"street": state.street});
            return state;
        },
        setZipCode: (state, action: PayloadAction<string>) => {
            state = {...state, "zipCode": action.payload};
            isZipCodeValid({"zipCode": state.zipCode});
            return state;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state = {...state, "city": action.payload};
            isCityValid({"city": state.city});
            return state;
        },
        setState: (state, action: PayloadAction<{"label": string, "value": string}>) => {
            state = {...state, "state": action.payload.label};
            isStateValid({"state": state.state});
            return state;
        },
        setDepartment: (state, action: PayloadAction<{"label": string, "value": string}>) => {
            state = {...state, "department": action.payload.label};
            isDepartmentValid({"department": state.department});
            return state;
        },
        setdisplayModal: (state, action: PayloadAction<boolean>) => {
            state = {...state, "displayModal": action.payload};
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNewEmployeeAsync.fulfilled, (state, action) => {
            switch (action.payload.status) {
                case 201:
                    state.displayModal = true;
                    return state;
                default:
                    state.error = "Something went wrong ..";
                    state.displayModal = false;
                    return state;
            }
        });
    }
});

export const { setFirstName, setLastName, setSerializedBirthDate, setSerializedStartDate, setStreet, setZipCode, setCity, setState, setDepartment, setdisplayModal } = newEmployeeSlice.actions;

export const selectNewEmployee = (state: RootState) => state.newEmployee;

export default newEmployeeSlice.reducer;
