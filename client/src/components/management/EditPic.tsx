import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Picture } from "../../models/Picture";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validate/ValidatePic";
import { useAppDispatch } from "../../store/configureStore";
import React from "react";
import agent from "../../api/agent";
import { setPicture } from "./MnPictureSlice";
import AppTextInput from "../anyinput/AppTextInput";
import AppDropzone from "../anyinput/AppDropzone";

interface Props {
  picture?: Picture;
  cancelEdit: () => void;
}

export default function EditPic({ picture, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (picture && !watchFile && !isDirty) reset(picture);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview); //ลบ URL ของภาพ
    };
  }, [picture, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      console.log(data);
      let response: Picture;
      if (picture) {
        response = await agent.Admin.updatePicture(data);
      } else {
        response = await agent.Admin.createPicture(data);
      }

      dispatch(setPicture(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  // const { categorys } = useCategory();
  // const { sources } = useSource();

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Box textAlign="center">
        {picture ? (
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control={control}
              name="name"
              label="name"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
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
                    src={picture?.img}
                    alt={picture?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>

          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
