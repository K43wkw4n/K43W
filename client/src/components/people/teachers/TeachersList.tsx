import { Grid, CardMedia, Typography, Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import '../../../css/FlipCard.css'
import { Teacher } from '../../../models/teachers';

interface Props{
    teacher:Teacher[];
}

export default function TeachersList({teacher}:Props) {
  return (
    <>
      <Container>
        <Grid container spacing={1} columns={12} sx={{m:"auto"}}>
          {teacher.map((teacher) => (
            <Grid item xs={2} mx='50px' key={teacher.id} component={Link} to={`/teacher/${teacher.id}`}>
              <Grid className='flip-card'>
                <Grid className='flip-card-inner'>
                  <Grid className='flip-card-front'>
                    <CardMedia
                      component="img"
                      height='300'
                      width='300'
                      src={window.location.origin + `${teacher.img}`}
                      alt={teacher.name}
                      sx={{borderRadius:'20px'}}
                    />
                  </Grid>
                  <Grid className='flip-card-back'>
                    <Grid sx={{mt:'100px'}}>
                      <Typography
                        gutterBottom
                        component="div"
                        color="darkblue"
                        variant='h5'
                      >
                        {teacher.title.name}&nbsp;
                        {teacher.name}&nbsp;
                        {teacher.surName}&nbsp;
                      </Typography>
                      <Typography variant="h6" color="darkblue">
                        {teacher.id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
