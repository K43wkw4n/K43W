import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../api/agent";
import { Student } from "../../models/Students";
import { useAppDispatch } from "../../store/configureStore";
import AppTextInput from "../anyinput/AppTextInput";
import AppSelectList from "../anyinput/AppSelectList";
import AppDropzone from "../anyinput/AppDropzone";
import useData from "../hooks/useStudent";
import { useSelector } from "react-redux";
import { setStudent } from "../people/students/MnStudentsSlice";
import useStudent from "../hooks/useStudent";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationstudent } from "../validate/ValidateStudent";

interface Props {
  student?: Student; //กรณีเป็น ? หมายถึง สามารถกำหนดค่าเป็น undefined
  cancelEdit: () => void;
}

export default function Edit({ student, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(validationstudent),
  });

  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (student && !watchFile && !isDirty) reset(student);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview); //ลบ URL ของภาพ
    };
  }, [student, reset, watchFile, isDirty]);

  // <TextField
  //   id="standard-helperText"
  //   label="Helper text"
  //   defaultValue="Default Value"
  //   helperText="Some important text"
  //   variant="standard"
  // />

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Student;
      if (student) {
        response = await agent.Admin.updateStudent(data);
      } else {
        response = await agent.Admin.createStudent(data);
      }
      dispatch(setStudent(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  // const { title, status } = useStudent();

  return (
    <>
      <Container>
        <Grid>
          <Box textAlign="center">
            {student ? (
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Edit
              </Typography>
            ) : (
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Create
              </Typography>
            )}
          </Box>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={2} columns={12} my="4px">
              {/* <Grid item xs={6}>
                <AppSelectList
                  control={control}
                  items={title}
                  name="title"
                  label="title"
                />
              </Grid>
              <Grid item xs={6}>
                <AppSelectList
                  control={control}
                  items={status}
                  name="status"
                  label="status"
                />
              </Grid> */}
            </Grid>
            <Grid container spacing={2} columns={12} my="4px">
              <Grid item xs={6}>
                <AppTextInput label="ชื่อ" name="name" control={control} />
              </Grid>
              <Grid item xs={6}>
                <AppTextInput
                  label="นามสกุล"
                  name="surName"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={12} my="4px">
              <Grid item xs={6}>
                <AppTextInput label="เพศ" name="sex" control={control} />
              </Grid>
              <Grid item xs={6}>
                <AppTextInput
                  label="วันเกิด"
                  name="birthday"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={12} my="4px">
              <Grid item xs={6}>
                <AppTextInput label="อีเมลล์" name="email" control={control} />
              </Grid>
              <Grid item xs={6}>
                <AppTextInput label="เบอร์โทร" name="tel" control={control} />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={12} my="4px">
              <Grid item xs={6}>
                <AppTextInput
                  label="address"
                  multiline={true}
                  rows={4}
                  control={control}
                  name="address"
                />
              </Grid>
              <Grid item xs={6} mt={6}>
                <AppTextInput
                  label="วุฒิเดิม"
                  name="oldEdu"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={12} my="4px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AppDropzone control={control} name="file" />
                {watchFile ? (
                  <img
                    src={watchFile.preview}
                    alt="preview"
                    style={{ maxHeight: 200 }}
                  />
                ) : (
                  <img
                    src={student?.img}
                    alt={student?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}
              </Box>
            </Grid>
            <Grid container spacing={2} columns={12} mt={4}>
              <Grid item xs={6}>
                <AppTextInput
                  label="จบมาจากโรงเรียน"
                  name="oldSchool"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={12} mt={4} textAlign="center">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
