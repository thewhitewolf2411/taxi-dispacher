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

export interface Customer {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
}

export function CustomersTable(): React.JSX.Element {

  const [customers, setCustomers] = React.useState<Customer[]>([])
  const token = localStorage.getItem('custom-auth-token');

  const getName = (firstName: string, lastName: string) => {
    if(firstName && lastName) {
      return firstName + " " + lastName
    }
    return ""
  }

  const getCustomers = async () => {
    try {
      const headers = {
        'authorization': token
      }
      const { data } = await api.get("/api/admin/customers", {
        headers: headers
      });

      if (data.customers) {
        setCustomers(data.customers)
      } else {
        setCustomers([])
      }
    } catch (error) {
      console.error("Error: ", error)
      setCustomers([])
    }
  }

  React.useEffect(() => {
    getCustomers()
  }, [])

  return (
    <Card>
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
            {customers.map((customer) => {
              return (
                <TableRow hover key={customer.id} >
                  <TableCell>{getName(customer.firstName, customer.lastName)}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{dayjs(customer.createdAt).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
