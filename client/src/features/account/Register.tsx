import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import agent from "../../api/agent";
import { Routers } from "../../App";

export default function Register() {
  // <TextField
  //   id="standard-helperText"
  //   label="Helper text"
  //   defaultValue="Default Value"
  //   helperText="Some important text"
  //   variant="standard"
  // />
  const [currency, setCurrency] = useState("EUR");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const currencies = [
    {
      label: "เลือกคำนำหน้า",
    },
    {
      value: "1",
      label: "นาย",
    },
    {
      value: "2",
      label: "นาง",
    },
    {
      value: "3",
      label: "นางสาว",
    },
  ];
  const sex = [
    {
      label: "เลือกเพศ",
    },
    {
      value: "1",
      label: "ชาย",
    },
    {
      value: "2",
      label: "หญิง",
    },
  ];

  const status = [
    {
      label: "เลือกสถานะ",
    },
    {
      value: "1",
      label: "เรียนยังไม่ครบหลักสูตร",
    },
    {
      value: "2",
      label: "พ้นสภาพนักศึกษา",
    },
    {
      value: "3",
      label: "สำเร็จการศึกษา",
    },
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm<{ username: ""; email: ""; password: "" }>({ mode: "all" });

  //setError ระบุค่าผิดพลาดให้แสดงใหม่ ที่ส่งมาจาก API
  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <>
      <Container>
        <Grid ml={27}>
          <form>
            <Box
              component="form"
              onSubmit={handleSubmit((data) =>
                agent.Account.register(data)
                  .then(() => {
                    // toast.success("Registration successful - you can now login");
                    Routers.navigate("/login");
                  })
                  .catch((error) => handleApiErrors(error))
              )}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6}>
                  <TextField
                    id="standard-select-currency-native"
                    select
                    label="Dropdown"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency"
                    variant="standard"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6}>
                  <TextField label="ชื่อ" variant="standard" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="นามสกุล" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6}>
                  <TextField
                    id="standard-select-currency-native"
                    select
                    label="Dropdown"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency"
                    variant="standard"
                  >
                    {sex.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="วันเกิด" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                        message: "Not a valid email address",
                      },
                    })}
                    variant="standard"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="เบอร์โทร" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6}>
                  <TextField
                    label="Multiline"
                    multiline
                    rows={4}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6} mt={6}>
                  <TextField label="วุฒิเดิม" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12} my="4px">
                <Grid item xs={6} mt={3}>
                  <Typography>รูปภาพ</Typography>
                  <input type="file" multiple accept="image/*" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="จบมาจากโรงเรียน" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12} mt={4}>
                <Grid item xs={6}>
                  <TextField
                    id="standard-select-currency-native"
                    select
                    label="Dropdown"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency"
                    variant="standard"
                  >
                    {status.map((option) => (
                      <option key={option.value} value={option.value}>
                        <Grid>{option.label}</Grid>
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Button sx={{mt:'30px'}} variant="contained" color="inherit" onClick={()=> Routers.navigate(-1)}>
            Back
          </Button>
          </form>
        </Grid>
      </Container>
    </>
  );
}
