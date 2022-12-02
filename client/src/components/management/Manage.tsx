import {
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Manage() {

  const Manage = [
    {title: "นักศึกษา", path: "/studentlsit",image:'https://img.freepik.com/premium-vector/flat-cartoon-running-student-charactertime-management-education-vector-illustration-concept_189557-2689.jpg?w=2000' },
    {title: "อาจารย์", path: "/teacherlist",image:'https://img.freepik.com/premium-vector/cute-teacher-cartoon-character_426162-126.jpg?w=2000' },
    {title: "ประชาสัมพันธ์", path: "/picturelist",image:'https://img.freepik.com/premium-vector/public-relations-template-hand-drawn-cartoon-illustration-with-team-idea-marketing-campaign_2175-7057.jpg?w=2000' },
    {title: "ปริญญานิพนธ์", path: "/projectlist",image:'https://res.cloudinary.com/teepublic/image/private/s--qvqg6Ax0--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1610543662/production/designs/18462008_0.jpg' },
  ];

  return (
    <>
      <Container>
        <Grid container columns={12}>
          {Manage.map(({ title, path,image}) => (
            <Grid item xs={5} m={4} key={path} component={Link} to={`${path}`}>
              <Grid className="flip-cardM">
                <Grid className="flip-card-inner">
                  <Grid className="flip-card-front">
                    <CardMedia
                      component="img"
                      height="500"
                      width="500"
                      src={image}
                      alt={title}
                      sx={{ borderRadius: "20px" }}
                    />
                  </Grid>
                  <Grid className="flip-card-back">
                    <Grid sx={{ mt: "100px" }}>
                      <Typography
                        gutterBottom
                        component="div"
                        color="darkblue"
                        variant="h4"
                      >
                        {title}
                      </Typography>
                      {/* <Typography variant="h6" color="darkblue">
                        Id
                      </Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
