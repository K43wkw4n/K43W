import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Teacher } from '../../models/teachers';
import axios from 'axios';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';

export default function TeacherDetails() {
  const {id} = useParams();
  const [teacher,setTeacher] = useState<Teacher | null>(null);

  useEffect(()=> {
    axios
    .get(`http://localhost:5000/api/Teacher/${id}`)
    .then((res)=> setTeacher(res.data))
    .catch((err)=> console.log(err))
  },[id])

  return (
    <>
      <Container>
          <Grid container spacing={2} columns={12} my={1}>
            <Grid item xs={6}>
              <Typography>รหัสนักศึกษา : {teacher?.id}</Typography>
              {/* <Typography>สถานะนักศึกษา :	{teacher?.status.name}</Typography> */}
            </Grid>
            <Grid item xs={6}>
              <Typography>ชื่อ - สกุล :	{teacher?.title.name}{teacher?.name} {teacher?.surName}</Typography>
              {/* <Typography>E-Mail : {teacher?.email}</Typography> */}
            </Grid>
          </Grid>

          <Typography my={2} variant='h5'>ประวัตินักศึกษา</Typography>
        
          <Grid container spacing={2} columns={12}>
            <Grid item xs={6}>
              {/* <Box textAlign='center' sx={{bgcolor:'aliceblue',border:'dotted 2px cadetblue',height:'300px'}}>
                <img alt={teacher?.name} src={teacher?.img} height={300} />
              </Box> */}
            </Grid>
            <Grid item xs={6} my='auto'>
              {/* <Typography my={1}>รหัสนักศึกษา : {teacher?.id}</Typography>
              <Typography my={1}>ชื่อ - สกุล :	{teacher?.title.name}{teacher?.name} {teacher?.surName}</Typography> */}
              {/* <Typography my={1}>จบภาคการศึกษา : {teacher?.oldEdu}</Typography>
              <Typography my={1}>เพศ : {teacher?.sex}</Typography>
              <Typography my={1}>เบอร์โทร : {teacher?.tel}</Typography>
              <Typography my={1}>จบจาก โรงเรียน : {teacher?.oldSchool}</Typography>
              <Typography my={1}>สถานะนักศึกษา : {teacher?.status.name}</Typography> */}
            </Grid>
          </Grid>
      </Container>
    </>
  )
}
