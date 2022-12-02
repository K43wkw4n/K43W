import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Student } from '../models/Students'
import { RootState } from "../store/configureStore";

interface TableState {
    students:Student[];
}

const tablesAdapter = createEntityAdapter<Student>();

export const TableListSlice = createSlice({
    name:'TableListSlice',
    initialState: tablesAdapter.getInitialState<TableState>({
        students:[],
    }),
    reducers:{
        DataStudents: (state)=>{
            state.students = state.students
        }
    }
})

export default TableListSlice.reducer;

export const tableSelectors = tablesAdapter.getSelectors(
    (state: RootState) => state.table
)
