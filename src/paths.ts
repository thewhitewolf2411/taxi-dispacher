export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in' },
  dashboard: {
    orders: '/dashboard/orders',
    customers: '/dashboard/customers',
    drivers: '/dashboard/drivers',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
