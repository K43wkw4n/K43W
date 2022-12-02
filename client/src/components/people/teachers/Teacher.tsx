import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TeachersList from "./TeachersList";
import { Teacher } from "../../../models/teachers";

export default function Teachers() { 
  const [teacher,setTeacher] = useState<Teacher[]>([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/Teacher")
    .then((res)=> res.json())
    .then((data) => setTeacher(data));
  },[]);
  
  return (
    <>
      <TeachersList teacher={teacher} />
    </> 
  );
}