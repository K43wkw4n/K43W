import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Student } from '../../models/Students';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import agent from '../../api/agent';

export default function StudentDetails() {
  const {id} = useParams<{id : any}>();
  const [student,setStudent] = useState<Student | null>(null);

  useEffect(() => {
    agent.Student.details(parseInt(id))
      .then((response) => setStudent(response))
      .catch((error) => console.log(error))
  }, [id]);

  return (
    <>
      <Container>
          <Grid container spacing={2} columns={12} my={1}>
            <Grid item xs={6}>
              <Typography>รหัสนักศึกษา : {student?.id}</Typography>
              <Typography>สถานะนักศึกษา :	{student?.status.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>ชื่อ - สกุล :	{student?.title.name}{student?.name} {student?.surName}</Typography>
              <Typography>E-Mail : {student?.email}</Typography>
            </Grid>
          </Grid>

          <Typography my={2} variant='h5'>ประวัตินักศึกษา</Typography>
        
          <Grid container spacing={2} columns={12} mb='120px'>
            <Grid item xs={6}>
              <Box textAlign='center' sx={{bgcolor:'aliceblue',border:'dotted 2px cadetblue',height:'300px'}}>
                <img alt={student?.name} src={student?.img} height={300} />
              </Box>
            </Grid>
            <Grid item xs={6} my='auto'>
              <Typography my={1}>รหัสนักศึกษา : {student?.id}</Typography>
              <Typography my={1}>ชื่อ - สกุล :	{student?.title.name}{student?.name} {student?.surName}</Typography>
              <Typography my={1}>จบภาคการศึกษา : {student?.oldEdu}</Typography>
              <Typography my={1}>เพศ : {student?.sex}</Typography>
              <Typography my={1}>เบอร์โทร : {student?.tel}</Typography>
              <Typography my={1}>จบจาก โรงเรียน : {student?.oldSchool}</Typography>
              <Typography my={1}>สถานะนักศึกษา : {student?.status.name}</Typography>
            </Grid>
          </Grid>
      </Container>
    </>
  )
}
