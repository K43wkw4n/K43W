import React, { useCallback, useEffect } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Nav from "./components/layout/Nav";
import Course from "./components/Course";
import Notfound from "./components/error/Notfound";
import Home from "./components/home/Home";
import Manage from "./components/management/Manage";
import Footer from "./components/layout/Footer";
import Test from "./components/people/students/Test";
import Students from "./components/people/students/Students";
import StudentDetails from "./components/details/StudentDetails";
import TeacherDetails from "./components/details/TeacherDetails";
import Teacher from "./components/people/teachers/Teacher";
import SlideShow from "./components/home/SlideShow";
import StudentsList from "./components/management/StudentsList";
import TeachersList from "./components/management/TeachersList";
import Testy from "./components/management/Testy";
import PicturesList from "./components/management/PicturesList";
import ProjectsList from "./components/management/ProjectsList";
import Login from "./features/account/Login";
import { useAppDispatch, useAppSelector } from "./store/configureStore";
import { Box } from "@mui/material";
import Register from "./features/account/Register";
import { fetchCurrentUser } from "./features/account/accountSlice";
import Edit from "./components/management/Edit";

export default function App() {
  const { noNavnoFoot } = useAppSelector((state) => state.screen);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <>
      <RouterProvider router={Routers} />
    </>
  );
}

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Nav />}>
        <Route path="" element={<Home />} />
        <Route path="/studentList" element={<Students />} />
        <Route path="/course" element={<Course />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/slideshow" element={<SlideShow />} />
        <Route path="/test" element={<Test />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/teacher/:id" element={<TeacherDetails />} />
        {/* Manage */}
        <Route path="/studentlsit" element={<StudentsList />} />
        <Route path="/teacherlist" element={<TeachersList />} />
        <Route path="/picturelist" element={<PicturesList />} />
        <Route path="/projectlist" element={<ProjectsList />} />
        {/*Test*/}
        <Route path="/testy" element={<Testy />} />
        {/* Account */}
      </Route>
      
      <Route path="*" element={<Notfound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

// const Router = (
//   <>
//     <Box mt="143px">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="*" element={<Notfound />} />/
//         <Route path="/studentList" element={<Students />} />
//         <Route path="/course" element={<Course />} />
//         <Route path="/teacher" element={<Teacher />} />
//         <Route path="/manage" element={<Manage />} />
//         <Route path="/slideshow" element={<SlideShow pictures={[]} />} />
//         <Route path="/test" element={<Test />} />
//         <Route path="/student/:id" element={<StudentDetails />} />
//         <Route path="/teacher/:id" element={<TeacherDetails />} />
//         {/* Manage */}
//         <Route path="/studentlsit" element={<StudentsList />} />
//         <Route path="/teacherlist" element={<TeachersList />} />
//         <Route path="/picturelist" element={<PicturesList />} />
//         <Route path="/projectlist" element={<ProjectsList />} />
//         <Route path="/edit/:id" element={<Edit />} />
//         {/*Test*/}
//         <Route path="/testy" element={<Testy />} />
//         {/* Account */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Box>
//   </>
// );

// const Router3 = (
//   <>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/studentList" element={<Students />} />
//       <Route path="/course" element={<Course />} />
//       <Route path="/teacher" element={<Teacher />} />
//       <Route path="/manage" element={<Manage />} />
//       <Route path="/slideshow" element={<SlideShow pictures={[]} />} />
//       <Route path="/test" element={<Test />} />
//       <Route path="/student/:id" element={<StudentDetails />} />
//       <Route path="/teacher/:id" element={<TeacherDetails />} />
//       {/* Manage */}
//       <Route path="/studentlsit" element={<StudentsList />} />
//       <Route path="/teacherlist" element={<TeachersList />} />
//       <Route path="/picturelist" element={<PicturesList />} />
//       <Route path="/projectlist" element={<ProjectsList />} />
//       <Route path="/edit/:id" element={<Edit />} />
//       {/*Test*/}
//       <Route path="/testy" element={<Testy />} />
//       {/* Account */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   </>
// );
