import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { OrderTable } from '@/components/dashboard/order/order-table';
import type { Order } from '@/components/dashboard/order/order-table';

export const metadata = { title: `Orders | Dashboard | ${config.site.name}` } satisfies Metadata;
export default async function Page() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Orders</Typography>
        </Stack>
      </Stack>
      <OrderTable />
    </Stack>
  );
}
