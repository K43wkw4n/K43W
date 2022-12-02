import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterReducer from "../features/counterSlice";
import { TableListSlice } from "../features/tablelistslice";
import { StudentSlice } from "./student.store";
import { TeacherSlice } from "./teacher.store";
import { PictureSlice } from "./picture.store";
import { ProjectSlice } from "./project.store";
import { accountSlice } from "../features/account/accountSlice";
import MnStudentsSlice from "../components/people/students/MnStudentsSlice";
import MnPictureSlice from "../components/management/MnPictureSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    table: TableListSlice.reducer,
    screen: accountSlice.reducer,
    students: StudentSlice.reducer,
    teachers: TeacherSlice.reducer,
    pictures: PictureSlice.reducer,
    projects: ProjectSlice.reducer,
    account: accountSlice.reducer,
    MnStudent: MnStudentsSlice,
    MnPicture: MnPictureSlice,
  },
});

//เป็นค่ํา Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>; // ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch; // dispatch ส าหรับเรียก action

//ส ําหรับเรียกใข้dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
