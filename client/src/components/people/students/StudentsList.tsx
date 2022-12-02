import {
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Student } from "../../../models/Students";
import "../../../css/FlipCard.css";

interface Props {
  students: Student[];
}

export default function StudentsList({ students }: Props) {
  return (
    <>
      <Grid container spacing={1} columns={12} sx={{ m: "auto" }}>
        {students.map((student) => (
          <Grid
            item
            xs={2}
            mx="50px"
            key={student.id}
            component={Link}
            to={`/student/${student.id}`}
          >
            <Grid className="flip-card">
              <Grid className="flip-card-inner">
                <Grid className="flip-card-front">
                  <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    src={window.location.origin + `${student.img}`}
                    alt={student.name}
                    sx={{ borderRadius: "20px" }}
                  />
                </Grid>
                <Grid className="flip-card-back">
                  <Grid sx={{ mt: "100px" }}>
                    <Typography
                      gutterBottom
                      component="div"
                      color="darkblue"
                      variant="h5"
                    >
                      {student.title.name}&nbsp;
                      {student.name}&nbsp;
                      {student.surName}&nbsp;
                    </Typography>
                    <Typography variant="h6" color="darkblue">
                      {student.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
