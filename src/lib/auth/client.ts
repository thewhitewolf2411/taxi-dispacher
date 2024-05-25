'use client';

import { config } from '@/config';
import type { User } from '@/types/user';
import api from '../api';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request

    try {
      const { data } = await api.post(`/api/admin/login`, {
        email, 
        password
      })

      const { token, user } = data

      localStorage.setItem('custom-auth-token', token);
      localStorage.setItem('admin-user', user);

      return {};
    } catch (err) {
      return { error: 'Invalid credentials' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
