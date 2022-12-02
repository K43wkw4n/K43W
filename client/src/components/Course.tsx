import { Alert, AlertTitle, Box, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import agent from '../api/agent'

export default function Course() {

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }

  return (
    <>
      <ButtonGroup fullWidth variant="contained">
          <Button onClick={() => agent.TestErrors.get400Error()}>
            Test 400 Errors
          </Button>
          <Button onClick={() => agent.TestErrors.get401Error()}>
            Test 401 Errors
          </Button>
          <Button onClick={() => agent.TestErrors.get404Error()}>
            Test 404 Errors
          </Button>
          <Button onClick={() => agent.TestErrors.get500Error()}>
            Test 500 Errors
          </Button>
          <Button
          >
            Test Validate Error
          </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
        <Box mx='20px'>
          <Box border={1}p='5px' sx={{backgroundColor:'#ffff'}}>
              <Typography variant='h3' sx={{textAlign:'center',fontWeight: 'bold'}}>
                  หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์
                    <Typography variant='h5' sx={{textAlign:'center'}}>
                        Bachelor of Science Program in Computer Science
                    </Typography>
              </Typography>
          </Box>
          <Box sx={{mt:'10px'}}>
              <Box>
                <Typography variant='h4' my='15px' borderBottom={1} sx={{fontWeight: 'bold'}}>
                  ชื่อปริญญาและสาขาวิชา
                </Typography>
              </Box>
              <Typography my='15px' variant='h5' sx={{fontWeight: 'bold'}}>
                ภาษาไทย
                <Typography my='15px' variant='h5' ml='80px'>
                  วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)
                </Typography>
              </Typography>
              <Typography my='15px' variant='h5' sx={{fontWeight: 'bold'}}>
                ภาษาอังกฤษ
                <Typography my='15px' variant='h5' ml='80px'>
                  Bachelor of Science (Computer Science)
                </Typography>
              </Typography>
          </Box>
          <Box sx={{mt:'10px'}}>
              <Typography variant='h4' my='15px' borderBottom={1} sx={{fontWeight: 'bold'}}>
                วัตถุประสงค์ของหลักสูตร
              </Typography>
              <Typography my='15px' variant='h5' sx={{fontWeight: 'bold'}}>
                เพื่อให้บัณฑิตมีคุณลักษณะ ดังนี้
                <Typography my='15px' variant='h5' ml='80px'>
                1. มีความใฝ่รู้ทางวิชาการด้านวิทยาการคอมพิวเตอร์ ทั้งภาคทฤษฎีและภาคปฏิบัติ สามารถนําไปใช้ในการ
                  ประกอบอาชีพและศึกษาต่อในระดับสูงได้
                </Typography>
                <Typography my='15px' variant='h5' ml='80px'>
                2. มีเจตคติที่ดีทางวิทยาการคอมพิวเตอร์ มีความอดทน มีความคิดริเริ่มสร้างสรรค์ มีจิตอาสา ปฏิบัติงานอย่างมี
                  คุณธรรม จริยธรรม และตระหนักในจรรยาบรรณวิชาชีพ
                </Typography>
                <Typography my='15px' variant='h5' ml='80px'>
                3. มีทักษะด้านการพัฒนาซอฟต์แวร์และการประยุกต์ สามารถพัฒนาตนเองได้อย่างต่อเนื่องตลอดชีวิต
                </Typography>
              </Typography>
          </Box>
          <Box sx={{mt:'10px'}}>
              <Typography variant='h4' my='15px' borderBottom={1} sx={{fontWeight: 'bold'}}>
                อาชีพที่สามารถประกอบอาชีพได้หลังสำเร็จการศึกษา
              </Typography>
              <Typography my='15px' variant='h5' ml='80px'>
                1. นักพัฒนาซอฟต์แวร์<br/>
                2. นักพัฒนาเว็บแอพพลิเคชั่นและโมบายแอพพลิเคชั่น<br/>
                3. นักวิชาการคอมพิวเตอร์<br/>
                4. ผู้จัดการโครงการซอฟต์แวร์<br/>
                5. ผู้ดูแลระบบฐานข้อมูล<br/>
                6. ผู้ดูแลระบบเครือข่ายคอมพิวเตอร์ (System Administrator)<br/>
                7. ผู้ดูแลระบบคอมพิวเตอร์ (IT Support)<br/>
                8. ทํางานบริษัท / รับราชการ / อาชีพอิสร<br/>
              </Typography>
          </Box>
          <Box sx={{mt:'10px'}}>
              <Typography variant='h4' my='15px' borderBottom={1} sx={{fontWeight: 'bold'}}>
                โครงสร้างหลักสูตร
              </Typography>
          </Box>
        </Box>
    </>
  )
}
