import * as React from "react";
import { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { Student } from "../../../models/Students";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { fetchStudent } from "../../../store/student.store";
import useData from "../../hooks/useStudent";
import ProjectList from './StudentsList'

export default function Students() { 
  // const {students} = useAppSelector(state => state.students);
  const dispatch = useAppDispatch();
  const [students, setstudents] = useState<Student[]>([]);

  useEffect(()=>{
    agent.Student.list()
    .then((students) => setstudents(students))
    dispatch(fetchStudent());
  },[]);

  // const { products, brands, types, filtersLoaded, metaData } = useData();
  // const { studentParams } = useAppSelector((state) => state.MnStudent);
  
  return (
    <>
      <ProjectList students={students} />
    </> 
  );
}