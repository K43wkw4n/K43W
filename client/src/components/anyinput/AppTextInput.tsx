import { TextField } from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
 
//UseControllerProps  มีคุณสมบัติ name,control อยู่แล้วเลยไม่ต้องกำหนด
interface Props extends UseControllerProps {
   label?: string;
   multiline?: boolean;
   rows?: number;
   type?: string;
}
 
//วิธีใช้ https://react-hook-form.com/api/usecontroller
export default function AppTextInput(props: Props) {
  const {fieldState,field} =  useController({...props})
  return (
    <TextField
    {...props}
    {...field}
    multiline={props.multiline}
    rows={props.rows}
    type={props.type}
    fullWidth
    variant='outlined'
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    hidden
    />
  )
}
