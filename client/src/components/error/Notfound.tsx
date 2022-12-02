import { Button, Grid, styled, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Img = styled('img')({
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
})

export default function Notfound() {
  return (
    <>
        <Container>
            <Grid container columns={12} sx={{m:"auto"}}>
                <Grid item xs={6}>
                    <Img sx={{ position:'relative'}} height={530} alt='LogoKru' src='https://www.kru.ac.th/kru/assets/img/kru/logo/kru_color.png' />
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{top:'330px',position:'absolute',fontSize:'120px',color:'#5AFF52'}}>
                        404
                    </Typography>
                    <Typography variant='h3' sx={{top:'410px',left:'980px',position:'absolute',color:'#FFCD52'}}>
                        Not Found !!
                    </Typography>
                </Grid>
            </Grid>
            <Grid textAlign='center'>
                <Button component={Link} to='/'>Back To Home</Button>
            </Grid>
        </Container>
    </>
  )
}
