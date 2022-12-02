import { Grid, Typography } from "@mui/material";
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
import { fetchPicture } from "../../store/picture.store";
import agent from "../../api/agent";
import { Picture } from "../../models/Picture";
import { removePicture } from "./MnPictureSlice";
import EditPic from "./EditPic";
import "../../css/Any.css";
import usePicture from "../hooks/usePicture";

export default function PicturesList() {
  // const { pictures } = useAppSelector((state) => state.pictures);
  const dispatch = useAppDispatch();

  const { pictures } = usePicture();

  useEffect(() => {
    dispatch(fetchPicture());
  }, []);

  // const [target, setTarget] = useState(0);

  function handleDeletePicture(id: number) {
    // setTarget(id);
      agent.Admin.deletePicture(id)
      .then(() => dispatch(removePicture(id)))
      .catch((error) => console.log(error));
  }

  const [editMode, setEditMode] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<Picture | undefined>(
    undefined
  );

  //กรณีเลือก Edit
  function handleSelectStudent(student: Picture) {
    setSelectedPicture(student);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedPicture) setSelectedPicture(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <EditPic picture={selectedPicture} cancelEdit={cancelEdit} />;

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
          <Grid my={0.5}>
            <img src={row.img} alt={row.name} height={200} />
          </Grid>
          <TableCell>
            <Typography
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleSelectStudent(row)}
            >
              แก้ไข
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ color: "red", cursor: "pointer" }}
              color="error"
              onClick={() => handleDeletePicture(row.id)}
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
                      {/* <TableCell align="right">นามสกุล</TableCell>
                      <TableCell align="right">สถานะ</TableCell> */}
                      <TableCell></TableCell>
                      <TableCell></TableCell>
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
      <Typography
        onClick={() => setEditMode(true)}
        sx={{ cursor: "pointer", my: "12px" }}
        className="create"
      >
        Create
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ชื่อ</TableCell>
              {/* <TableCell align="right">นามสกุล</TableCell>
              <TableCell align="right">สถานะ</TableCell> */}
              <TableCell>รูปภาพ</TableCell>
              <TableCell>แก้ไข</TableCell>
              <TableCell>ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pictures.map((row: any, i) => (
              <Row row={row} key={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
