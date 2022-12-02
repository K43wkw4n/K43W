import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchPicture } from "../../store/picture.store";
import SlideShow from "./SlideShow";

// import Logo from '../images/eye.jpg';
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { pictures } = useAppSelector((state) => state.pictures);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPicture());
  }, []);
  return (
    <>
      {/* <Box sx={{textAlign:'center', fontSize:'50px', m:'30px'}}>
            สาขาวิทยาการคอมพิวเตอร์
        </Box> */}
      {/* filter: 'brightness(50%)' */}
      <Grid
        container
        spacing={2}
        columns={24}
        borderBottom={2}
        sx={{ pb: "30px" }}
      >
        <Grid item xs={17}>
          <SlideShow pictures={pictures} />
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            textAlign: "center",
            top: "100px",
            right: "10px",
            position: "relative",
          }}
        >
          <Typography sx={{ m: "5px", fontSize: "50px", color: "#5274FF" }}>
            วิทยาการคอมพิวเตอร์
          </Typography>
          <Typography sx={{ m: "5px", fontSize: "30px", color: "#5AFF52" }}>
            คณะวิทยาศาสตร์และเทคโนโลยี
          </Typography>
          <Typography sx={{ m: "5px", fontSize: "30px", color: "#5AFF52" }}>
            มหาวิทยาลัยราชภัฏกาญจนบุรี
          </Typography>
          <Typography sx={{ m: "5px", fontSize: "25px", color: "#FFCD52" }}>
            "ใฝ่รู้ สู้งาน ชำนาญการพัฒนาซอฟต์แวร์"
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ fontSize: "50px", mt: "40px", textAlign: "center" }}>
        รับสมัครนักศึกษา
      </Box>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mt: "5px" }}
        position="static"
      >
        <Grid item xs={8}>
          <Item>
            <Img
              alt="นักศึกษาใหม่"
              src={window.location.origin + "/images/new_stu.jpg"}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <a href="http://register.kru.ac.th/reg/" target="_blank">
            <Item>สมัครเรียน</Item>
          </a>
        </Grid>
      </Grid>
    </>
  );
}
