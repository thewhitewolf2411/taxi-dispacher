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

export interface Order {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  rideStarted: string;
  rideEnded: string;
  startLongitude: string;
  startLatitude: string;
  endLongitude: string;
  endLatitude: string;
  phoneNumber: string;
  driverFirstName: string;
  driverLastName: string;
  createdAt: string;
}

interface OrderTableProps {
  rows?: Order[];
}

export function OrderTable(): React.JSX.Element {

  const [orders, setOrders] = React.useState<Order[]>([])
  const token = localStorage.getItem('custom-auth-token');

  const getAddress = (longitude:string, latitude:string) => {
    return ""
  }

  const getName = (driverFirstName: string, driverLastName: string) => {
    if(driverFirstName && driverLastName) {
      return driverFirstName + " " + driverLastName
    }
    return ""
  }

  const getOrders = async () => {
    try {
      const headers = {
        'authorization': token
      }
      const { data } = await api.get("/api/admin/orders", {
        headers: headers
      });

      if (data.orders) {
        setOrders(data.orders)
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error("Error: ", error)
      setOrders([])
    }
  }

  React.useEffect(() => {
    getOrders()
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
              <TableCell>Started</TableCell>
              <TableCell>Ended</TableCell>
              <TableCell>Start location</TableCell>
              <TableCell>End location</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow hover key={order.id}>
                  <TableCell>{getName(order.firstName, order.lastName)}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.rideStarted && dayjs(order.rideStarted).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{order.rideEnded && dayjs(order.rideEnded).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{getAddress(order.startLatitude, order.startLongitude)}</TableCell>
                  <TableCell>{getAddress(order.endLatitude, order.endLongitude)}</TableCell>
                  <TableCell>{getName(order.driverFirstName, order.driverLastName)}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
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
