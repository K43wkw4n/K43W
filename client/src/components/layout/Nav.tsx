import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import Footer from "./Footer";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 110,
  },
}));

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h7",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Nav() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);

  return (
    <>
      {/* <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Scroll to hide App bar
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll> */}
      <AppBar color="inherit" sx={{ background: "#FEF5E7" }}>
        <StyledToolbar>
          <Box sx={{ m: "auto", marginLeft: "50px" }}>
            <Typography variant="h4">วิทยาการคอมพิวเตอร์</Typography>
          </Box>
          <Box sx={{ m: "auto" }}>
            <Typography component={Link} to="/" sx={navStyles} mx="15px">
              หน้าแรก
            </Typography>
            <Typography
              component={Link}
              to="/studentList"
              sx={navStyles}
              mx="15px"
            >
              รายชื่อนักศึกษา
            </Typography>
            <Typography component={Link} to="/course" sx={navStyles} mx="15px">
              หลักสูตร
            </Typography>
            <Typography component={Link} to="/teacher" sx={navStyles} mx="15px">
              อาจารย์ประจำหลักสูตร
            </Typography>
            <Typography component={Link} to="/manage" sx={navStyles} mx="15px">
              การจัดการ
            </Typography>
            {user ? (
              <>
                <Typography
                  component={Link}
                  to="/login"
                  sx={navStyles}
                  mx="15px"
                  onClick={() => {
                    dispatch(signOut());
                    localStorage.removeItem("savepath");
                  }}
                >
                  ออกจากระบบ
                </Typography>
              </>
            ) : (
              <Typography component={Link} to="/login" sx={navStyles} mx="15px">
                เข้าสู่ระบบ
              </Typography>
            )}
            <Typography
              component={Link}
              to="/register"
              sx={navStyles}
              mx="15px"
            >
              เพิ่มรายชื่อ
            </Typography>
          </Box>
        </StyledToolbar>
      </AppBar>
      <Box mt="143px">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
