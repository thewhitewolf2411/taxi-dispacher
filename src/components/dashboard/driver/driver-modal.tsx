'use client';

import * as React from 'react';
import api from '@/lib/api';
import { Modal, Box, Button, FormControl, InputLabel, Input } from '@mui/material';
import { makeStyles } from "@mui/styles"

export interface DriverModalProps{
  open: boolean,
  onClose: (value?:any) => void,
}

const useStyles = makeStyles(() => ({
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: 16,
    borderRadius: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginTop: "8px !important",
    marginBottom: "8px !important"
  },
}))

export function DriverModal({open, onClose}:DriverModalProps): React.JSX.Element {

  const classes = useStyles()
  const token = localStorage.getItem('custom-auth-token')

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    console.log(token)

    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const email = e.target.email.value
    const password = e.target.password.value
    const phoneNumber = e.target.phoneNumber.value
    const carModel = e.target.carModel.value
    const carNumber = e.target.carNumber.value
    const shortDesc = e.target.shortDsc.value
    const longDesc = e.target.longDsc.value

    const requestBody = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      carModel,
      carNumber,
      shortDesc,
      longDesc,
    }

    const headers = {
      'authorization': token
    }

    const { data }  = await api.post("/api/admin/drivers", requestBody, {
      headers: headers
    })

    onClose(true)
  }

  return(
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box className={classes.modalContainer}>
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <FormControl className={classes.formControl}>
              <InputLabel>First Name</InputLabel>
              <Input name='firstName' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Last Name</InputLabel>
              <Input name='lastName' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Email</InputLabel>
              <Input name='email' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Password</InputLabel>
              <Input name='password' type='password'/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Phone Number</InputLabel>
              <Input name='phoneNumber' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Car Model</InputLabel>
              <Input name='carModel' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Car Number</InputLabel>
              <Input name='carNumber' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Short Description</InputLabel>
              <Input name='shortDsc' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Long Description</InputLabel>
              <Input name='longDsc' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button type='submit'>Add driver</Button>
            </FormControl>
          </form>
        </Box>
    </Modal>
  )
}