'use client';

import * as React from 'react';
import api from '@/lib/api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { DriverModal } from './driver-modal';
import { Button } from '@mui/material';

export interface Driver {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
}

export function DriverTable(): React.JSX.Element {

  const [drivers, setDrivers] = React.useState<Driver[]>([])
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
  const token = localStorage.getItem('custom-auth-token');

  const getName = (firstName: string, lastName: string) => {
    if(firstName && lastName) {
      return firstName + " " + lastName
    }
    return ""
  }

  const getDrivers = async () => {
    if (modalIsOpen) return 
    try {
      const headers = {
        'authorization': token
      }
      const { data } = await api.get("/api/admin/drivers", {
        headers: headers
      });

      if (data.drivers) {
        setDrivers(data.drivers)
      } else {
        setDrivers([])
      }
    } catch (error) {
      console.error("Error: ", error)
      setDrivers([])
    }
  }

  React.useEffect(() => {
    getDrivers()
  }, [modalIsOpen])

  return (
    <>
      <Button onClick={() => setModalIsOpen(!modalIsOpen)} > Add Driver </Button>
      <Card>
        <DriverModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => {
                return (
                  <TableRow hover key={driver.id} >
                    <TableCell>{getName(driver.firstName, driver.lastName)}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>{dayjs(driver.createdAt).format('MMM D, YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card>
    </>
  );
}
