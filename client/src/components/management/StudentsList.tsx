import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchStudent } from "../../store/student.store";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { removeStudent } from "../people/students/MnStudentsSlice";
import { Student } from "../../models/Students";
import Edit from "./Edit";

export default function StudentsList() {
  const { students } = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStudent());
  }, []);

  // const [target, setTarget] = useState(0);

  function handleDeleteProduct(id: number) {
    // setTarget(id);
    agent.Admin.deleteStudent(id)
      .then(() => dispatch(removeStudent(id)))
      .catch((error) => console.log(error));
  }

  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  //กรณีเลือก Edit
  function handleSelectStudent(student: Student) {
    setSelectedStudent(student);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedStudent) setSelectedStudent(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <Edit student={selectedStudent} cancelEdit={cancelEdit} />;

  function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.surName}</TableCell>
          <TableCell align="right">
            {row.status ? <>{row.status.name}</> : <></>}
          </TableCell>
          <TableCell align="right">
            <Typography
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleSelectStudent(row)}
            >
              แก้ไข
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography
              sx={{ color: "red", cursor: "pointer" }}
              // startIcon={<Delete />}
              color="error"
              onClick={() => handleDeleteProduct(row.id)}
            >
              ลบ
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  เพิ่มเติม
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>ไอดี</TableCell>
                      <TableCell>ชื่อ</TableCell>
                      <TableCell>นามสกุล</TableCell>
                      <TableCell>เพศ</TableCell>
                      <TableCell>วันเกิด</TableCell>
                      <TableCell>อีเมลล์</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.surName}</TableCell>
                      <TableCell>{row.sex}</TableCell>
                      <TableCell>{row.birthday}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell>คำนำหน้า</TableCell>
                      <TableCell>เบอร์โทร</TableCell>
                      <TableCell>จบภาคการศึกษา</TableCell>
                      <TableCell>จบจากโรงเรียน</TableCell>
                      <TableCell>สถานะ</TableCell>
                      <TableCell>ที่อยู่</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.id}></TableRow>
                    <TableCell>{row.title.name}</TableCell>
                    <TableCell>{row.tel}</TableCell>
                    <TableCell>{row.oldEdu}</TableCell>
                    <TableCell>{row.oldSchool}</TableCell>
                    <TableCell>{row.status.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ชื่อ</TableCell>
              <TableCell align="right">นามสกุล</TableCell>
              <TableCell align="right">สถานะ</TableCell>
              <TableCell align="right">แก้ไข</TableCell>
              <TableCell align="right">ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row: any, i) => (
              <Row row={row} key={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
