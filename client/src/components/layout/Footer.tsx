import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Link, Typography } from '@mui/material'

const navStyles = { 
    "&:hover": {
    color: "inherit",
    },
    textDecoration:'none'
};

export default function Footer() {
  return (
    <footer>
        <Box>
            <Box sx={{ filter: 'brightness(40%)',position:'absolute', left:'0' , mt:'20px' }}><img width='100%' alt='ComScience' src={window.location.origin + "/images/Footer.jpg"} /></Box>
            <Box px={{ xs: 3, sm: 8 }}
                py={{ xs: 4, sm: 8 }}
                //  bgcolor='text.secondary'
                color='white'
                sx={{position:'absolute'}}
            >
                <Container maxWidth='lg' color='inherit' >                
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={8} >
                            <Box borderBottom={1} color='inherit'>
                                <Typography variant='h3'>
                                    Computer Science
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant='h5'>
                                    ที่อยู่: ไกด์
                                </Typography> 
                            </Box>
                            <Box>
                                <Typography variant='h5'>
                                    โทร: ชิ่ง
                                </Typography> 
                            </Box>
                            <Box>
                                <Typography variant='h5'>
                                    Email: กอล์ฟ
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            <Box borderBottom={1} sx={{ fontSize:'40px' }}>
                                <Typography variant='h3'>
                                    ช่องทางการติดต่อ
                                </Typography>
                            </Box>
                            <Box display='flex'>
                                <Typography variant='h5'>
                                    เฟสบุ๊ค:
                                </Typography>
                                <Link  variant='h5' href='https://www.facebook.com/kru.cs' target="_blank" color='inherit' sx={navStyles} >
                                    วิทยาการคอมพิวเตอร์
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </footer>
  )
}
