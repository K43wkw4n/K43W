import { Typography } from "@mui/material";
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
import { fetchTeacher } from "../../store/teacher.store";

export default function TeachersList() {
  const { teachers } = useAppSelector((state) => state.teachers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeacher());
  }, []);

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
                      <TableCell align="right">นามสกุล</TableCell>
                      <TableCell align="right">สถานะ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.surName}</TableCell>
                      <TableCell align="right">
                        {row.status ? <>{row.status.name}</> : <></>}
                      </TableCell>
                    </TableRow>
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
            {teachers.map((row: any, i) => (
              <Row row={row} key={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
