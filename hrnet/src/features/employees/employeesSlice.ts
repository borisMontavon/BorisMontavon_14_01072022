import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { employeesGet } from '../../services/employeesGet';

interface EmployeesState {
    "data": any,
    "columns": Array<any>
}

const initialState: EmployeesState = {
    "data": [],
    "columns": [
        { title: "First Name", key: "firstName" },
        { title: "Last Name", key: "lastName" },
        { title: "Start Date", key: "serializedStartDate" },
        { title: "Department", key: "department" },
        { title: "Date of Birth", key: "serializedBirthDate" },
        { title: "Street", key: "street" },
        { title: "City", key: "city" },
        { title: "State", key: "state" },
        { title: "Zip Code", key: "zipCode" }
    ]
};

export const fetchEmployeesAsync = createAsyncThunk(
    'fetchEmployees',
    async () => {
        const response = await employeesGet();

        return response;
    }
)

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployeesAsync.fulfilled, (state, action: any) => {
            switch (action.payload.status) {
                case 200:
                    console.log(action);
                    return state = {...state, "data": action.payload.employees};
                default:
                    return state;
            }
        });
    }
});

export const selectEmployees = (state: RootState) => state.employees;

export default employeesSlice.reducer;
