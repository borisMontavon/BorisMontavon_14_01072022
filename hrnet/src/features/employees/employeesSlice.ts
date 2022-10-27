import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, onSnapshot } from "firebase/firestore";
import { RootState } from '../../app/store';
import database from "../../firebase";

interface EmployeesState {
    "data": Array<any>,
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
    () => {
        return new Promise<any>((resolve) => {
            let data: Array<any> = [];
    
            onSnapshot(collection(database, "employees"), (snapshot) => {
                data = snapshot.docs.map((doc) => doc.data());

                resolve(data);
            });
        });
    }
)

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
            return state = {...state, "data": action.payload};
        });
    }
});

export const selectEmployees = (state: RootState) => state.employees;

export default employeesSlice.reducer;
